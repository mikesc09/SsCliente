import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    public authService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.authService.getToken()){
        this.router.navigateByUrl('/login');
        return false;
      }
    return true;
  }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authService.getToken()){
      this.router.navigateByUrl('/login');
      return false;
    }
    return true
    //return this.store.select(fromRoot.getIsAuth).pipe(take(1));    
  }
}
