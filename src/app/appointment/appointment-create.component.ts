import { Component } from '@angular/core';

import { AppointmentCreate } from './appointment';
import { AppointmentService } from './appointment.service';

import { CustomerCreate, Customer } from '../customer/customer';

@Component({
    selector: 'createAppointment',
    templateUrl: './appointment-create.html'
})
export class AppointmentCreateComponent{
    appointment : AppointmentCreate = new AppointmentCreate();
    customer: CustomerCreate = new CustomerCreate();
    selectedCustomer : Customer;
    
    constructor(private appointmentService: AppointmentService){

    }

    
}