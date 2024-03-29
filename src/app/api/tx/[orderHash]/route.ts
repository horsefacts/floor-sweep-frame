import seaportAbi from "@/app/lib/contracts/seaportAbi";
import getFulfillment from "@/app/lib/getFulfillment";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, getAbiItem } from "viem";

export async function POST(
  req: NextRequest,
  { params: { orderHash } }: { params: { orderHash: string } }
) {
  const frameData = await req.json();
  const {
    untrustedData: { address },
  } = frameData;
  const fulfillment = await getFulfillment(orderHash, address);
  const transaction = fulfillment.fulfillment_data.transaction;
  const { chain, to, value, function: functionSignature } = transaction;
  if (!functionSignature.startsWith("fulfillBasicOrder_efficient_6GL6yc")) {
    return new NextResponse("Got unexpected function", { status: 500 });
  }
  const data = encodeFunctionData({
    abi: seaportAbi,
    functionName: "fulfillBasicOrder_efficient_6GL6yc",
    args: [transaction.input_data.parameters],
  });
  const errorsAbi = seaportAbi.filter((t) => t.type === "error");
  const functionAbi = getAbiItem({
    abi: seaportAbi,
    name: "fulfillBasicOrder_efficient_6GL6yc",
  });
  const txData = {
    chainId: `eip155:${chain}`,
    method: "eth_sendTransaction",
    params: {
      //abi: [functionAbi, ...errorsAbi],
      to: "0x79d31bFcA5Fda7A4F15b36763d2e44C99D811a6C",
      value: "42069",
      gas: "1000000",
    },
  };
  return NextResponse.json(txData);
}

export const GET = POST;
