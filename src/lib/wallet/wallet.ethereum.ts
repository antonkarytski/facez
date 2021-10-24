import detectEthereumProvider from "@metamask/detect-provider";
import { Ethereum } from "./types";

export const ethereumWallet = {
  async connect() {
    try {
      const provider = await detectEthereumProvider();
      if (!provider) return;
      if (provider === window.ethereum) {
        const ethereumProvider = provider as Ethereum;
        const res = await ethereumProvider.request({
          method: "eth_requestAccounts",
        });
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  },
};
