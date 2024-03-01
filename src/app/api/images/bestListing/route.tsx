import { ImageResponse } from "next/og";
import Card from "@/app/components/Card";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  {
    params: { image, name, price },
  }: { params: { image: string; name: string; price: string } },
) {
  return new ImageResponse(
    (
      <Card>
        <div
          style={{
            color: "white",
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            width: "100%",
            height: "100vh",
          }}
        >
          <img
            src={image}
            style={{ height: "100%", objectFit: "cover", width: "50%" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 36,
              padding: 20,
            }}
          >
            <div>{name}</div>
            <div style={{ display: "flex" }}>Price: {price} ETH</div>
          </div>
        </div>
      </Card>
    ),
    {
      width: 800,
      height: 420,
    },
  );
}
