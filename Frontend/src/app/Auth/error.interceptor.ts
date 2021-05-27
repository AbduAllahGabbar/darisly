import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          if (this.router.url !== '/index') {
            location.reload(true);
          }
        } else if (err.status === 500 || err.status === 0) {
          this.spinner.hide();
          this.callSwal(
            'Internal server error',
            'An error occured while processing your request. Please Contact the system administrator.',
            'error'
          );

          console.log('Internal Server Error');
        } else {
          this.spinner.hide();
          this.callSwal(
            'Connection Error',
            'Please check your connection and try again',
            'error'
          );
          console.log('All Other Errors');
        }
        const error = err.error.message || err.statusText;
        return throwError(err);
      })
    );
  }
  callSwal(title, text, icon): any {
    return Swal.fire({
      title,
      text,
      icon,
      timer: 1500,
      showConfirmButton: false,
    });
  }
}
