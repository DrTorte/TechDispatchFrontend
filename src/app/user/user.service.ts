import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User, UserUpdate, UserRoles } from './user';
import { ProcessorService } from '../processor.service';
import { MessageService } from '../message/message.service';

import {AppointmentService} from '../appointment/appointment.service';
import { FieldTechService } from '../field-tech/field-tech.service';
import { TowerService } from '../tower/tower.service';

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
        private processorService: ProcessorService, private messageService: MessageService, 
        private fieldTechService : FieldTechService, private appointmentService: AppointmentService,
        private towerService: TowerService) {
    }

    setLogin(user: User): void {
        this.myUser = user;
        //go get some metadata as well.
        this.messageService.addMessage("Getting techs", "Techs",true);
        this.fieldTechService.getTechs()
            .subscribe(x=>{this.fieldTechService.fieldTechs = x;
            this.messageService.addMessage(x.length + " techs received.", "Techs", true);});

        this.messageService.addMessage("Getting appointment sub-reasons", "Appointments",true);
        this.appointmentService.getAppointmentSubReasons()
            .subscribe(x=>{this.appointmentService.appointmentsSubReasonsList = x;
                this.messageService.addMessage(x.length + " sub-reasons received.", "Appointments", true);});

        this.messageService.addMessage("Getting towers", "Towers",true);
        this.towerService.getTowers()
            .subscribe(x=>{this.towerService.towers =x;
                this.towerService.towers
                .sort((a?,b?) => {
                    if (a.TowerName < b.TowerName){
                        return -1;
                    } else if (a.TowerName > b.TowerName){
                        return 1;
                    }
                    return 0;
                });
                this.messageService.addMessage(x.length + " towers received.", "Towers", true);});

        this.messageService.addMessage("Getting zones", "Towers",true);
        this.towerService.getZones()
            .subscribe(x=>{this.towerService.zones = x;
            this.messageService.addMessage(x.length + " zones received.", "Towers", true);});
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    // get users.
    getUsers(): Observable<User[]> {
        return this.http.get(this.processorService.baseUrl + this.usersUrl, { headers: this.processorService.getHeaders() })
            .map(res => res.json() as User[])
            .catch(this.handleError);
    }

    getUser(id: string): Observable<User> {
        return this.http.get(this.processorService.baseUrl + this.usersUrl + '/' + id, { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateUser(user: UserUpdate): Observable<User> {
        return this.http.post(this.processorService.baseUrl + this.usersUrl + "/update", JSON.stringify(user), { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    getUserRoles(): Observable<UserRoles[]>{
        return this.http.get(this.processorService.baseUrl + this.usersUrl + "/roles", { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    createUser(user:User): Observable<User> {
        return this.http.post(this.processorService.baseUrl + this.usersUrl, JSON.stringify(user), { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    disableUser(user: User): Observable<User> {
        return this.http.post(this.processorService.baseUrl + this.usersUrl + "/disable", JSON.stringify(user), { headers: this.processorService.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
    }

    enableUser(user: User): Observable<User> {
        return this.http.post(this.processorService.baseUrl + this.usersUrl + "/disable", JSON.stringify(user), { headers: this.processorService.getHeaders() })
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
