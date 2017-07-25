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
var schedule_service_1 = require("./schedule.service");
var zone_1 = require("../tower/zone");
var Observable_1 = require("rxjs/Observable");
var ScheduleOpeningsComponent = (function () {
    function ScheduleOpeningsComponent(scheduleService) {
        this.scheduleService = scheduleService;
        this.openings = [];
    }
    Object.defineProperty(ScheduleOpeningsComponent.prototype, "myOpenings", {
        get: function () {
            return Observable_1.Observable.of(this.openings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleOpeningsComponent.prototype, "getDates", {
        get: function () {
            return Observable_1.Observable.of(this.dates);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleOpeningsComponent.prototype, "timeSlots", {
        get: function () {
            return this.scheduleService.timeSlots;
        },
        enumerable: true,
        configurable: true
    });
    ScheduleOpeningsComponent.prototype.ngOnInit = function () {
        this.getOpenings();
    };
    ScheduleOpeningsComponent.prototype.changeDate = function (count) {
        this.startDate.setDate(this.startDate.getDate() + count);
        this.endDate.setDate(this.endDate.getDate() + count);
        this.getOpenings();
    };
    ScheduleOpeningsComponent.prototype.getOpenings = function () {
        var _this = this;
        //refresh the dates.
        this.dates = [];
        var i = new Date(this.startDate);
        while (i <= this.endDate) {
            this.dates.push(new Date(i));
            i.setDate(i.getDate() + 1);
        }
        this.scheduleService.getOpenings(this.startDate, this.endDate, this.timeSlotId, this.zone)
            .subscribe(function (res) { _this.openings = res; });
    };
    ScheduleOpeningsComponent.prototype.selectSlot = function (date, timeSlotId) {
        this.selectedDate = date;
        this.selectedSlot = timeSlotId;
    };
    ScheduleOpeningsComponent.prototype.formattedDate = function (date) {
        var days = [];
        days[0] = "Sun";
        days[1] = "Mon";
        days[2] = "Tue";
        days[3] = "Wed";
        days[4] = "Thu";
        days[5] = "Fri";
        days[6] = "Sat";
        var day = days[date.getDay()];
        var months = new Array();
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";
        var month = months[date.getMonth()];
        return day + ", " + month + " " + date.getDate();
    };
    return ScheduleOpeningsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], ScheduleOpeningsComponent.prototype, "startDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], ScheduleOpeningsComponent.prototype, "endDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ScheduleOpeningsComponent.prototype, "timeSlotId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", zone_1.Zone)
], ScheduleOpeningsComponent.prototype, "zone", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], ScheduleOpeningsComponent.prototype, "selectedDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ScheduleOpeningsComponent.prototype, "selectedSlot", void 0);
ScheduleOpeningsComponent = __decorate([
    core_1.Component({
        templateUrl: './schedule-openings.component.html',
        selector: 'scheduleOpenings',
        inputs: ['startDate', 'endDate', 'timeSlotId', 'zone', 'selectedDate', 'selectedSlot']
    }),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService])
], ScheduleOpeningsComponent);
exports.ScheduleOpeningsComponent = ScheduleOpeningsComponent;
//# sourceMappingURL=schedule-openings.component.js.map