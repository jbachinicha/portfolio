import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/**
 * Social card, generated once at build time. Lives at a path ending in
 * `.png` so static hosts serve it with the right content type.
 *
 * Satori renders radial gradients with a hard edge, so the atmosphere here
 * is built from linear gradients only.
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
          backgroundColor: "#06070a",
          backgroundImage:
            "linear-gradient(135deg, #06070a 0%, #0a1512 38%, #0b1408 62%, #06070a 100%)",
          padding: "76px 80px 68px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 11, height: 11, borderRadius: 9999, backgroundColor: "#34e3c2" }} />
            <div style={{ fontSize: 22, color: "#8d96a3", letterSpacing: 5 }}>
              {site.location.toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, color: "#eef1f5", fontWeight: 700, lineHeight: 1.06 }}>
            I turn manual work
          </div>
          <div style={{ fontSize: 80, color: "#a9ef62", fontWeight: 700, lineHeight: 1.06 }}>
            into working software
          </div>
          <div style={{ fontSize: 28, color: "#8d96a3", marginTop: 30 }}>
            Automation · Reporting · AI support · Integrations
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ height: 3, width: 132, backgroundColor: "#34e3c2" }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <div style={{ fontSize: 27, color: "#eef1f5", fontWeight: 600 }}>{site.fullName}</div>
            <div style={{ fontSize: 23, color: "#8d96a3" }}>{site.role}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
