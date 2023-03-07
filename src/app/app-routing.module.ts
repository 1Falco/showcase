import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // {
  //   path: '',
  //   component: AppComponent,
  // },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'not-found',
    component: UserComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
