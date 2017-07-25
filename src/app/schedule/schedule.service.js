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
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var processor_service_1 = require("../processor.service");
var ScheduleService = (function () {
    function ScheduleService(http, processorService) {
        var _this = this;
        this.http = http;
        this.processorService = processorService;
        this.url = '/api/Schedules';
        this.timeSlots = [];
        this.getTimeSlots().subscribe(function (res) { return _this.timeSlots = res; });
    }
    ScheduleService.prototype.getOpenings = function (startDate, endDate, timeSlotId, zone) {
        if (startDate === void 0) { startDate = null; }
        if (endDate === void 0) { endDate = null; }
        if (timeSlotId === void 0) { timeSlotId = null; }
        if (zone === void 0) { zone = null; }
        var myUrl = this.processorService.baseUrl + this.url + "/Schedules?";
        if (startDate != null) {
            myUrl += "startDate=" + startDate.toISOString() + "&";
        }
        if (endDate != null) {
            myUrl += "endDate=" + endDate.toISOString() + "&";
        }
        return this.http.get(myUrl, { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); });
    };
    ScheduleService.prototype.getTimeSlots = function () {
        var myUrl = this.processorService.baseUrl + this.url + "/TimeSlots";
        return this.http.get(myUrl, { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); });
    };
    return ScheduleService;
}());
ScheduleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, processor_service_1.ProcessorService])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map