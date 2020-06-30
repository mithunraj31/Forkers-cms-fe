import { Component } from '@angular/core';
import { LoginUser } from '../../../@core/entities/LoginUser';
import { AuthService } from '../../../auth/Auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'frk-login',
    templateUrl: './login.component.html',
    styles: ['.error-message { color: red; }']
})
export class LoginComponent {

    // @variable form: Login from group
    // config form validataion for login email and password
    // initial in class constructor
    // @type {FormGroup}
    form: FormGroup;

    // @variable user: login user data model
    // store data from login form
    // the model contains email, password and keep signin fact
    // use for login request to MiDM backend API
    // @type {LoginUser}
    user: LoginUser;

    // @variable isLoading: http request is processing fact
    // use for display and drop loading spiner on login form submit button
    // @type {boolean}
    isLoading: boolean = false;

    // @variable errorMessages: error message listings
    // when http response some error will add text to the variable
    // then display on top of login form
    // @type {string[]}
    errorMessages: string[] = [];

    constructor(private authService: AuthService,
        private router: Router,
        private userService: UserService) {
        this.user = <LoginUser>{};

        // config form validataion
        this.form = new FormGroup(
            {
                'email': new FormControl(this.user.email, [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.email
                ]),
                'password': new FormControl(this.user.password, [
                    Validators.required,
                    Validators.minLength(8)
                ]),
            }
        );
            // initalize default data
        this.user = {
            email: '',
            password: '',
            eulaEnabled: false
        }
    }

    // @method login: authentication by email and password
    // the method request permission to access the application
    // form backend API, the request attach email, password and signin fact
    // after obtain response save to token and necessary value to local context
    // if request rejected will display error message on top of login form
    // @return {void}
    login() {
        // display loading spiner
        this.isLoading = true;

        // remove previos messages
        this.errorMessages = [];

        this.authService.login(this.user)
            .subscribe(result => {

            }, error => {
                
            });
    }
}