import { transition, trigger, useAnimation } from '@angular/animations';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { enterTopAnimation, leaveTopAnimation } from '@libs/common-ui';
import { UserDomainApiService } from '@libs/user-domain';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'user-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        useAnimation(enterTopAnimation)
      ]),
      transition(':leave', [
        useAnimation(leaveTopAnimation)
      ]),
    ]),
  ]
})
export class WelcomeComponent implements OnInit {
  @Input() public userName = '';
  public welcoming = new BehaviorSubject<boolean>(true);

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  constructor(
    private router: Router,
    private userService: UserDomainApiService
  ) {}

  loadUser() {
    return this.userService.getUserData();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.welcoming.next(false);
      this.welcoming.complete();
    }, 3000);
  }

  navigateToSettings() {
    this.router.navigate(['user']);
  }

  navigate() {
    this.router.navigateByUrl('http://localhost:4200/user');
  }
}
