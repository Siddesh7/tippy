import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

export function calculateFlowRate(amountInEther) {
  if (
    typeof Number(amountInEther) !== "number" ||
    isNaN(Number(amountInEther)) === true
  ) {
    console.log(typeof Number(amountInEther));
    alert("You can only calculate a flowRate based on a number");
    return;
  } else if (typeof Number(amountInEther) === "number") {
    const monthlyAmount = ethers.utils.parseEther(amountInEther.toString());
    const calculatedFlowRate = Math.floor(monthlyAmount / 3600 / 24 / 30);
    return calculatedFlowRate;
  }
}

export async function createNewFlow(
  recipient,
  amountInEther,
  provider,
  signer
) {
  console.log(provider, signer);
  const sf = await Framework.create({
    chainId: 80001,
    provider: provider,
    signer: signer,
  });

  const daix = await sf.loadSuperToken("fDAIx");

  try {
    const monthlyAmount = ethers.utils.parseEther(amountInEther.toString());
    const calculatedFlowRate = Math.floor(monthlyAmount / 3600 / 24 / 30);
    const createFlowOperation = daix.createFlow({
      receiver: recipient,
      flowRate: calculatedFlowRate,
      // userData?: string
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}
