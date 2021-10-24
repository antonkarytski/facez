import React from "react";
import Button from "../../ui/buttons/Button";
import classes from "./styles.module.scss";
import { connectWallet } from "../../lib/wallet/connectWallet";

export default function LoginButton() {
  return (
    <Button
      label={"Login"}
      className={classes.LoginButton}
      onClick={() => {
        connectWallet({ driver: "beacon-wallet" }).catch(() => {});
        //authModalModel.toggle();
      }}
    />
  );
}
