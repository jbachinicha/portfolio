import { readFile } from "node:fs/promises";
import path from "node:path";
import { Fragment, type ReactElement, type ReactNode } from "react";
import { ImageResponse } from "next/og";
import { HeroSceneStatic } from "@/components/HeroIllustration";
import { site } from "@/content/site";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

type Props = Record<string, unknown>;

/**
 * Turns a tree of pure components and SVG elements into an SVG string. The card renderer
 * cannot expand components inside an SVG, and `react-dom/server` is not allowed in a route
 * handler, so the scene is flattened by hand: components are called, host elements written
 * out with their camelCase props as dashed SVG attributes.
 */
function toSvg(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toSvg).join("");

  const { type, props } = node as ReactElement<Props>;
  if (type === Fragment) return toSvg(props.children as ReactNode);
  if (typeof type === "function") return toSvg((type as (p: Props) => ReactNode)(props));

  const attrs = Object.entries(props)
    .filter(([name, value]) => name !== "children" && name !== "className" && typeof value !== "object" && value != null)
    .map(([name, value]) => `${name === "viewBox" ? name : name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}="${value}"`)
    .join(" ");
  return `<${type} ${attrs}>${toSvg(props.children as ReactNode)}</${type}>`;
}

const font = (weight: 400 | 800) =>
  readFile(path.join(process.cwd(), `node_modules/@fontsource/archivo/files/archivo-latin-${weight}-normal.woff`));

/**
 * Social card, generated once at build time. Lives at a path ending in
 * `.png` so static hosts serve it with the right content type.
 *
 * Mirrors the home page: primary-colour field, the isometric JB scene, a big
 * white headline in the site's headline font and one highlighter accent. Keep
 * these hex values in step with `--color-primary` and `--color-mark` in
 * globals.css.
 */
export async function GET() {
  const [regular, extraBold] = await Promise.all([font(400), font(800)]);

  // The scene is flattened to an SVG string and handed over as an image.
  const scene = `data:image/svg+xml;base64,${Buffer.from(
    toSvg(<HeroSceneStatic width={640} height={457} />),
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0a7350",
          fontFamily: "Archivo",
        }}
      >
        {/* The scene bleeds off the right edge, as the hero's does on a wide screen. */}
        <div style={{ position: "absolute", right: -50, top: 58, display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by the image generator, not the page */}
          <img src={scene} width={640} height={457} alt="" />
        </div>

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px 56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 14, height: 14, borderRadius: 9999, backgroundColor: "#f6eb4a" }} />
            <div style={{ fontSize: 26, color: "rgba(255,255,255,0.9)" }}>{site.availability}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", fontWeight: 800 }}>
            <div style={{ fontSize: 112, color: "#ffffff", lineHeight: 0.96, letterSpacing: -5 }}>I build and</div>
            <div style={{ fontSize: 112, color: "#ffffff", lineHeight: 0.96, letterSpacing: -5 }}>modernise</div>
            <div style={{ fontSize: 112, color: "#ffffff", lineHeight: 0.96, letterSpacing: -5 }}>web apps.</div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              borderTop: "2px solid rgba(255,255,255,0.3)",
              paddingTop: 24,
            }}
          >
            <div style={{ fontSize: 32, color: "#ffffff", fontWeight: 800 }}>{site.fullName}</div>
            <div style={{ fontSize: 26, color: "rgba(255,255,255,0.9)" }}>{site.role}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
