import { Component, OnInit } from '@angular/core';
import { User, UserUpdate } from './user';

import { UserService } from './user.service';
import { MessageService } from '../message/message.service';

@Component({
    selector: 'my-account',
    templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
    constructor(private userService: UserService, private messageService: MessageService) { }

    user: UserUpdate;

    ngOnInit(): void {
        this.user = this.userService.myUser;
    }

    saveChanges(): void {
        let sub = this.userService.updateUser(this.user)
            .map(res => res as User).subscribe(res =>
                { this.userService.Users[this.userService.Users.findIndex(x => x.Id == this.user.Id)] = res; }, error => { this.messageService.addMessage(error) });
    }
}