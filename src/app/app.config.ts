import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngxs/store';
import player from 'lottie-web';
import { provideLottieOptions } from 'ngx-lottie';
import { provideMarkdown } from 'ngx-markdown';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { appStates } from './redux/app.states';
import { baseUrlInterceptor } from './shared/interceptors/base-url.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(appStates),
    provideAnimations(),
    provideHttpClient(withInterceptors([baseUrlInterceptor]), withFetch()),
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
