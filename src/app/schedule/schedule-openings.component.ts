import { Component, Input } from '@angular/core';
import {ScheduleOpening} from './schedule-opening';
import {ScheduleService} from './schedule.service';

import {TimeSlot} from './time-slot';
import { Zone } from '../tower/zone';
import { Observable } from "rxjs/Observable";
@Component({
    templateUrl: './schedule-openings.component.html',
    selector: 'scheduleOpenings',
    inputs:['startDate','endDate','timeSlotId','zone', 'selectedDate', 'selectedSlot']
})
export class ScheduleOpeningsComponent{

    @Input()
    public startDate: Date;
    @Input()
    public endDate: Date;
    private dates : Date[]; //this is for listing all of them.

    @Input()
    public timeSlotId: number;
    @Input()
    public zone: Zone;

    @Input()
    public selectedDate: Date;

    @Input()
    public selectedSlot: number;

    public openings: ScheduleOpening[] = [];

    get myOpenings() : Observable<ScheduleOpening[]> {
        return Observable.of(this.openings);
    }
    
    get getDates() : Observable<Date[]> {
        return Observable.of(this.dates);
    }
    get timeSlots(){
        return this.scheduleService.timeSlots;
    }

    constructor(private scheduleService: ScheduleService){
    }

    ngOnInit(){
        this.getOpenings();
    }

    private changeDate(count : number){
        this.startDate.setDate(this.startDate.getDate() + count);
        this.endDate.setDate(this.endDate.getDate() + count);
        this.getOpenings();
    }

    private getOpenings(){

        //refresh the dates.
        this.dates = [];
        let i = new Date(this.startDate);
        while (i <= this.endDate){
            this.dates.push(new Date(i));
            i.setDate(i.getDate() +1);
        }

        this.scheduleService.getOpenings(this.startDate, this.endDate, this.timeSlotId, this.zone)
            .subscribe(res => {this.openings = res});
    }

    private selectSlot(date:Date, timeSlotId:number){
        this.selectedDate = date;
        this.selectedSlot = timeSlotId;
    }

    private formattedDate(date : Date){
        let days : string[] = [];
        days[0] = "Sun";
        days[1] = "Mon";
        days[2] = "Tue";
        days[3] = "Wed";
        days[4] = "Thu";
        days[5] = "Fri";
        days[6] = "Sat";
        let day :string = days[date.getDay()];

        let months = new Array();
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";
        let month = months[date.getMonth()];

        return day + ", " + month + " " + date.getDate();

    }
}