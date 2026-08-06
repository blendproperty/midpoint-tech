import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#14231F",
          color: "#EDEFEA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 24, letterSpacing: 4, color: "#E0A63D" }}>
          MIDRAND · GAUTENG
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 64, fontWeight: 700, maxWidth: 900 }}>
          {site.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 28, color: "#C7CDC0" }}>
          Midpoint Tech — {site.address.line1}, {site.address.city}
        </div>
      </div>
    ),
    { ...size }
  );
}
