import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionSpeedNotificationEvent } from './connection-speed-notification.component';

describe('ConnectionSpeedNotificationEvent', () => {
  let component: ConnectionSpeedNotificationEvent;
  let fixture: ComponentFixture<ConnectionSpeedNotificationEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionSpeedNotificationEvent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionSpeedNotificationEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
