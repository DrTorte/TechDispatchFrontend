import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ProcessorService } from '../processor.service';

import { AppointmentDetail, AppointmentList, AppointmentCreate } from './appointment';
import { AppointmentSubReason} from './appointment-sub-reason';
import { Customer, CustomerCreate } from '../customer/customer';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AppointmentService{
    private url = '/api/Appointments'
    public appointmentsList : AppointmentList[] = [];
    public appointmentsSubReasonsList: AppointmentSubReason[] = [];

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

    public getAppointmentSubReasons(onlyActive: boolean = false){
        return this.http.get(this.processorService.baseUrl + this.url + "/Reasons", {headers:this.processorService.getHeaders()})
        .map(res=>res.json() as AppointmentSubReason[])
        .catch(this.processorService.handleError);
    }

    public createAppointment(app : AppointmentCreate){
        return this.http.post(this.processorService.baseUrl+this.url + "/Create", JSON.stringify(app), {headers: this.processorService.getHeaders()})
            .map(res=> res.json() as AppointmentList)
            .catch(this.processorService.handleError);
    }
}