import getCollection from "@/app/lib/getCollection";
import { Metadata } from "next";

const HOST = process.env["HOST"] ?? "https://floor-sweep-frame.vercel.app";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const collection = await getCollection(slug);
  if (collection.contracts[0].chain !== "base") {
    const imageParams = new URLSearchParams({
      error: "Invalid chain",
      message: "Must be a collection on Base.",
    });
    const imageUrl = `${HOST}/api/images/error?${imageParams.toString()}`;

    return {
      title: "Floor Sweeper",
      description: "A frame transactions demo",
      openGraph: {
        title: "Floor Sweeper",
        images: [imageUrl],
      },
      other: {
        "fc:frame": "vNext",
        "fc:frame:image": imageUrl,
        "fc:frame:button:1": "Find a collection on Base",
        "fc:frame:button:1:action": "link",
        "fc:frame:button:1:target": "https://opensea.io/rankings?chain=base",
      },
    };
  }

  const randomIndex = Math.floor(Math.random() * collection.tokens.length);
  const token = collection.tokens[randomIndex];

  const postUrl = `${HOST}/api/collection/${slug}/bestListing`;

  const imageParams = new URLSearchParams({
    name: collection.name,
    image: token.image_url,
  });
  const imageUrl = `${HOST}/api/images/collection?${imageParams.toString()}`;

  return {
    title: "Floor Sweeper",
    description: "A frame transactions demo",
    openGraph: {
      title: "Floor Sweeper",
      images: [imageUrl],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": imageUrl,
      "fc:frame:post_url": postUrl,
      "fc:frame:button:1": "View on OpenSea",
      "fc:frame:button:1:action": "link",
      "fc:frame:button:1:target": collection.opensea_url,
      "fc:frame:button:2": "🔍 Find best listing",
    },
  };
}

export default async function Collection({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const collection = await getCollection(slug);
  return (
    <main className="flex flex-col text-center lg:p-16">
      <h1>Floor Sweeper frame demo: {JSON.stringify(collection, null, 2)}</h1>
    </main>
  );
}
