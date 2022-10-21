import { hexValue } from "ethers/lib/utils";

export const mainChainId = "0x38";

export const networkConfigMap: Record<string, any> = {
  137: {
    chainId: hexValue(137),
    chainName: "polygon",
    rpcUrls: ["https://polygon-rpc.com/"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com"],
  },
};

export const scanAddressMap: Record<string, string> = {
  137: "https://polygonscan.com",
};
