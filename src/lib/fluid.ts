/**
 * A small WebGL2 "stable fluids" simulation (velocity, pressure, vorticity and a
 * dye that is carried along), used for the pastel smoke that follows the cursor.
 * Method after Jos Stam's "Real-Time Fluid Dynamics for Games", in the
 * ping-pong framebuffer form popularised by Pavel Dobryakov's WebGL fluid demo.
 *
 * The canvas is composited over the page, so the dye is written as premultiplied
 * colour with alpha taken from its intensity: empty water is transparent.
 * The loop only runs while there is something to show, then stops.
 */

export type Rgb = readonly [number, number, number];

export type Fluid = {
  /** Add dye and momentum at a viewport position. Deltas are in CSS pixels. */
  splat(clientX: number, clientY: number, dxPx: number, dyPx: number, color: Rgb, radius?: number): void;
  resize(): void;
  destroy(): void;
};

const SIM_RES = 128;
const DYE_RES = 512;
/** Canvas pixels per CSS pixel. The dye is smooth, so a coarse canvas is enough. */
const CANVAS_SCALE = 0.5;
const DENSITY_DISSIPATION = 2.2;
const VELOCITY_DISSIPATION = 0.7;
const PRESSURE = 0.1;
const PRESSURE_ITERATIONS = 18;
const CURL = 22;
const SPLAT_FORCE = 6000;
const SPLAT_RADIUS = 0.2;
/** How long the loop keeps running after the last input. */
const IDLE_MS = 3200;

const VERTEX = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
uniform vec2 texelSize;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 fragColor;
`;

const FRAGMENT = {
  clear: `${HEAD}
uniform sampler2D uTexture;
uniform float value;
void main() { fragColor = value * texture(uTexture, vUv); }`,

  splat: `${HEAD}
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main() {
  vec2 p = vUv - point;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  fragColor = vec4(texture(uTarget, vUv).xyz + splat, 1.0);
}`,

  advection: `${HEAD}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  fragColor = texture(uSource, coord) / (1.0 + dissipation * dt);
}`,

  divergence: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  fragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,

  curl: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  fragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,

  vorticity: `${HEAD}
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main() {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 velocity = texture(uVelocity, vUv).xy + force * dt;
  fragColor = vec4(clamp(velocity, -1000.0, 1000.0), 0.0, 1.0);
}`,

  pressure: `${HEAD}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  fragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}`,

  gradientSubtract: `${HEAD}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}`,

  // Dye intensity becomes opacity; the output is already premultiplied.
  display: `${HEAD}
