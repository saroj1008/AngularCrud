import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StateService } from './state.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const state = inject(StateService);
  const token = state.state().jwt;
  if (token) {
    const req_with_token = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    return next(req_with_token);
  } else {
    return next(req);
  }
};
