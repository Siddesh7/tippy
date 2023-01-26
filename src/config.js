export const Framework = require("@superfluid-finance/sdk-core");
export const ethers = require("ethers");

// Ethers.js provider initialization
export const url =
  "https://polygon-mumbai.g.alchemy.com/v2/1ObE0PIpsFlEXG3NQCsRkNM8K5vAL8rP";
export const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
