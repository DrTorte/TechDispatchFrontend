import { Component } from '@angular/core';

import { AppointmentCreate } from './appointment';
import { AppointmentService } from './appointment.service';

@Component({
    selector: 'createAppointment',
    templateUrl: './appointment-create.html'
})
export class AppointmentCreateComponent{
    appointment : AppointmentCreate = new AppointmentCreate();

    constructor(private appointmentService: AppointmentService){

    }

    
}