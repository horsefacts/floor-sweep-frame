import { NextRequest, NextResponse } from "next/server";

const HOST = process.env["HOST"] ?? "https://floor-sweep-frame.vercel.app";

export async function POST(req: NextRequest) {
  const frameData = await req.json();
  const {
    untrustedData: { transactionId: txHash },
  } = frameData;
  const hash = txHash.slice(1, -1);

  let postUrl = `${HOST}/api/watchTx`;
  let imageUrl = `${HOST}/api/images/watchTx`

  const txData = await fetch(
    `https://api.onceupon.gg/v1/transactions/${txHash}`,
  );
  if (txData.status === 200) {
    imageUrl = `https://og.onceupon.gg/card/${txHash}?datetime=${Date.now()}`
  }

  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <meta property="og:title" content="Floor Sweeper" />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="${imageUrl}" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          <meta name="fc:frame:button:1" content="Refresh" />
          <meta name="fc:frame:button:2" content="View on BaseScan" />
          <meta name="fc:frame:button:2:action" content="link" />
          <meta name="fc:frame:button:2:target" content="https://basescan.org/tx/${hash}" />
        </head>
        <body></body>
      </html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
}
