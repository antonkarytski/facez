import { WalletInterface } from "./types";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { BeaconEvent } from "@airgap/beacon-sdk";
import { createBeaconEventHandler } from "./model.beacon.events";

const permissionRequestSuccessHandler = createBeaconEventHandler<BeaconEvent.PERMISSION_REQUEST_SUCCESS>();

const wallet = new BeaconWallet({
  name: "Facez",
  eventHandlers: {
    PERMISSION_REQUEST_SUCCESS: {
      handler: permissionRequestSuccessHandler,
    },
  },
});
export const beaconWallet: WalletInterface = {
  async connect() {
    await wallet.requestPermissions({
      network: {
        //@ts-ignore
        type: "mainnet" | "florencenet" | "granadanet" | "custom",
      },
    });
  },
};
