import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppointmentList, AppointmentDetail } from './appointment';
import { AppointmentService } from './appointment.service';

import { MessageService } from '../message/message.service';

@Component({
    selector: 'appointment',
    templateUrl: './appointment.component.html'
})
export class AppointmentComponent{
    app : AppointmentDetail;
    loading : boolean;

    constructor(private appointmentService: AppointmentService, private route:ActivatedRoute, private messageService:MessageService){
        this.loading = true;
        this.route.params.subscribe(params => {
            this.appointmentService.getAppointment(+params['id'])
            .subscribe(result => {this.app = result as AppointmentDetail; this.loading = false;}, 
            error => {this.messageService.addMessage(error)});
        });

    }

    public querifyAddress() : string{
        let url = this.app.CustomerAddress.replace(" ","+");
        return url;
    }
}