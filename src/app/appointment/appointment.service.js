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
var http_1 = require("@angular/http");
var processor_service_1 = require("../processor.service");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var AppointmentService = (function () {
    function AppointmentService(http, processorService) {
        this.http = http;
        this.processorService = processorService;
        this.url = '/api/Appointments';
        this.appointmentsList = [];
        this.appointmentsSubReasonsList = [];
    }
    AppointmentService.prototype.getAppointments = function (CustomerId, TowerId, ZoneId, FromDate, ToDate, Count, Skip) {
        return this.http.get(this.processorService.baseUrl + this.url + "?CustomerId=" + CustomerId +
            "&TowerId=" + TowerId +
            "&ZoneId=" + ZoneId +
            "&FromDate=" + FromDate +
            "&ToDate=" + ToDate +
            "&Count=" + Count +
            "&Skip=" + Skip, { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.processorService.handleError);
    };
    AppointmentService.prototype.getAppointment = function (Id) {
        return this.http.get(this.processorService.baseUrl + this.url + "/" + Id, { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.processorService.handleError);
    };
    AppointmentService.prototype.getAppointmentSubReasons = function (onlyActive) {
        if (onlyActive === void 0) { onlyActive = false; }
        return this.http.get(this.processorService.baseUrl + this.url + "/Reasons", { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.processorService.handleError);
    };
    return AppointmentService;
}());
AppointmentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, processor_service_1.ProcessorService])
], AppointmentService);
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=appointment.service.js.map