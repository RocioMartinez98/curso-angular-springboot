import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(private authService : AuthService,
    private router : Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    
    if (!this.authService.isAuthenticated){
      this.router.navigate(['/login']);
      return false;
    }

    let role = next.data['role'] as string;
    console.log(role);
    if(this.authService.hasRole(role)){
      return true;
    }
    swal('Acceso denegado','No tienes acceso a esta acción','warning')
    this.router.navigate(['/clientes']);
    return false;
    
  }
};
