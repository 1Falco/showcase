import { Type, enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const production = environment.production;

export const startApp = (fromComponent: Type<unknown> = AppModule) => {
  if (!production) {
    return platformBrowserDynamic().bootstrapModule(fromComponent);
  }
  enableProdMode();
  return platformBrowserDynamic().bootstrapModule(fromComponent);
};

startApp()
  .then(() => {
    console.log(!production ? 'Welcome to Dev Mode' : undefined);
  })
  .catch((err) => console.error(err));
