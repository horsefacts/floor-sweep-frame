import getFulfillment from "@/app/lib/getFulfillment";
import getListing from "@/app/lib/getListing";
import getToken from "@/app/lib/getToken";
import { NextRequest, NextResponse } from "next/server";
import { formatEther } from "viem";

const HOST = process.env["HOST"] ?? "https://floor-sweep-frame.vercel.app";

export async function POST(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } },
) {
  const { contract, tokenId, listing } = await getListing(slug);
  const token = await getToken(contract, tokenId);

  const postUrl = `${HOST}/api/watchTx`;
  const imageParams = new URLSearchParams({
    name: token.name,
    image: token.image_url,
    price: formatEther(BigInt(listing.price.current.value)),
  });
  const imageUrl = `${HOST}/api/images/bestListing?${imageParams.toString()}`;
  const txUrl = `${HOST}/api/tx/${listing.order_hash}`;

  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <meta property="og:title" content="Floor Sweeper" />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="${imageUrl}" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          <meta name="fc:frame:button:1" content="View on OpenSea" />
          <meta name="fc:frame:button:1:action" content="link" />
          <meta name="fc:frame:button:1:target" content="${token.opensea_url}" />
          <meta name="fc:frame:button:2" content="🧹 Sweep it!" />
          <meta name="fc:frame:button:2:action" content="tx" />
          <meta name="fc:frame:button:2:target" content="${txUrl}" />
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
