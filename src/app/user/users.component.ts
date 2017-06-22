import { Component, OnInit } from '@angular/core'

import { User, UserCreate } from './user';
import { UserService } from './user.service';

import { MessageService } from '../message/message.service';

@Component({
    selector: "users-list",
    templateUrl: "./users.component.html"
})
export class UsersComponent implements OnInit{
    constructor(private userService: UserService, private messageService: MessageService) { }
    message: string;
    newUser: UserCreate = new UserCreate();

    ngOnInit() {
        this.message = "Loading...";
        this.userService.getUsers().subscribe(result => {
            this.userService.Users = result;
            this.userService.sortUsers();
            this.message = "";
        });
        this.userService.getUserRoles().subscribe(result => {
            this.userService.UserRoles = result;
        }, error => {
            this.messageService.addMessage(error);
            });
    }

    CreateUser(user: User): void {
        this.userService.createUser(user)
            .subscribe(result => {
                this.userService.Users.push(result);
            }, error => {
                this.messageService.addMessage(error);
            });
        this.userService.sortUsers();
    }

    DisableUser(user: User): void {
        this.userService.disableUser(user)
            .subscribe(result => {
                this.userService.Users.splice(this.userService.Users.findIndex(x => x.Email == user.Email), 1);
                this.userService.Users.push(user);
            }, error => {
                this.messageService.addMessage(error);
            });
        this.userService.sortUsers();
    }

    EnableUser(user: User): void {
        this.userService.enableUser(user)
            .subscribe(result => {
                this.userService.Users.splice(this.userService.Users.findIndex(x => x.Email == user.Email), 1);
                this.userService.Users.push(user);
            }, error => {
                this.messageService.addMessage(error);
            });
        this.userService.sortUsers();
    }
}