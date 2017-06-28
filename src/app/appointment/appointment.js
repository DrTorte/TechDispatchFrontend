"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AppointmentList = (function () {
    function AppointmentList() {
    }
    return AppointmentList;
}());
exports.AppointmentList = AppointmentList;
var AppointmentDetail = (function (_super) {
    __extends(AppointmentDetail, _super);
    function AppointmentDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AppointmentDetail;
}(AppointmentList));
exports.AppointmentDetail = AppointmentDetail;
var AppointmentCreate = (function (_super) {
    __extends(AppointmentCreate, _super);
    function AppointmentCreate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AppointmentCreate;
}(AppointmentList));
exports.AppointmentCreate = AppointmentCreate;
//# sourceMappingURL=appointment.js.map