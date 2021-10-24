import { WalletInterface } from "./types";

export async function connectWallet(driver: WalletInterface) {
  driver.connect().catch(() => {});
}
