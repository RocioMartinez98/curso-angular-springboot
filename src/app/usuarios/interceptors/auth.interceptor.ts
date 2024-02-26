import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import {Router} from '@angular/router';

import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService, private router:Router){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(
      catchError(e=>{
        if(e.status == 401){
          if(this.authService.isAuthenticated){
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }
        if(e.status == 403){
          swal('Permiso denegado','No tienes permiso para realizar esta acción','warning');
          this.router.navigate(['/clientes']);
        }
        return throwError(() => e);
      })
    );
  }
}