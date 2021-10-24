import {
  AccountInfo,
  AcknowledgeResponse,
  BroadcastResponseOutput,
  ConnectionContext,
  ErrorResponse,
  Network,
  NetworkType,
  OperationResponseOutput,
  P2PPairingRequest,
  PermissionResponseOutput,
  SignPayloadResponseOutput,
  Transport,
} from "@airgap/beacon-sdk";
import { BlockExplorer } from "@airgap/beacon-sdk/dist/cjs/utils/block-explorer";
import { PostMessagePairingRequest } from "@airgap/beacon-sdk/dist/cjs/types/PostMessagePairingRequest";
import { ExtendedPostMessagePairingResponse } from "@airgap/beacon-sdk/dist/cjs/types/PostMessagePairingResponse";
import { ExtendedP2PPairingResponse } from "@airgap/beacon-sdk/dist/cjs/types/P2PPairingResponse";
import { AlertButton } from "@airgap/beacon-sdk/dist/cjs/ui/alert/Alert";
import {
  BeaconEvent,
  ExtraInfo,
  WalletInfo,
} from "@airgap/beacon-sdk/dist/cjs/events";

export type Crypto = "ethereum" | "beacon-wallet";
export type ConnectWalletProps = {
  driver?: Crypto;
};
type EthereumRequest = {
  eth_requestAccounts: string[];
};
export type Ethereum = {
  request: <A extends keyof EthereumRequest>(props: {
    method: A;
  }) => Promise<EthereumRequest[A]>;
};

export type WalletInterface = {
  connect: () => Promise<void>;
};

interface RequestSentInfo {
  extraInfo: ExtraInfo;
  walletInfo: WalletInfo;
}

export type EventsData = {
  [BeaconEvent.PERMISSION_REQUEST_SENT]: RequestSentInfo;
  [BeaconEvent.PERMISSION_REQUEST_SUCCESS]: {
    account: AccountInfo;
    output: PermissionResponseOutput;
    blockExplorer: BlockExplorer;
    connectionContext: ConnectionContext;
    walletInfo: WalletInfo;
  };
  [BeaconEvent.PERMISSION_REQUEST_ERROR]: {
    errorResponse: ErrorResponse;
    walletInfo: WalletInfo;
  };
  [BeaconEvent.OPERATION_REQUEST_SENT]: RequestSentInfo;
  [BeaconEvent.OPERATION_REQUEST_SUCCESS]: {
    account: AccountInfo;
    output: OperationResponseOutput;
    blockExplorer: BlockExplorer;
    connectionContext: ConnectionContext;
    walletInfo: WalletInfo;
  };
  [BeaconEvent.OPERATION_REQUEST_ERROR]: {
    errorResponse: ErrorResponse;
    walletInfo: WalletInfo;
  };
  [BeaconEvent.SIGN_REQUEST_SENT]: RequestSentInfo;
  [BeaconEvent.SIGN_REQUEST_SUCCESS]: {
    output: SignPayloadResponseOutput;
    connectionContext: ConnectionContext;
    walletInfo: WalletInfo;
  };
  [BeaconEvent.SIGN_REQUEST_ERROR]: {
    errorResponse: ErrorResponse;
    walletInfo: WalletInfo;
  };
  [BeaconEvent.BROADCAST_REQUEST_SENT]: RequestSentInfo;
  [BeaconEvent.BROADCAST_REQUEST_SUCCESS]: {
    network: Network;
    output: BroadcastResponseOutput;
    blockExplorer: BlockExplorer;
    connectionContext: ConnectionContext;
    walletInfo: WalletInfo;
  };
  [BeaconEvent.BROADCAST_REQUEST_ERROR]: {
    errorResponse: ErrorResponse;
    walletInfo: WalletInfo;
  };
  [BeaconEvent.ACKNOWLEDGE_RECEIVED]: {
    message: AcknowledgeResponse;
    extraInfo: ExtraInfo;
    walletInfo: WalletInfo;
  };
  [BeaconEvent.LOCAL_RATE_LIMIT_REACHED]: undefined;
  [BeaconEvent.NO_PERMISSIONS]: undefined;
  [BeaconEvent.ACTIVE_ACCOUNT_SET]: AccountInfo;
  [BeaconEvent.ACTIVE_TRANSPORT_SET]: Transport;
  [BeaconEvent.SHOW_PREPARE]: {
    walletInfo?: WalletInfo;
  };
  [BeaconEvent.HIDE_UI]: ("alert" | "toast")[] | undefined;
  [BeaconEvent.PAIR_INIT]: {
    p2pPeerInfo: () => Promise<P2PPairingRequest>;
    postmessagePeerInfo: () => Promise<PostMessagePairingRequest>;
    preferredNetwork: NetworkType;
    abortedHandler?(): void;
    disclaimerText?: string;
  };
  [BeaconEvent.PAIR_SUCCESS]:
    | ExtendedPostMessagePairingResponse
    | ExtendedP2PPairingResponse;
  [BeaconEvent.CHANNEL_CLOSED]: string;
  [BeaconEvent.INTERNAL_ERROR]: {
    text: string;
    buttons?: AlertButton[];
  };
  [BeaconEvent.UNKNOWN]: undefined;
};
