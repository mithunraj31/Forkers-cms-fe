import { Router } from '@angular/router';
import { LoginUser } from '../@core/entities/LoginUser';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAccount } from '../@core/entities/UserAccount.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host = environment.host;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private jwtHelper: JwtHelperService;
  constructor(private http: HttpClient, private router: Router) {
    // create new instant for JwtHelperService
    this.jwtHelper = new JwtHelperService();
  }

  // the method request permission to access the application
  // form backend API, the request attach email, password and signin fact
  // after obtain response, save token and user infomation to local storange
  // if request rejected will throw exception to observable object (subscriber) 
  // @return {Observable<any>}
  public login(user: LoginUser) {
    return this.http.post<any>(this.host + "/login", user)
      .pipe(map(response => {
        // check JWT is existing
        if (response?.token) {
          // store obtained jwt
          this.setSession({ token: response.token });
          // get user information from payload
          const payload: any = this.jwtHelper.decodeToken(response.token);
          const user: UserAccount = <UserAccount>{
            name: `${payload.firstName} ${payload.lastName}`,
            id: payload.userId,
            email: payload.sub,
            roles: [payload.scopes],
            stk_user: payload.stk_user
          };
          //  save user data to local storage 
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          throw new Error();
        }
      }));
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    // localStorage.removeItem("id_session");
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }

  public setSession(authResult) {

    localStorage.setItem('id_token', authResult.token);
    // localStorage.setItem("id_session", authResult.session);
    if (authResult.token) this.loggedIn.next(true);
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('id_token')) {
      //this.loggedIn.next(true);
      return true;
    } else {
      //this.loggedIn.next(false);
      return false;
    }
  }
  public isLoggedIn() {
    if (this.isAuthenticated()) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }

    return this.loggedIn.asObservable();
  }
}
