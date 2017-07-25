import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ScheduleOpening } from './schedule-opening';
import { ProcessorService } from '../processor.service';
import { MessageService } from '../message/message.service';
import { TimeSlot } from "./time-slot";
import { Zone } from "../tower/zone";

@Injectable()
export class ScheduleService{
    private url :string = '/api/Schedules';

    public timeSlots : TimeSlot[] = [];
    constructor(private http: Http, private processorService:ProcessorService){
        this.getTimeSlots().subscribe(res=> this.timeSlots = res);
    }

    getOpenings(startDate: Date = null, endDate: Date = null, timeSlotId: number = null, zone : Zone = null){
        var myUrl = this.processorService.baseUrl + this.url + "/Schedules?";    
        if (startDate != null){
            myUrl += "startDate=" + startDate.toISOString() + "&";
        }
        if (endDate != null){
            myUrl += "endDate="+endDate.toISOString()+"&";
        }
        return this.http.get(myUrl, {headers: this.processorService.getHeaders()})
        .map(res=>res.json() as ScheduleOpening[]);
    }

    public getTimeSlots(){
        var myUrl = this.processorService.baseUrl + this.url + "/TimeSlots";
        return this.http.get(myUrl, {headers: this.processorService.getHeaders()})
            .map(res=>res.json() as TimeSlot[]);
    }
}