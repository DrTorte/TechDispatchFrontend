import { AppointmentComment } from './appointment-comment';

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