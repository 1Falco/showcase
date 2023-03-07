import { InterfaceType } from "./types/event-bus-event.interface";

export class EmitEvent {
  constructor(public name: InterfaceType, public value?: any) {}
}