uniform sampler2D uTexture;
void main() {
  vec3 c = max(texture(uTexture, vUv).rgb, vec3(0.0));
  float m = max(c.r, max(c.g, c.b));
  float a = min(m * 1.2, 0.55);
  fragColor = m > 0.0001 ? vec4(c / m * a, a) : vec4(0.0);
}`,
} as const;

type Program = { handle: WebGLProgram; uniforms: Record<string, WebGLUniformLocation> };

type Target = {
  texture: WebGLTexture;
  framebuffer: WebGLFramebuffer;
  width: number;
  height: number;
  texel: readonly [number, number];
};

type Double = { read: Target; write: Target; swap(): void };

export function createFluid(canvas: HTMLCanvasElement): Fluid | null {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
  });
  if (!gl) return null;
  if (!gl.getExtension("EXT_color_buffer_float") && !gl.getExtension("EXT_color_buffer_half_float")) return null;

  let programs: Record<keyof typeof FRAGMENT, Program>;
  try {
    programs = Object.fromEntries(
      (Object.keys(FRAGMENT) as (keyof typeof FRAGMENT)[]).map((name) => [name, makeProgram(gl, FRAGMENT[name])]),
    ) as Record<keyof typeof FRAGMENT, Program>;
  } catch {
    return null;
  }

  // One quad drawn as a strip, shared by every pass.
  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.disable(gl.BLEND);

  let velocity: Double;
  let dye: Double;
  let pressure: Double;
  let divergence: Target;
  let curl: Target;

  function target(w: number, h: number, internal: number, format: number): Target {
    const texture = gl!.createTexture()!;
    gl!.activeTexture(gl!.TEXTURE0);
    gl!.bindTexture(gl!.TEXTURE_2D, texture);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, internal, w, h, 0, format, gl!.HALF_FLOAT, null);
    const framebuffer = gl!.createFramebuffer()!;
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, framebuffer);
    gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);
    gl!.viewport(0, 0, w, h);
    gl!.clearColor(0, 0, 0, 0);
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    return { texture, framebuffer, width: w, height: h, texel: [1 / w, 1 / h] };
  }

  function double(w: number, h: number, internal: number, format: number): Double {
    let a = target(w, h, internal, format);
    let b = target(w, h, internal, format);
    return {
      get read() {
        return a;
      },
      get write() {
        return b;
      },
      swap() {
        [a, b] = [b, a];
      },
    };
  }

  function dimensions(res: number) {
    const aspect = canvas.width / canvas.height;
    const ratio = aspect < 1 ? 1 / aspect : aspect;
    const min = Math.round(res);
    const max = Math.round(res * ratio);
    return aspect > 1 ? { w: max, h: min } : { w: min, h: max };
  }

  function build() {
    const sim = dimensions(SIM_RES);
    const dyeSize = dimensions(DYE_RES);
    velocity = double(sim.w, sim.h, gl!.RG16F, gl!.RG);
    pressure = double(sim.w, sim.h, gl!.R16F, gl!.RED);
    divergence = target(sim.w, sim.h, gl!.R16F, gl!.RED);
    curl = target(sim.w, sim.h, gl!.R16F, gl!.RED);
    dye = double(dyeSize.w, dyeSize.h, gl!.RGBA16F, gl!.RGBA);
  }

  function activate(p: Program) {
    gl!.useProgram(p.handle);
    return p.uniforms;
  }

  function bind(t: Target, unit: number) {
    gl!.activeTexture(gl!.TEXTURE0 + unit);
    gl!.bindTexture(gl!.TEXTURE_2D, t.texture);
    return unit;
  }

  function blit(to: Target | null) {
    if (to) {
      gl!.viewport(0, 0, to.width, to.height);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, to.framebuffer);
    } else {
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    }
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
  }

  function step(dt: number) {
    const texel = velocity.read.texel;

    let u = activate(programs.curl);
    gl!.uniform2f(u.texelSize, texel[0], texel[1]);
    gl!.uniform1i(u.uVelocity, bind(velocity.read, 0));
    blit(curl);

    u = activate(programs.vorticity);
    gl!.uniform2f(u.texelSize, texel[0], texel[1]);
    gl!.uniform1i(u.uVelocity, bind(velocity.read, 0));
    gl!.uniform1i(u.uCurl, bind(curl, 1));
    gl!.uniform1f(u.curl, CURL);
    gl!.uniform1f(u.dt, dt);
    blit(velocity.write);
    velocity.swap();

    u = activate(programs.divergence);
    gl!.uniform2f(u.texelSize, texel[0], texel[1]);
    gl!.uniform1i(u.uVelocity, bind(velocity.read, 0));
    blit(divergence);

    u = activate(programs.clear);
    gl!.uniform1i(u.uTexture, bind(pressure.read, 0));
    gl!.uniform1f(u.value, PRESSURE);
    blit(pressure.write);
    pressure.swap();

    u = activate(programs.pressure);
    gl!.uniform2f(u.texelSize, texel[0], texel[1]);
    gl!.uniform1i(u.uDivergence, bind(divergence, 0));
    for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
      gl!.uniform1i(u.uPressure, bind(pressure.read, 1));
      blit(pressure.write);
      pressure.swap();
    }

    u = activate(programs.gradientSubtract);
    gl!.uniform2f(u.texelSize, texel[0], texel[1]);
    gl!.uniform1i(u.uPressure, bind(pressure.read, 0));
    gl!.uniform1i(u.uVelocity, bind(velocity.read, 1));
    blit(velocity.write);
    velocity.swap();

    u = activate(programs.advection);
    gl!.uniform2f(u.texelSize, texel[0], texel[1]);
    gl!.uniform1i(u.uVelocity, bind(velocity.read, 0));
    gl!.uniform1i(u.uSource, bind(velocity.read, 0));
    gl!.uniform1f(u.dt, dt);
    gl!.uniform1f(u.dissipation, VELOCITY_DISSIPATION);
    blit(velocity.write);
    velocity.swap();

    gl!.uniform2f(u.texelSize, dye.read.texel[0], dye.read.texel[1]);
    gl!.uniform1i(u.uVelocity, bind(velocity.read, 0));
    gl!.uniform1i(u.uSource, bind(dye.read, 1));
    gl!.uniform1f(u.dissipation, DENSITY_DISSIPATION);
    blit(dye.write);
    dye.swap();
  }

  function render() {
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.clearColor(0, 0, 0, 0);
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    const u = activate(programs.display);
    gl!.uniform2f(u.texelSize, 1 / canvas.width, 1 / canvas.height);
    gl!.uniform1i(u.uTexture, bind(dye.read, 0));
    blit(null);
  }

  let raf = 0;
  let last = 0;
  let activeUntil = 0;

  function frame(now: number) {
    raf = 0;
    const dt = Math.min(Math.max((now - last) / 1000, 0.001), 1 / 60);
    last = now;
    step(dt);
    render();
    if (now < activeUntil && !document.hidden) {
      raf = requestAnimationFrame(frame);
    } else {
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
    }
  }

  function wake() {
    activeUntil = performance.now() + IDLE_MS;
    if (!raf && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }

  function applySplat(x: number, y: number, dx: number, dy: number, color: Rgb, radius: number) {
    const aspect = canvas.width / canvas.height;
    let u = activate(programs.splat);
    gl!.uniform1i(u.uTarget, bind(velocity.read, 0));
    gl!.uniform1f(u.aspectRatio, aspect);
    gl!.uniform2f(u.point, x, y);
    gl!.uniform3f(u.color, dx, dy, 0);
    gl!.uniform1f(u.radius, aspect > 1 ? (radius / 100) * aspect : radius / 100);
    blit(velocity.write);
    velocity.swap();

    u = activate(programs.splat);
    gl!.uniform1i(u.uTarget, bind(dye.read, 0));
    gl!.uniform3f(u.color, color[0], color[1], color[2]);
    blit(dye.write);
    dye.swap();
  }

  function onVisibility() {
    if (!document.hidden && performance.now() < activeUntil) wake();
  }
  document.addEventListener("visibilitychange", onVisibility);

  function resize() {
    const w = Math.max(2, Math.round(canvas.clientWidth * CANVAS_SCALE));
    const h = Math.max(2, Math.round(canvas.clientHeight * CANVAS_SCALE));
    if (canvas.width === w && canvas.height === h && velocity) return;
    canvas.width = w;
    canvas.height = h;
    build();
  }
  resize();

  return {
    splat(clientX, clientY, dxPx, dyPx, color, radius = SPLAT_RADIUS) {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const aspect = canvas.width / canvas.height;
      let dx = dxPx / rect.width;
      let dy = -dyPx / rect.height;
      if (aspect < 1) dx *= aspect;
      if (aspect > 1) dy /= aspect;
      applySplat(
        (clientX - rect.left) / rect.width,
        1 - (clientY - rect.top) / rect.height,
        dx * SPLAT_FORCE,
        dy * SPLAT_FORCE,
        color,
        radius,
      );
      wake();
    },
    resize,
    destroy() {
      cancelAnimationFrame(raf);
      raf = 0;
      activeUntil = 0;
      document.removeEventListener("visibilitychange", onVisibility);
      // The context is left alive on purpose: React's dev double-mount reuses this
      // canvas, and a context lost here would stay lost.
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    },
  };
}

function makeProgram(gl: WebGL2RenderingContext, fragment: string): Program {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "shader");
    return shader;
  };
  const handle = gl.createProgram()!;
  gl.attachShader(handle, compile(gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(handle, compile(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(handle);
  if (!gl.getProgramParameter(handle, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(handle) ?? "program");

  const uniforms: Record<string, WebGLUniformLocation> = {};
  const count = gl.getProgramParameter(handle, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(handle, i);
    const location = info && gl.getUniformLocation(handle, info.name);
    if (info && location) uniforms[info.name] = location;
  }
  return { handle, uniforms };
}
