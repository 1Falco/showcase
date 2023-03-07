import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventAction, EventBusService, SignalrService } from '@libs/event-bus';
import { environment } from '../environments/environment';
import { ProcessingEmitEvent } from 'projects/libs/event-bus/src/lib/enums/processing-emit-event';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly version = environment.version;
  public readonly userName = 'Jake';

  private readonly onDestroy = new Subject<void>();

  constructor(
    private router: Router,
    private singalRService: SignalrService,
    private eventService: EventBusService
  ) {
    this.singalRService.startConnection('', '123');
  }

  ngOnInit() {
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
