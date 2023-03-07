import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { EventActionType } from '../models/types/event-type';
import { IEvent } from '../models/interfaces/envent-interface';

@Directive()
export abstract class EventClass implements IEvent {
  @Input() public events: EventActionType[] = [];
  @Input() public displayValue: string = '';

  @Output() public add: EventEmitter<void> = new EventEmitter<void>();
  @Output() public edit: EventEmitter<EventActionType> =
    new EventEmitter<EventActionType>();
  @Output() public navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() public delete: EventEmitter<EventActionType> =
    new EventEmitter<EventActionType>();
  @Output() public selected: EventEmitter<EventActionType> =
    new EventEmitter<EventActionType>();
  @Output() public viewInfo: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  addEvent(): void {
    this.add.emit();
  }

  editEvent(event: EventActionType): void {
    this.edit.emit(event);
  }

  deleteEvent(event: EventActionType): void {
    this.delete.emit(event);
  }

  navigateToEvent(id: string): void {
    this.navigate.emit(id);
  }

  selectEvent(event: EventActionType): void {
    this.selected.emit(event);
  }
}
