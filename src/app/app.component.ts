import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConnectionSpeedNotificationEvent,
  enterFromLeft,
  EventNotificationService,
  leaveToRight,
  NewEventNotificationComponent
} from '@libs/common-ui';
import { EventBusService, SignalrService } from '@libs/event-bus';
import { ProcessingEmitEvent } from 'projects/libs/event-bus/src/lib/enums/processing-emit-event';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { ConnectionService, ConnectionSpeed } from './shared/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition(':enter', [
        useAnimation(enterFromLeft)
      ]),
      transition(':leave', [
        useAnimation(leaveToRight)
      ]),
    ]),
  ]
})
export class AppComponent {
  public readonly version = environment.version;
  private readonly onDestroy = new Subject<void>();


  private connectionSpeed: Observable<ConnectionSpeed>;

  constructor(
    private router: Router,
    private singalRService: SignalrService,
    private eventService: EventBusService,
    private notificationService: EventNotificationService,
    private connectionService: ConnectionService
  ) {
    this.singalRService.startConnection('urlToWatch', 'watcherID');

    this.connectionSpeed = this.connectionService.monitorConnectionSpeed();
  }

  openNotification() {
    this.notificationService.notify<NewEventNotificationComponent>(
      NewEventNotificationComponent,
      'Hi there'
    );
  }

  ngOnInit() {
    this.connectionSpeed.pipe(
      takeUntil(this.onDestroy),
      tap(v => console.log('speed', v)),
      map((state: ConnectionSpeed) => {
        state == 'slow'
          ? this.notificationService.notify(ConnectionSpeedNotificationEvent, 'Your connection is slow :(', { type: 'warning' })
          : this.notificationService.dismissNotification();
      })
    ).subscribe();



    this.eventService.on(
      ProcessingEmitEvent.FeatureProcessing,
      (value: any) => {
        console.log('processing', value);
      },
      this.onDestroy
    );
  }

  navigate() {
    this.router.navigate(['user']);
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
