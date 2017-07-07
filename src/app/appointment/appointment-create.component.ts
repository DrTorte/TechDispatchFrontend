import { Component } from '@angular/core';

import { AppointmentCreate } from './appointment';
import { AppointmentSubReason } from './appointment-sub-reason';
import { AppointmentService } from './appointment.service';

import { CustomerCreate, Customer } from '../customer/customer';

@Component({
    selector: 'createAppointment',
    templateUrl: './appointment-create.component.html'
})
export class AppointmentCreateComponent{
    appointment : AppointmentCreate = new AppointmentCreate();
    appointmentReasons : AppointmentSubReason[] = [];
    newCustomer: CustomerCreate = new CustomerCreate();
    selectedCustomer : Customer = new Customer();
    
    constructor(private appointmentService: AppointmentService){
        this.appointment.AppointmentType = ""; //set this so we get a default value in the select dropdown.
    }

    public updateAppointmentTypes(){
        switch(this.appointment.AppointmentType){
            case "0" :
                this.appointmentReasons = this.appointmentService.appointmentsSubReasonsList.filter(x=>x.Install);
                break;
            case "1" :
                this.appointmentReasons = this.appointmentService.appointmentsSubReasonsList.filter(x=>x.Repair);
                break;
            case "2" :
                this.appointmentReasons = this.appointmentService.appointmentsSubReasonsList.filter(x=>x.Misc);
                break;
            default :
                this.appointmentReasons = [];
                break;
        }
    }    
}