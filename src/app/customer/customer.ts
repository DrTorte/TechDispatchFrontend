export class Customer {
    CustomerID: number;
    Name: string;
    Address: string;
}

export class CustomerCreate {
    Name: string;
    Address: string;
    PhoneNumber: string;
    TowerId: number;
    IPId? : number;
}