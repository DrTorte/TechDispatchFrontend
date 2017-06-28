import { NgModule} from '@angular/core';
import {RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';

import { AppointmentsComponent } from './appointment/appointments.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentCreateComponent } from './appointment/appointment-create.component';
import {LoginComponent} from './user/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './not-found.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuardService] },
    { path: 'appointments/new', component: AppointmentCreateComponent, canActivate: [AuthGuardService]},
    { path: 'appointments/:id', component: AppointmentComponent, canActivate: [AuthGuardService]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule{};