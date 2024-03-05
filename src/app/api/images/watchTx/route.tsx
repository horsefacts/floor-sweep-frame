import { ImageResponse } from "next/og";
import Card from "@/app/components/Card";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  { params: { txHash } }: { params: { txHash: string } }
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
            marginTop: 10,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ fontSize: 48, padding: 20 }}>Broadcasting...</h1>
          <div style={{ display: "flex" }}>{txHash}</div>
        </div>
      </Card>
    ),
    {
      width: 800,
      height: 420,
    }
  );
}
