import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import Main from "./components/Main";
import { polygonMumbai, goerli } from "wagmi/chains";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ProfilePage from "./pages/Profile";
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
        {" "}
        <ChakraProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Main />}></Route>

              <Route path="/dashboard" element={<ProfilePage />}></Route>
            </Routes>
          </BrowserRouter>{" "}
        </ChakraProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
export default App;
