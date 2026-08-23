"use client";

import { motion, useReducedMotion } from "motion/react";

const inputs = [
  { label: "Forms", y: 90 },
  { label: "Inbox", y: 200 },
  { label: "APIs", y: 310 },
];

const outputs = [
  { label: "Dashboards", y: 90 },
  { label: "AI support", y: 200 },
  { label: "CRM sync", y: 310 },
];

/**
 * Decorative-but-honest diagram of the work: scattered inputs, one
 * orchestration core, reliable outputs. Flow is drawn with animated
 * dash offsets so `prefers-reduced-motion` stops it for free.
 */
export function SystemCanvas() {
  const reduced = useReducedMotion();

  return (
    <div className="glass relative rounded-2xl p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase">
            pipeline · live
          </span>
        </div>
        <span className="font-mono text-[10px] text-fg-muted">uptime 99.9%</span>
      </div>

      <svg viewBox="0 0 520 420" className="w-full" role="img" aria-label="Diagram: inputs flowing through an automation core into dashboards, AI support and CRM sync">
        <defs>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-accent-2)" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="edge2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-accent-2)" stopOpacity="0.25" />
            <stop offset="55%" stopColor="var(--color-accent-3)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--color-accent-3)" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Edges: inputs -> core */}
        {inputs.map((n, i) => (
          <g key={n.label}>
            <path
              d={`M110 ${n.y} C 158 ${n.y}, 168 200, 208 200`}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="1.5"
            />
            <path
              d={`M110 ${n.y} C 158 ${n.y}, 168 200, 208 200`}
              fill="none"
              stroke="url(#edge)"
              strokeWidth="1.5"
              strokeDasharray="5 19"
              className="animate-flow"
              style={{ animationDelay: `${i * 0.45}s` }}
            />
          </g>
        ))}

        {/* Edges: core -> outputs */}
        {outputs.map((n, i) => (
          <g key={n.label}>
            <path
              d={`M312 200 C 352 200, 362 ${n.y}, 410 ${n.y}`}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="1.5"
            />
            <path
              d={`M312 200 C 352 200, 362 ${n.y}, 410 ${n.y}`}
              fill="none"
              stroke="url(#edge2)"
              strokeWidth="1.5"
              strokeDasharray="5 19"
              className="animate-flow"
              style={{ animationDelay: `${0.9 + i * 0.45}s` }}
            />
          </g>
        ))}

        {/* Input nodes */}
        {inputs.map((n, i) => (
          <motion.g
            key={n.label}
            initial={reduced ? undefined : { opacity: 0, x: -14 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect x="14" y={n.y - 18} width="96" height="36" rx="10" fill="#0e1117" stroke="var(--color-line)" />
            <circle cx="34" cy={n.y} r="3" fill="var(--color-accent)" />
            <text x="48" y={n.y + 4} fill="#8d96a3" fontSize="12" fontFamily="var(--font-mono)">
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* Core */}
        <motion.g
          initial={reduced ? undefined : { opacity: 0, scale: 0.85 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "260px 200px" }}
        >
          <circle cx="260" cy="200" r="86" fill="url(#coreGlow)" />
          <path
            d="M260 148 L305 174 L305 226 L260 252 L215 226 L215 174 Z"
            fill="#0b0e13"
            stroke="var(--color-accent)"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
          <text x="260" y="194" textAnchor="middle" fill="#eef1f5" fontSize="13" fontWeight="600">
            Orchestration
          </text>
          <text x="260" y="212" textAnchor="middle" fill="#8d96a3" fontSize="11" fontFamily="var(--font-mono)">
            rules · AI · retries
          </text>
        </motion.g>

        {/* Output nodes */}
        {outputs.map((n, i) => (
          <motion.g
            key={n.label}
            initial={reduced ? undefined : { opacity: 0, x: 14 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ delay: 0.55 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect x="410" y={n.y - 18} width="106" height="36" rx="10" fill="#0e1117" stroke="var(--color-line)" />
            <circle cx="430" cy={n.y} r="3" fill="var(--color-accent-2)" />
            <text x="444" y={n.y + 4} fill="#8d96a3" fontSize="12" fontFamily="var(--font-mono)">
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line/70 pt-3 font-mono text-[10px] text-fg-muted">
        <span>events/day 12.4k</span>
        <span className="text-accent">errors 0</span>
        <span>avg latency 240ms</span>
      </div>
    </div>
  );
}
