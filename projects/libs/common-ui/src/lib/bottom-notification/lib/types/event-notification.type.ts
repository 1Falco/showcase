import { NewEventNotificationComponent } from "../new-event-notification/new-event-notification.component";
import { ConnectionSpeedNotificationEvent } from './../connection-state-notification/connection-speed-notification.component';

export type EventNotificationType = NewEventNotificationComponent | ConnectionSpeedNotificationEvent;
