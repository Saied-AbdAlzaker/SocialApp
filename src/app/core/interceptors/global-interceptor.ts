import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');
  const baseUrl = `https://linked-posts.routemisr.com`;
  let newHeaders = {};
  let platForm = inject(PLATFORM_ID);

  if (isPlatformBrowser(platForm)) {
    if (token !== null) {
      newHeaders = {
        token:token
      }
    }
  }

  let newRequest = req.clone({
    setHeaders: newHeaders, url: baseUrl + req.url
  })

  return next(newRequest);
};
