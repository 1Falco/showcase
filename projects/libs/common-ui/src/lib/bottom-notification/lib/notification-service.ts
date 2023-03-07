import { Inject, Injectable, Type } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { EventNotificationComponent } from './event-notification.component';
import { EventNotificationType } from './types/event-notification.type';

@Injectable({ providedIn: 'root' })
export class EventNotificationService {
  private snackbarRef: any;

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  public notify<T = EventNotificationType>(
    type: Type<T>,
    message: string,
    notificationInfo?: NotificationInfoType,
    link?: string
  ) {
    console.log('here', type)
    const def = this.defaultValues();
    this.snackbarRef = this.snackBar.openFromComponent(type, {
      announcementMessage: message,
      panelClass: this.getSnackbarPanelClass(
        notificationInfo?.type || def.type
      ),
      // data: this.data,
      duration: notificationInfo?.durationMS || def.durationMS,
      verticalPosition: 'bottom',
    });
    this.setBehaviorByActionType(
      notificationInfo?.actionType || def.actionType,
      link
    );
    // this.snackbarRef = this.snackBar.open(
    //   message,
    //   notificationInfo?.actionType || def.actionType,
    //   {
    //     panelClass: this.getSnackbarPanelClass(
    //       notificationInfo?.type || def.type
    //     ),
    //     duration: notificationInfo?.durationMS || def.durationMS,
    //     verticalPosition: 'bottom',
    //   }
    // );
    // this.setBehaviorByActionType(
    //   notificationInfo?.actionType || def.actionType,
    //   link
    // );
  }

  public helpMeNotification(notificationInfo: NotificationInfoType) {
    this.snackBar.openFromComponent(
      EventNotificationComponent,
      this.createCustomConfig(notificationInfo)
    );
  }

  private createCustomConfig(notificationInfo: NotificationInfoType) {
    const def = this.defaultValues();
    const config: MatSnackBarConfig = {
      panelClass: this.getSnackbarPanelClass(
        notificationInfo?.type || def.type
      ),
      duration: notificationInfo.durationMS || def.durationMS,
      verticalPosition: 'bottom',
      data: notificationInfo.link,
    };
    return config;
  }

  private defaultValues(): NotificationInfoType {
    return {
      actionType: 'Close',
      durationMS: undefined,
      type: 'info',
    };
  }

  private setBehaviorByActionType(
    actionType: ActionType | undefined,
    link: string | undefined
  ) {
    this.snackbarRef
      .onAction()
      .pipe(take(1))
      .subscribe({
        next: () => {
          switch (actionType) {
            case 'Close': {
              this.snackbarRef.dismiss();
              break;
            }
            case 'Go!': {
              this.navigateTo('');
              break;
            }
            case 'Refresh': {
              this.refresh();
              break;
            }
            default:
              this.snackbarRef.dismiss();
          }
        },
      });
  }

  private navigateTo(link: string) {
    this.router.navigate([link]);
  }

  private refresh() {
    window.location.reload();
  }

  private logOut() {}

  private getSnackbarPanelClass(type: NotificationType | undefined) {
    switch (type) {
      case 'info':
        return ['snack-bar'];
      case 'success':
        return ['snack-bar-success'];
      case 'warning':
        return ['snack-bar-warning'];
      case 'error':
        return ['snack-bar-error'];
      default:
        return ['snack-bar'];
    }
  }
}
export interface NotificationInfo {
  type?: NotificationType;
  actionType?: ActionType;
  durationMS?: number;
  link?: string;
}

export type ActionType = 'Close' | 'Go!' | 'Support' | 'Refresh';
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

type NotificationInfoType = Partial<NotificationInfo>;
