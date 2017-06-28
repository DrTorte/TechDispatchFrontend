import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild
} from '@angular/router';

import { Headers, Http, Response } from '@angular/http';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user';
import { Login } from '../user/login';

import { ProcessorService } from '../processor.service';
import { MessageService } from '../message/message.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, private processorService: ProcessorService, private messageService: MessageService,
        private router: Router, private http: Http) {

    }

    private url: string = "/api/Account/"
    private loginUrl: string = "/api/login";
    isLoggedIn: boolean;
    redirectUrl: string;

    checkAuthCookie(): string {
        let cookies = document.cookie.split(";");
        for (let c of cookies) {
            let keyVal = c.split("=");
            if (keyVal[0] == "Authorization") {
                return keyVal[1];
            }
        }
        return "";
    }

    login(username: string, password: string): Observable<User> {
        let data = { userName: username, password: password, grant_type: "password" };

        return this.http.post(this.processorService.baseUrl + this.loginUrl, this.processorService.getParams(data), { headers: this.processorService.getHeaders() })
            .map(result => result.json()).catch(this.handleError);
    }

    LogOut(): void {
        this.userService.myUser = null;
        document.cookie = "Authorization=;expires = " + new Date;
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }

    checkLogin(targetUrl: string): Observable<User> {
        //check if the user is logged in by checking if myuser is set.
        if (this.userService.myUser) {
            return Observable.of(true).map(res => this.userService.myUser);
        }

        //check for auth cookie's existance.
        if (this.checkAuthCookie() != "") {
            return this.http.get(this.processorService.baseUrl + this.url, { headers: this.processorService.getHeaders() })
                .map(result => { this.userService.setLogin(result.json()); })
                .catch(res => {
                    if (res.status == "0"){
                        window.location.replace("/404.html");
                    } else {
                        this.LogOut(); 
                        return Observable.throw(res.json());
                    }
                })
        } else {
            this.redirectUrl = targetUrl;
            this.router.navigate(['/login']);
            return Observable.throw(() => "No user");
        }
    }

    private handleError(error: any): Observable<any> {
        let errorMsg = "";
        if (error['_body']) {

            return Observable.throw(JSON.parse(error['_body']).error_description || JSON.parse(error['_body']).mes);
        }
    }
}