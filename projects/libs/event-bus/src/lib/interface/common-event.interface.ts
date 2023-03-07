export interface CommonEventInterface {
  readonly id: GUID;
  readonly registrationDate: Date;
  readonly expiryDate: Date;
  name: string;
  state: EventState;
}

type GUID = string & { readonly __brand: "GUID" };

export type EventState = "In progress" | "Canceled" | "Expired" | "Registered";

