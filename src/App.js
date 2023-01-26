import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import Main from "./components/Main";
import { polygonMumbai, goerli } from "wagmi/chains";
import Navbar from "./components/Navbar";
import "./App.css";
const chains = [polygonMumbai];
const alchemyId = "1ObE0PIpsFlEXG3NQCsRkNM8K5vAL8rP";

const client = createClient(
  getDefaultClient({
    appName: "BackerBoost",
    chains,
    alchemyId,
  })
);

const App = () => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Navbar />
        <Main />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
export default App;
