import { ProcessingEmitEvent } from "../enums/processing-emit-event";
import { DanceEmitEvent } from "../interface/dance-event.interface";
import { SportsEventInterface } from "../interface/sports-event.interface";

// export type InterfaceType = CommonEventInterface & EventAction;
export type InterfaceType = EventAction | ProcessingEmitEvent;

type EventsInterfaces = DanceEmitEvent & SportsEventInterface;


export enum EventAction {
    Create,
    Remove,
    Extend,
    ChangeOwner
}
