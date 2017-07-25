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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var user_1 = require("./user");
var processor_service_1 = require("../processor.service");
var message_service_1 = require("../message/message.service");
var appointment_service_1 = require("../appointment/appointment.service");
var field_tech_service_1 = require("../field-tech/field-tech.service");
var tower_service_1 = require("../tower/tower.service");
var UserService = (function () {
    function UserService(http, processorService, messageService, fieldTechService, appointmentService, towerService) {
        this.http = http;
        this.processorService = processorService;
        this.messageService = messageService;
        this.fieldTechService = fieldTechService;
        this.appointmentService = appointmentService;
        this.towerService = towerService;
        this.accountUrl = '/api/Account/';
        this.usersUrl = '/api/User';
        this.loginUrl = '/api/token';
        this.myUser = null;
        this.Users = [];
        this.UserRoles = [];
    }
    UserService.prototype.setLogin = function (user) {
        var _this = this;
        this.myUser = user;
        //go get some metadata as well.
        this.messageService.addMessage("Getting techs", "Techs", true);
        this.fieldTechService.getTechs()
            .subscribe(function (x) {
            _this.fieldTechService.fieldTechs = x;
            _this.messageService.addMessage(x.length + " techs received.", "Techs", true);
        });
        this.messageService.addMessage("Getting appointment sub-reasons", "Appointments", true);
        this.appointmentService.getAppointmentSubReasons()
            .subscribe(function (x) {
            _this.appointmentService.appointmentsSubReasonsList = x;
            _this.messageService.addMessage(x.length + " sub-reasons received.", "Appointments", true);
        });
        this.messageService.addMessage("Getting towers", "Towers", true);
        this.towerService.getTowers()
            .subscribe(function (x) {
            _this.towerService.towers = x;
            _this.towerService.towers
                .sort(function (a, b) {
                if (a.TowerName < b.TowerName) {
                    return -1;
                }
                else if (a.TowerName > b.TowerName) {
                    return 1;
                }
                return 0;
            });
            _this.messageService.addMessage(x.length + " towers received.", "Towers", true);
        });
        this.messageService.addMessage("Getting zones", "Towers", true);
        this.towerService.getZones()
            .subscribe(function (x) {
            _this.towerService.zones = x;
            _this.messageService.addMessage(x.length + " zones received.", "Towers", true);
        });
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    // get users.
    UserService.prototype.getUsers = function () {
        return this.http.get(this.processorService.baseUrl + this.usersUrl, { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUser = function (id) {
        return this.http.get(this.processorService.baseUrl + this.usersUrl + '/' + id, { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.updateUser = function (user) {
        return this.http.post(this.processorService.baseUrl + this.usersUrl + "/update", JSON.stringify(user), { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUserRoles = function () {
        return this.http.get(this.processorService.baseUrl + this.usersUrl + "/roles", { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.createUser = function (user) {
        return this.http.post(this.processorService.baseUrl + this.usersUrl, JSON.stringify(user), { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.disableUser = function (user) {
        return this.http.post(this.processorService.baseUrl + this.usersUrl + "/disable", JSON.stringify(user), { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.enableUser = function (user) {
        return this.http.post(this.processorService.baseUrl + this.usersUrl + "/disable", JSON.stringify(user), { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //send to sort the users.
    UserService.prototype.sortUsers = function () {
        this.Users = this.Users.sort(function (a, b) {
            var A = a.LastName.toLocaleLowerCase() + a.FirstName.toLocaleLowerCase();
            var B = b.LastName.toLocaleLowerCase() + b.FirstName.toLocaleLowerCase();
            if (A > B) {
                return 1;
            }
            else if (A < B) {
                return -1;
            }
            return 0;
        });
    };
    // logout.
    UserService.prototype.logOut = function () {
        this.myUser = new user_1.User;
        document.cookie = 'Authorization=;expires = ' + new Date;
    };
    // generic error handling.
    UserService.prototype.handleError = function (error) {
        var errorMsg;
        var errors;
        errors = JSON.parse(error['_body']);
        var modelState = errors['ModelState'];
        if (modelState) {
            errorMsg = "";
            for (var y in modelState) {
                if (errorMsg.indexOf(modelState[y]) == -1) {
                    errorMsg += modelState[y];
                }
            }
        }
        if (error['_body']) {
            return Observable_1.Observable.throw(errorMsg || JSON.parse(error['_body']).error_description || JSON.parse(error['_body']).mes);
        }
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        processor_service_1.ProcessorService, message_service_1.MessageService,
        field_tech_service_1.FieldTechService, appointment_service_1.AppointmentService,
        tower_service_1.TowerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map