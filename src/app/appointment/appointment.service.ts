import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ProcessorService } from '../processor.service';

import { AppointmentDetail, AppointmentList } from './appointment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AppointmentService{
    private url = '/api/Appointments'
    public appointmentsList : AppointmentList[] = [];

    constructor (private http:Http, private processorService: ProcessorService){}

    public getAppointments(CustomerId? : number, TowerId? : number, ZoneId? : number, FromDate?: string, ToDate?: string, Count? : number, Skip? : number)  : Observable<AppointmentList[]>{ 
        return this.http.get(this.processorService.baseUrl + this.url + "?CustomerId=" + CustomerId +
        "&TowerId=" + TowerId +
        "&ZoneId=" + ZoneId +
        "&FromDate=" + FromDate +
        "&ToDate=" + ToDate +
        "&Count=" + Count +
        "&Skip=" + Skip,
        {headers: this.processorService.getHeaders()})
        .map(res=> res.json())
        .catch(this.processorService.handleError);
    }

    public getAppointment(Id: number){
        return this.http.get(this.processorService.baseUrl + this.url +"/" + Id, {headers: this.processorService.getHeaders()})
        .map(res=>res.json())
        .catch(this.processorService.handleError);
    }
}