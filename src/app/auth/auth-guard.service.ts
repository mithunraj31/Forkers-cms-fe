import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './Auth.service';
import { UserService } from '../services';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService,
    public router: Router,
    private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    if (route.data.role) {
      return this.checkUserRole(route.data.role);
    }
    return true;
  }

  checkUserRole(role: string): boolean {
    const user = this.userService.getLoggedUser();
    if (!user.roles?.includes(role)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
