import { Component, Inject, OnInit, Type } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { EventNotificationType } from './types/event-notification.type';
import { EventNotificationService } from './notification-service';

@Component({
  template: '',
})
export class EventNotificationComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    private notficationService: EventNotificationService
  ) {}

  ngOnInit(): void {
  }

  // public openNotification<T = EventNotificationType>(type: Type<T>, data: any) {
  //   this._snackBar.openFromComponent(type, {
  //     data: data,
  //   });
  // }
}
