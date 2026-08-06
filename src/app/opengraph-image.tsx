import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#14140f",
          padding: 80,
          color: "#f8f6f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ display: "flex", width: 16, height: 16, borderRadius: 999, background: "#cf4520" }} />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 600, lineHeight: 1.1, maxWidth: 900 }}>{siteConfig.tagline}</div>
        <div style={{ display: "flex", fontSize: 24, marginTop: 20, color: "#dcd6c4" }}>
          {siteConfig.address.line1}, {siteConfig.address.city} · {siteConfig.address.region}
        </div>
      </div>
    ),
    { ...size },
  );
}
