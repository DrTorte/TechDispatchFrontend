export class ScheduleOpening{
    //ID Is largely irrelevant here, but might be uesful down the line.

    ScheduleId: number;
    InstallZoneId : number;
    InstallZoneName: string;
    TimeSlotId: number;
    TimeSlotName: string;
    AvailableAmount: number;
    AvailableInstalls: number;

    Date: Date;
}