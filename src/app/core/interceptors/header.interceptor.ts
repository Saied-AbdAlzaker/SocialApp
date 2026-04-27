import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('socialToken');
  if (token) {
    if (
      req.url.includes('posts') ||
      req.url.includes('comments') ||
      req.url.includes('notifications')
    ) {
      req = req.clone({
        setHeaders: {
          AUTHORIZATION: `Bearer ${token}`,
        },
      });
    }
  }
  return next(req);
};
