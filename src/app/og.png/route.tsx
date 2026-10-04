import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/**
 * Social card, generated once at build time. Lives at a path ending in
 * `.png` so static hosts serve it with the right content type.
 *
 * Mirrors the site: primary-colour field, white headline, one highlighter
 * accent. Keep these hex values in step with `--color-primary` and
 * `--color-mark` in globals.css.
 */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a7350",
          padding: "76px 80px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, backgroundColor: "#f6eb4a" }} />
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.88)" }}>{site.location}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, color: "#ffffff", fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            I turn manual work
          </div>
          <div style={{ fontSize: 84, color: "#ffffff", fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            into working software.
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.88)", marginTop: 34 }}>
            Automation, reporting, AI support and integrations
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 18,
            borderTop: "2px solid rgba(255,255,255,0.3)",
            paddingTop: 26,
          }}
        >
          <div style={{ fontSize: 28, color: "#ffffff", fontWeight: 700 }}>{site.fullName}</div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.88)" }}>{site.role}</div>
        </div>
      </div>
    ),
    size,
  );
}
