import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";

const Pkey = `0x${process.env.REACT_APP_PRIVATE_KEY}`;
console.log(Pkey);
const signer = new ethers.Wallet(Pkey);

export async function sendNotification(title, body, receiver) {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: title,
        body: body,
      },
      payload: {
        title: title,
        body: body,
        cta: "",
        img: "",
      },
      recipients: `eip155:5:${receiver}`, // recipient address
      channel: "eip155:5:0xB2aA4Fd98fdd12E0143E4A1F89ea35b966eaCebD", // your channel address
      env: "staging",
    });

    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
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
