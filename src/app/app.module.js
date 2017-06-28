"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var auth_service_1 = require("./auth/auth.service");
var auth_guard_service_1 = require("./auth/auth-guard.service");
var app_component_1 = require("./app.component");
var appointment_service_1 = require("./appointment/appointment.service");
var appointment_create_component_1 = require("./appointment/appointment-create.component");
var appointment_component_1 = require("./appointment/appointment.component");
var appointments_component_1 = require("./appointment/appointments.component");
var field_tech_service_1 = require("./field-tech/field-tech.service");
var processor_service_1 = require("./processor.service");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var nav_component_1 = require("./nav/nav.component");
var message_component_1 = require("./message/message.component");
var message_service_1 = require("./message/message.service");
var loading_component_1 = require("./loading.component");
var account_component_1 = require("./user/account.component");
var login_component_1 = require("./user/login.component");
var user_component_1 = require("./user/user.component");
var users_component_1 = require("./user/users.component");
var user_service_1 = require("./user/user.service");
var not_found_component_1 = require("./not-found.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routing_module_1.AppRoutingModule, forms_1.FormsModule],
        declarations: [app_component_1.AppComponent, appointments_component_1.AppointmentsComponent, appointment_component_1.AppointmentComponent, dashboard_component_1.DashboardComponent, nav_component_1.NavComponent, not_found_component_1.PageNotFoundComponent,
            account_component_1.AccountComponent, login_component_1.LoginComponent, user_component_1.UserComponent, users_component_1.UsersComponent, appointment_create_component_1.AppointmentCreateComponent,
            message_component_1.MessageComponent, loading_component_1.LoadingComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [processor_service_1.ProcessorService, appointment_service_1.AppointmentService, message_service_1.MessageService, user_service_1.UserService, auth_service_1.AuthService, auth_guard_service_1.AuthGuardService, field_tech_service_1.FieldTechService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map