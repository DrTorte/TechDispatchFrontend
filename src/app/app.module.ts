import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule }   from './app-routing.module';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';

import { AppComponent }   from './app.component';

import { AppointmentService } from './appointment/appointment.service';
import { AppointmentCreateComponent } from './appointment/appointment-create.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentsComponent } from './appointment/appointments.component';

import { FieldTechService } from './field-tech/field-tech.service';

import { ProcessorService } from './processor.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';

import { MessageComponent } from './message/message.component';
import { MessageService} from './message/message.service';
import { LoadingComponent } from './loading.component';

import { AccountComponent} from './user/account.component';
import { LoginComponent } from './user/login.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './user/users.component';
import { UserService } from './user/user.service';


import { PageNotFoundComponent} from './not-found.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, AppRoutingModule, FormsModule ],
  declarations: [ AppComponent, AppointmentsComponent,AppointmentComponent, DashboardComponent, NavComponent, PageNotFoundComponent,
  AccountComponent,LoginComponent,UserComponent,UsersComponent, AppointmentCreateComponent,
  MessageComponent, LoadingComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ProcessorService, AppointmentService, MessageService, UserService, AuthService, AuthGuardService, FieldTechService]
})
export class AppModule { }
