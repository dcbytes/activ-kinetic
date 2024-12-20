// eslint-disable-next-line import/no-unresolved
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environment/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('website-api::')) {
    req = req.clone({
      url: `${environment.apiBaseUrl}/${req.url.replace('website-api::', '')}`,
      withCredentials: true,
    });
  } else {
    if (!req.url.startsWith('https://script.google.com')) {
      req = req.clone({
        withCredentials: true,
      });
    }
  }
  return next(req);
};

