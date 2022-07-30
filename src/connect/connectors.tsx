import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const NetworkContextName = "NETWORK";
export const connectorLocalStorageKey = "connectorId";
export const injected = new InjectedConnector({
  supportedChainIds: [137],
});

const walletConfig = {
  // walletconnect 用到的bridge
  bridge: "https://bridge.walletconnect.org",
  infuraId: "ad92ef65d7cf424e807d09f01cdb7702",
  rpc: {
    137: "https://polygon-rpc.com/",
  },
};

export const walletconnect: WalletConnectConnector = new WalletConnectConnector(
  {
    qrcode: true,
    rpc: walletConfig.rpc,
    bridge: walletConfig.bridge,
  }
);
