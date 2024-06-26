async function getFulfillment(orderHash: string, address?: string) {
  const data = {
    listing: {
      hash: orderHash,
      chain: "base",
      protocol_address: "0x0000000000000068f116a894984e2db1123eb395",
    },
    fulfiller: {
      // We should probably POST the connected address. This works for basic
      // order listings but many use cases will want to know the caller
      // address to generate calldata.
      address: address || "0x0000000000000000000000000000000000000000",
    },
  };
  const res = await fetch(
    "https://api.opensea.io/api/v2/listings/fulfillment_data",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.OPENSEA_API_KEY ?? "",
      },
    }
  );
  return res.json();
}

export default getFulfillment;
