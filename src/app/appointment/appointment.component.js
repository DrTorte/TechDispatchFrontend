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
var router_1 = require("@angular/router");
var appointment_service_1 = require("./appointment.service");
var message_service_1 = require("../message/message.service");
var AppointmentComponent = (function () {
    function AppointmentComponent(appointmentService, route, messageService) {
        var _this = this;
        this.appointmentService = appointmentService;
        this.route = route;
        this.messageService = messageService;
        this.loading = true;
        this.route.params.subscribe(function (params) {
            _this.appointmentService.getAppointment(+params['id'])
                .subscribe(function (result) { _this.app = result; _this.loading = false; }, function (error) { _this.messageService.addMessage(error); });
        });
    }
    AppointmentComponent.prototype.querifyAddress = function () {
        var url = this.app.CustomerAddress.replace(" ", "+");
        return url;
    };
    return AppointmentComponent;
}());
AppointmentComponent = __decorate([
    core_1.Component({
        selector: 'appointment',
        templateUrl: './appointment.component.html'
    }),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService, router_1.ActivatedRoute, message_service_1.MessageService])
], AppointmentComponent);
exports.AppointmentComponent = AppointmentComponent;
//# sourceMappingURL=appointment.component.js.map