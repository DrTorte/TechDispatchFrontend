"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var appointment_1 = require("./appointment");
var appointment_service_1 = require("./appointment.service");
var customer_1 = require("../customer/customer");
var AppointmentCreateComponent = (function () {
    function AppointmentCreateComponent(appointmentService) {
        this.appointmentService = appointmentService;
        this.appointment = new appointment_1.AppointmentCreate();
        this.appointmentReasons = [];
        this.newCustomer = new customer_1.CustomerCreate();
        this.selectedCustomer = new customer_1.Customer();
        this.appointment.AppointmentType = ""; //set this so we get a default value in the select dropdown.
    }
    AppointmentCreateComponent.prototype.updateAppointmentTypes = function () {
        switch (this.appointment.AppointmentType) {
            case "0":
                this.appointmentReasons = this.appointmentService.appointmentsSubReasonsList.filter(function (x) { return x.Install; });
                break;
            case "1":
                this.appointmentReasons = this.appointmentService.appointmentsSubReasonsList.filter(function (x) { return x.Repair; });
                break;
            case "2":
                this.appointmentReasons = this.appointmentService.appointmentsSubReasonsList.filter(function (x) { return x.Misc; });
                break;
            default:
                this.appointmentReasons = [];
                break;
        }
    };
    return AppointmentCreateComponent;
}());
AppointmentCreateComponent = __decorate([
    core_1.Component({
        selector: 'createAppointment',
        templateUrl: './appointment-create.component.html'
    }),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentCreateComponent);
exports.AppointmentCreateComponent = AppointmentCreateComponent;
//# sourceMappingURL=appointment-create.component.js.map