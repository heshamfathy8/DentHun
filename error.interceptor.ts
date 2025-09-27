// error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = 'Something went wrong';

      if (error.error?.message) {
        errorMsg = error.error.message;
      } else if (error.status) {
        errorMsg = `Error ${error.status}: ${error.statusText}`;
      }

      messageService.add({
        severity: 'error',
        summary: 'Request Failed',
        detail: errorMsg,
      });

      return throwError(() => error);
    })
  );
};
