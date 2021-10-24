import { EventsData } from "./types";
import { createEvent } from "effector";
import { AlertButton } from "@airgap/beacon-sdk/dist/cjs/ui/alert/Alert";

export function createBeaconEventHandler<T extends keyof EventsData>() {
  const event = createEvent<
    { data: EventsData[T] } & { callback?: AlertButton[] }
  >();
  async function handler(data: EventsData[T], callback?: AlertButton[]) {
    event({ data, callback });
  }
  handler.event = event;
  return handler;
}
