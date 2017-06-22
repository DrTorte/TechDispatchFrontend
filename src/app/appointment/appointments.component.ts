import { Component, Input } from '@angular/core';

import { AppointmentDetail, AppointmentList } from './appointment';
import { AppointmentService} from './appointment.service';

import { MessageService } from '../message/message.service';

@Component({
    selector: 'appointments',
    templateUrl: './appointments.component.html'
})

export class AppointmentsComponent{
    @Input() mdWidth : number = 4;
    loading : boolean;

    //to make sure these are refetched, if need be.
    private fetchAttempts = 0;
    private fetchAttemptsLimit = 5;

    constructor(private appointmentService:AppointmentService,private messageService:MessageService){
        if (appointmentService.appointmentsList.length == 0){
            this.DefaultAppointments();
        }
    }

    public DefaultAppointments(){
        this.loading = true;
        let date : Date = new Date();
        date.setHours(0,0,0,0);
        this.appointmentService.getAppointments(null,null,null,date.toISOString()).subscribe(result =>{
            this.loading = false;
            this.fetchAttempts = 0;
            this.appointmentService.appointmentsList = result as AppointmentList[];
        }, error => {
            this.fetchAttempts++;
            if (this.fetchAttempts < this.fetchAttemptsLimit){
                console.error("Couldn't connect, retrying...");
                this.DefaultAppointments();
            } else {
                this.loading = false;
                this.messageService.addMessage(error);
            }
        });
    }
}