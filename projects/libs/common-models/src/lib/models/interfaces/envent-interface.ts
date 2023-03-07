import { EventActionType } from '../types';

export interface IEvent {
  addEvent: () => void;

  editEvent: (event: EventActionType) => void;

  deleteEvent: (event: EventActionType) => void;

  navigateToEvent: (id: string) => void;

  selectEvent: (event: EventActionType) => void;
}
