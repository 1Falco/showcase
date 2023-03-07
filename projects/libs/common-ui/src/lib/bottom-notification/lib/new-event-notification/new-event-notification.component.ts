import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-event-notification',
  templateUrl: './new-event-notification.component.html',
  styleUrls: ['./new-event-notification.component.scss'],
})
export class NewEventNotificationComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    public notificationRef: MatSnackBarRef<NewEventNotificationComponent>
  ) {}

  ngOnInit(): void {}
}
