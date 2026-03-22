import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 900, lineHeight: 1, color: "#000", letterSpacing: "-0.05em" }}>CL</span>
      </div>
    ),
    { ...size }
  );
}
