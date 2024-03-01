interface Listing {
  order_hash: string;
  price: {
    current: {
      currency: string;
      decimals: number;
      value: string;
    };
  };
  protocol_data: {
    parameters: {
      offer: {
        token: string;
        identifierOrCriteria: string;
      }[];
    };
  };
}

async function getListing(
  slug: string,
): Promise<{ contract: string; tokenId: string; listing: Listing }> {
  const res = await fetch(
    `https://api.opensea.io/api/v2/listings/collection/${slug}/best`,
    {
      headers: {
        "x-api-key": process.env.OPENSEA_API_KEY ?? "",
      },
    },
  );
  const bestListing = await res.json();

  const listing = bestListing.listings[0];
  const {
    protocol_data: {
      parameters: { offer },
    },
  } = listing;
  const contract = offer[0].token;
  const tokenId = offer[0].identifierOrCriteria;

  return { contract, tokenId, listing };
}

export default getListing;
