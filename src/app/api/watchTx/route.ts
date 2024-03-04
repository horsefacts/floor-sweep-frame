import getListing from "@/app/lib/getListing";
import getToken from "@/app/lib/getToken";
import { NextRequest, NextResponse } from "next/server";
import { formatEther } from "viem";

const HOST = process.env["HOST"] ?? "https://floor-sweep-frame.vercel.app";

export async function POST(req: NextRequest) {
  const frameData = await req.json();
  const {
    untrustedData: { transactionId: txHash },
  } = frameData;
  const hash = txHash.slice(1, -1);

  const onceUponResponse = await fetch(
    `https://api.onceupon.gg/v1/transactions/${hash}/farcaster-frame`,
    {
      method: "POST",
      body: JSON.stringify(frameData),
    },
  );
  const html = await onceUponResponse.text();

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
