export class Customer {
    CustomerID: number;
    Name: string;
    Address: string;
    InstallZoneId: number;
}

export class CustomerCreate {
    Name: string;
    Address: string;
    PhoneNumber: string;
    TowerId: number;
    IPId? : number;
}