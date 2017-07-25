import { Component, Input } from '@angular/core';

import { AppointmentCreate } from './appointment';
import { AppointmentSubReason } from './appointment-sub-reason';
import { AppointmentService } from './appointment.service';

import { ProcessorService } from '../processor.service';

import { CustomerCreate, Customer } from '../customer/customer';
import { CustomerService } from "../customer/customer.service";

@Component({
    selector: 'createAppointment',
    templateUrl: './appointment-create.component.html'
})
export class AppointmentCreateComponent{
    appointment : AppointmentCreate = new AppointmentCreate();
    appointmentReasons : AppointmentSubReason[] = [];
    newCustomer: CustomerCreate = new CustomerCreate();
    selectedCustomer : Customer = new Customer();
    selectedDate: Date;
    selectedTimeSlot: number;
    selectedTimeSlotName: string;

    //the current zone selected, so that we limit timeslots.
    currentZoneId: number | null;

    //below is for communicating with the dispatch date.
    startDate : Date;
    endDate : Date;

    constructor(private appointmentService: AppointmentService, private processorService: ProcessorService, private customerService: CustomerService){
        this.appointment.AppointmentType = ""; //set this so we get a default value in the select dropdown.
        let date : Date = new Date();

        this.startDate = new Date();
        this.endDate = new Date();
        this.endDate.setDate(this.startDate.getDate() + 7);
    }

    public createAppointment(){
        this.appointment.Customer = this.selectedCustomer;
        this.appointment.CustomerCreate = this.newCustomer;
        this.appointmentService.createAppointment(this.appointment).subscribe(res => {}, error => {this.processorService.handleError});
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

    public checkCustomer(){
        console.dir(this.selectedCustomer);
    }

    public selectedCustomerId(customerId: number){
        this.customerService.getCustomer(customerId).subscribe(res => {this.selectedCustomer = res}, error => {this.processorService.handleError(error)});
    }
}