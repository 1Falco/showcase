import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventNotificationService } from '../notification-service';
import { NewEventNotificationComponent } from '../new-event-notification/new-event-notification.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    NewEventNotificationComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers: [
    // EventNotificationService,
    // MatSnackBar,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
})
export class NewEventNotificationModule {}
