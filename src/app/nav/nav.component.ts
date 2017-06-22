import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './nav.component.html'
})
export class NavComponent  { 
  constructor(private authService: AuthService){}

  LogOut(){
    this.authService.LogOut();
  }
}