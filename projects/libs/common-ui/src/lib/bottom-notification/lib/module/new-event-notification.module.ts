import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ConnectionSpeedNotificationEvent } from '../connection-state-notification/connection-speed-notification.component';
import { NewEventNotificationComponent } from '../new-event-notification/new-event-notification.component';

@NgModule({
  declarations: [
    NewEventNotificationComponent,
    ConnectionSpeedNotificationEvent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
})
export class NewEventNotificationModule { }
