import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { User, UserUpdate } from './user';
import { UserService } from './user.service';

import { MessageService } from '../message/message.service';

@Component({
    selector: 'user-detail',
    templateUrl:'./user.component.html'
})
export class UserComponent implements OnInit{
    user: UserUpdate;
    newUser: User = new User();
    DisplayNewUser: boolean = false;
    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private messageService: MessageService) {

    }

    ngOnInit() {
        let sub = this.route.params.subscribe(params => {
            this.userService.getUser(params['id'])
                .map(res => res)
                .subscribe(response => this.user = response as UserUpdate);
        });
        this.userService.getUserRoles().subscribe(result => {
            this.userService.UserRoles = result;
        }, error => {
            this.messageService.addMessage(error);
        });
    }

    saveChanges(): void {
        let sub = this.userService.updateUser(this.user)
            .map(res => res as User).subscribe(res => { this.userService.Users[this.userService.Users.findIndex(x => x.Id == this.user.Id)] = res; }, error => { this.messageService.addMessage(error) });
    }
}