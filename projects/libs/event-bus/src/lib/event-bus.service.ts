import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { EmitEvent } from './emit-event';
import { InterfaceType } from './types/event-bus-event.interface';

@Injectable({
  providedIn: 'platform',
})
export class EventBusService {
  private subject$ = new Subject<EmitEvent>();
  private onDestroy = new Subject<void>();

  constructor() {}

  public emit(event: EmitEvent) {
    this.subject$.next(event);
  }

  public on(
    event: InterfaceType,
    action: (...args: any) => void,
    takeUnt: Subject<void> = this.onDestroy
  ): Subscription {
    return this.subject$
      .pipe(
        takeUntil(takeUnt),
        filter((e: EmitEvent) => e.name === event),
        map((e: EmitEvent) => e.value)
      )
      .subscribe(action);
  }
}
