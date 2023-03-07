import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventNotificationComponent } from './new-event-notification.component';

describe('NewEventNotificationComponent', () => {
  let component: NewEventNotificationComponent;
  let fixture: ComponentFixture<NewEventNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEventNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
