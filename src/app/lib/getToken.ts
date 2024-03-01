export interface Token {
  name: string;
  image_url: string;
  opensea_url: string;
}

async function getToken(contract: string, tokenId: string): Promise<Token> {
  const res = await fetch(
    `https://api.opensea.io/api/v2/chain/base/contract/${contract}/nfts/${tokenId}`,
    {
      headers: {
        "x-api-key": process.env.OPENSEA_API_KEY ?? "",
      },
    },
  );
  const { nft } = await res.json();
  return nft;
}

export default getToken;
