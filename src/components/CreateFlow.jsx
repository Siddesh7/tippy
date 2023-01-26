import React, { useState, useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Spinner,
  Card,
} from "react-bootstrap";
import "../createFlow.css";
import { ethers } from "ethers";
import { useProvider, useSigner } from "wagmi";

// let account;

//where the Superfluid logic takes place
async function createNewFlow(recipient, flowRate, provider, signer) {
  console.log(provider, signer);
  const sf = await Framework.create({
    chainId: 80001,
    provider: provider,
    signer: signer,
  });

  const daix = await sf.loadSuperToken("fDAIx");

  try {
    const createFlowOperation = daix.createFlow({
      receiver: recipient,
      flowRate: flowRate,
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

export const CreateFlow = () => {
  const [recipient, setRecipient] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [flowRate, setFlowRate] = useState("");
  const [flowRateDisplay, setFlowRateDisplay] = useState("");
  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();
  // const connectWallet = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       alert("Get MetaMask!");
  //       return;
  //     }
  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     console.log("Connected", accounts[0]);
  //     setCurrentAccount(accounts[0]);
  //     // let account = currentAccount;
  //     // Setup listener! This is for the case where a user comes to our site
  //     // and connected their wallet for the first time.
  //     // setupEventListener()
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const checkIfWalletIsConnected = async () => {
  //   const { ethereum } = window;

  //   if (!ethereum) {
  //     console.log("Make sure you have metamask!");
  //     return;
  //   } else {
  //     console.log("We have the ethereum object", ethereum);
  //   }

  //   const accounts = await ethereum.request({ method: "eth_accounts" });
  //   const chain = await window.ethereum.request({ method: "eth_chainId" });
  //   let chainId = chain;
  //   console.log("chain ID:", chain);
  //   console.log("global Chain Id:", chainId);
  //   if (accounts.length !== 0) {
  //     const account = accounts[0];
  //     console.log("Found an authorized account:", account);
  //     setCurrentAccount(account);
  //     // Setup listener! This is for the case where a user comes to our site
  //     // and ALREADY had their wallet connected + authorized.
  //     // setupEventListener()
  //   } else {
  //     console.log("No authorized account found");
  //   }
  // };

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  // }, []);

  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  function CreateButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  const handleRecipientChange = (e) => {
    setRecipient(() => ([e.target.name] = e.target.value));
  };

  const handleFlowRateChange = (e) => {
    setFlowRate(() => ([e.target.name] = e.target.value));
    let newFlowRateDisplay = calculateFlowRate(e.target.value);
    setFlowRateDisplay(newFlowRateDisplay.toString());
  };

  return (
    <div>
      <h2>Create a Flow</h2>

      <Form>
        <FormGroup className="mb-3">
          <FormControl
            name="recipient"
            value={recipient}
            onChange={handleRecipientChange}
            placeholder="Enter recipient address"
          ></FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormControl
            name="flowRate"
            value={flowRate}
            onChange={handleFlowRateChange}
            placeholder="Enter a flowRate in wei/second"
          ></FormControl>
        </FormGroup>
        <CreateButton
          onClick={() => {
            setIsButtonLoading(true);
            createNewFlow(recipient, flowRate, provider, signer);
            setTimeout(() => {
              setIsButtonLoading(false);
            }, 1000);
          }}
        >
          Click to Create Your Stream
        </CreateButton>
      </Form>

      <div className="description">
        <p>
          Go to the CreateFlow.js component and look at the <b>createFlow() </b>
          function to see under the hood
        </p>
        <div className="calculation">
          <p>Your flow will be equal to:</p>
          <p>
            <b>${flowRateDisplay !== " " ? flowRateDisplay : 0}</b> DAIx/month
          </p>
        </div>
      </div>
    </div>
  );
};
