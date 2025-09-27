import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class Intercepter implements HttpInterceptor {
  requestCount = 0;

  constructor(
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      let headers
      const token = localStorage.getItem('token');

      if (token && token.length > 7) {
        headers = request.headers.set('Authorization', 'Bearer ' + token);
      }
      request = request.clone({
        headers: headers,
      });
    this.requestCount++;
    return next.handle(request).pipe(
      finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) {
        }
      }),
      catchError((error) => {
        // this.toastr.error('Error', error?.error.message);
        return throwError(error);
      })
    );
  }
}
