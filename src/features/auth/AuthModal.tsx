import React from "react";
import { useMountedModel } from "../../lib/modelsBuilder/hook.mount";
import { authModalModel } from "./model.authModal";
import classes from "./styles.module.scss";
import { ReactComponent as MetaMask } from "../../assets/metamask-fox.svg";
import { ReactComponent as Beacon } from "../../assets/beacon.svg";
import IconButton from "../../ui/buttons/IconButton";
import { connectWallet } from "../../lib/wallet/connectWallet";
import { beaconWallet } from "../../lib/wallet/wallet.beacon";
import { ethereumWallet } from "../../lib/wallet/wallet.ethereum";

export default function AuthModal() {
  const isMounted = useMountedModel(authModalModel);

  if (!isMounted) return null;
  return (
    <div
      className={classes.Cover}
      onClick={(e) => {
        authModalModel.unmount();
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.Modal}
      >
        <IconButton
          icon={<MetaMask />}
          label={"MetaMask"}
          textClassName={classes.MetaMaskText}
          onClick={() => {
            connectWallet(ethereumWallet).catch(() => {});
          }}
        />
        <IconButton
          icon={<Beacon />}
          className={classes.Beacon}
          onClick={() => {
            connectWallet(beaconWallet).catch(() => {});
          }}
        />
      </div>
    </div>
  );
}
