import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfig } from './app.config';

platformBrowserDynamic().bootstrapModule(AppConfig)
  .catch(err => console.error(err));

export const config = {};
