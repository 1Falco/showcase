import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [WelcomeComponent],
})
export class UserWelcomeModule {}
