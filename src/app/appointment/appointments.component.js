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
var appointment_service_1 = require("./appointment.service");
var message_service_1 = require("../message/message.service");
var AppointmentsComponent = (function () {
    function AppointmentsComponent(appointmentService, messageService) {
        this.appointmentService = appointmentService;
        this.messageService = messageService;
        this.mdWidth = 4;
        //to make sure these are refetched, if need be.
        this.fetchAttempts = 0;
        this.fetchAttemptsLimit = 5;
        if (appointmentService.appointmentsList.length == 0) {
            this.DefaultAppointments();
        }
    }
    AppointmentsComponent.prototype.DefaultAppointments = function () {
        var _this = this;
        this.loading = true;
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        this.appointmentService.getAppointments(null, null, null, date.toISOString()).subscribe(function (result) {
            _this.loading = false;
            _this.fetchAttempts = 0;
            _this.appointmentService.appointmentsList = result;
        }, function (error) {
            _this.fetchAttempts++;
            if (_this.fetchAttempts < _this.fetchAttemptsLimit) {
                console.error("Couldn't connect, retrying...");
                _this.DefaultAppointments();
            }
            else {
                _this.loading = false;
                _this.messageService.addMessage(error);
            }
        });
    };
    return AppointmentsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], AppointmentsComponent.prototype, "mdWidth", void 0);
AppointmentsComponent = __decorate([
    core_1.Component({
        selector: 'appointments',
        templateUrl: './appointments.component.html'
    }),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService, message_service_1.MessageService])
], AppointmentsComponent);
exports.AppointmentsComponent = AppointmentsComponent;
//# sourceMappingURL=appointments.component.js.map