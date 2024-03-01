import { Token } from "./getToken";

interface Contract {
  address: string;
  chain: string;
}

interface Collection {
  name: string;
  description: string;
  image_url: string;
  opensea_url: string;
  contracts: Contract[];
  tokens: Token[];
}

async function getCollection(slug: string): Promise<Collection> {
  let res = await fetch(`https://api.opensea.io/api/v2/collections/${slug}`, {
    headers: {
      "x-api-key": process.env.OPENSEA_API_KEY ?? "",
    },
  });
  const collection = await res.json();

  res = await fetch(`https://api.opensea.io/api/v2/collection/${slug}/nfts`, {
    headers: {
      "x-api-key": process.env.OPENSEA_API_KEY ?? "",
    },
  });
  const { nfts } = await res.json();
  return { ...collection, tokens: nfts };
}

export default getCollection;
