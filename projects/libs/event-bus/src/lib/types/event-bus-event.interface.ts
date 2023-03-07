import { ProcessingEmitEvent } from '../enums/processing-emit-event';
import { QrActionEvent } from '../enums/qr-action-event';

export type InterfaceType = EventAction | ProcessingEmitEvent | QrActionEvent;

export enum EventAction {
  Create,
  Remove,
  Extend,
  ChangeOwner,
}
