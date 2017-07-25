import { AppointmentComment } from './appointment-comment';
import { Customer, CustomerCreate } from '../customer/customer';

export class AppointmentList{
    AppointmentID: number;
    CustomerID: number;
    CustomerName: string;
    CustomerAddress: string;
    CustomerPhone: string;

    AppointmentType: string;
    Date: Date;

    TimeSlotName: string;
    ZoneName: string;

    FieldTechID: number;
    FieldTechUserID: string;
    CurrentState: string;
}

export class AppointmentDetail extends AppointmentList {
    IPID: number;
    IP: string;

    TowerID: number;
    TowerName: string;

    Comments: AppointmentComment[];
}

export class AppointmentCreate extends AppointmentList {
    TowerID: number;
    Comments: AppointmentComment[];

    IPID?: number;

    Customer: Customer;
    CustomerCreate: CustomerCreate;
    //and for good measure, add a customercreate and customer field here.

}