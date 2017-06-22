import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User, UserUpdate, UserRoles } from './user';
import { ProcessorService } from '../processor.service';
import { MessageService } from '../message/message.service';

import { Login } from './login';

@Injectable()
export class UserService {
    private accountUrl: string = '/api/Account/';
    private usersUrl: string = '/api/User';
    private loginUrl: string = '/api/token';

    public myRank: string;
    public myUser: User = null;
    public Users: User[] = [];

    public UserRoles: UserRoles[] = [];

    constructor(private http: Http,
        private processorService: ProcessorService, private messaegService: MessageService) {
    }

    setLogin(user: User): void {
        this.myUser = user;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    // get users.
    getUsers(): Observable<User[]> {
        return this.http.get(this.usersUrl, { headers: this.processorService.getHeaders() })
            .map(res => res.json() as User[])
            .catch(this.handleError);
    }

    getUser(id: string): Observable<User> {
        return this.http.get(this.usersUrl + '/' + id, { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateUser(user: UserUpdate): Observable<User> {
        return this.http.post(this.usersUrl + "/update", this.processorService.getParams(user), { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    getUserRoles(): Observable<UserRoles[]>{
        return this.http.get(this.usersUrl + "/roles", { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    createUser(user:User): Observable<User> {
        return this.http.post(this.usersUrl, this.processorService.getParams(user), { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    disableUser(user: User): Observable<User> {
        return this.http.post(this.usersUrl + "/disable", this.processorService.getParams(user), { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    enableUser(user: User): Observable<User> {
        return this.http.post(this.usersUrl + "/disable", this.processorService.getParams(user), { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    //send to sort the users.
    sortUsers() {
        this.Users = this.Users.sort(function (a, b) {
            let A = a.LastName.toLocaleLowerCase() + a.FirstName.toLocaleLowerCase();
            let B = b.LastName.toLocaleLowerCase() + b.FirstName.toLocaleLowerCase();
            if (A > B) {
                return 1;
            } else if (A < B) {
                return -1;
            }

            return 0;
        });
    }

    // logout.
    logOut() {
        this.myUser = new User;
        document.cookie = 'Authorization=;expires = ' + new Date;
    }

    // generic error handling.
    private handleError(error: any): Observable<any> {
        let errorMsg: string;
        let errors: Object;
        errors = JSON.parse(error['_body']);
        let modelState = errors['ModelState'];
        if (modelState) {
            errorMsg = "";
            for (let y in modelState) {
                if (errorMsg.indexOf(modelState[y]) == -1) {
                    errorMsg += modelState[y];
                }
            }
        }
        if (error['_body']) {
            return Observable.throw(errorMsg || JSON.parse(error['_body']).error_description || JSON.parse(error['_body']).mes);
        }
    }
}
