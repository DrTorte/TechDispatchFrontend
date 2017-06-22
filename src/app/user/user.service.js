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
var UserService = (function () {
    function UserService(http, processorService, messaegService) {
        this.http = http;
        this.processorService = processorService;
        this.messaegService = messaegService;
        this.accountUrl = '/api/Account/';
        this.usersUrl = '/api/User';
        this.loginUrl = '/api/token';
        this.myUser = null;
        this.Users = [];
        this.UserRoles = [];
    }
    UserService.prototype.setLogin = function (user) {
        this.myUser = user;
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    // get users.
    UserService.prototype.getUsers = function () {
        return this.http.get(this.usersUrl, { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUser = function (id) {
        return this.http.get(this.usersUrl + '/' + id, { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.updateUser = function (user) {
        return this.http.post(this.usersUrl + "/update", this.processorService.getParams(user), { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUserRoles = function () {
        return this.http.get(this.usersUrl + "/roles", { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.createUser = function (user) {
        return this.http.post(this.usersUrl, this.processorService.getParams(user), { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.disableUser = function (user) {
        return this.http.post(this.usersUrl + "/disable", this.processorService.getParams(user), { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.enableUser = function (user) {
        return this.http.post(this.usersUrl + "/disable", this.processorService.getParams(user), { headers: this.processorService.getHeaders() })
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
        processor_service_1.ProcessorService, message_service_1.MessageService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map