import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild
} from '@angular/router';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let roles = route.data['roles'];
        return (this.authService.checkLogin(state.url)
            .map(result => {
                
                if (roles) {
                    return false;
                }
                return true;
            })
            .catch(res => { return Observable.of(true).map(() => false); }));
    }
}