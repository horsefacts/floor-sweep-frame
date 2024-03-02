import seaportAbi from "@/app/lib/contracts/seaportAbi";
import getFulfillment from "@/app/lib/getFulfillment";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData } from "viem";

export async function POST(
  _req: NextRequest,
  { params: { orderHash } }: { params: { orderHash: string } },
) {
  const fulfillment = await getFulfillment(orderHash);
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
  const newSchema = {
    chainId: `eip155:${chain}`,
    method: "eth_sendTransaction",
    params: {
      functionSignature: `function ${functionSignature} payable`,
      to,
      data,
      value: value.toString(),
    },
  };
  //const oldSchema = {
  //  description: "fulfillBasicOrder",
  //  chainId: chain.toString(),
  //  to,
  //  value: value.toString(),
  //  data,
  //};
  return NextResponse.json(newSchema);
}

export const GET = POST;
