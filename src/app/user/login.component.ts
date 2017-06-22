import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { User } from './user';
import { UserService } from './user.service';
import { MessageService } from '../message/message.service';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
    message: string;
    loading: boolean = false;
    constructor(
        private userService: UserService, private authService: AuthService, private messageService: MessageService,
        private router: Router, private authGuard: AuthGuardService) { }

    Login(username: string, password: string) {
        this.loading = true;
        //remove cookies.
        let result = this.authService.login(username, password)
            .map(res => res)
            .subscribe(data => {
                //set the cookies.
                document.cookie = "Authorization=Bearer " + data['access_token'] + 
                    ";expires=" + data['.expires'] + ";";
                if (!this.authService.redirectUrl || this.authService.redirectUrl == "login") {
                    this.authService.redirectUrl = "dashboard";
                }

                let myUser = this.authService.checkLogin(this.authService.redirectUrl)
                    .map(res => res)
                    .subscribe(result => {
                        this.loading = false;
                        this.userService.setLogin(result);
                        console.log(result);
                        this.router.navigate([this.authService.redirectUrl]);});
                        //now go get the user.
                    }, error => {
                        this.messageService.addMessage(error);
                        this.loading = false;
                });
    }

    ngOnInit() {
    }

    private CheckLogin() {
        var result = this.authGuard.canActivate(null, null).subscribe(res => console.log(res));
    }
}