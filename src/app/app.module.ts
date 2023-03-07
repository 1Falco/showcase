import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsAppModule } from './modules/google-maps.module';

import {MatButtonModule} from '@angular/material/button'
import { UserWelcomeModule } from './modules/user-welcome.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UserWelcomeModule,
    GoogleMapsAppModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
