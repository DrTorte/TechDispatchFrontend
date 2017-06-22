export class User {
    Id: string;
    FirstName: string;
    LastName: string;
    Email: string;

    Disabled: boolean;
}

export class UserCreate extends User {
    Password?: string;
    ConfirmPassword?: string;
}
export class UserUpdate extends User {
    Password?: string;
    ConfirmPassword?: string;
}

export class UserRoles {
    ID: number;
    Name: string;
    Description: string;
}