import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef, MAT_SNACK_BAR_DATA
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-connection-speed-notification',
  templateUrl: './connection-speed-notification.component.html',
  styleUrls: ['./connection-speed-notification.component.scss'],
})
export class ConnectionSpeedNotificationEvent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    public notificationRef: MatSnackBarRef<ConnectionSpeedNotificationEvent>
  ) {}

  ngOnInit(): void {
  }
}
