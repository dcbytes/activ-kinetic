import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { provideMarkdown } from 'ngx-markdown';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideMarkdown({ loader: HttpClient }),
    provideLottieOptions({
      player: () => player,
    }),
    MessageService,
    importProvidersFrom(
      NgxPageScrollCoreModule.forRoot({
        scrollOffset: 150,
      }),
    ),
  ],
};
