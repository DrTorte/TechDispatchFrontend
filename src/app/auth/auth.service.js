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
var http_1 = require("@angular/http");
var user_service_1 = require("../user/user.service");
var Observable_1 = require("rxjs/Observable");
var processor_service_1 = require("../processor.service");
var message_service_1 = require("../message/message.service");
require("rxjs/add/observable/of");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/do");
require("rxjs/add/operator/delay");
var AuthService = (function () {
    function AuthService(userService, processorService, messageService, router, http) {
        this.userService = userService;
        this.processorService = processorService;
        this.messageService = messageService;
        this.router = router;
        this.http = http;
        this.url = "/api/Account/";
        this.loginUrl = "/api/login";
    }
    AuthService.prototype.checkAuthCookie = function () {
        var cookies = document.cookie.split(";");
        for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
            var c = cookies_1[_i];
            var keyVal = c.split("=");
            if (keyVal[0] == "Authorization") {
                return keyVal[1];
            }
        }
        return "";
    };
    AuthService.prototype.login = function (username, password) {
        var data = { userName: username, password: password, grant_type: "password" };
        return this.http.post(this.processorService.baseUrl + this.loginUrl, this.processorService.getParams(data), { headers: this.processorService.getHeaders() })
            .map(function (result) { return result.json(); }).catch(this.handleError);
    };
    AuthService.prototype.LogOut = function () {
        this.userService.myUser = null;
        document.cookie = "Authorization=;expires = " + new Date;
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    };
    AuthService.prototype.checkLogin = function (targetUrl) {
        var _this = this;
        //check if the user is logged in by checking if myuser is set.
        if (this.userService.myUser) {
            return Observable_1.Observable.of(true).map(function (res) { return _this.userService.myUser; });
        }
        //check for auth cookie's existance.
        if (this.checkAuthCookie() != "") {
            return this.http.get(this.processorService.baseUrl + this.url, { headers: this.processorService.getHeaders() })
                .map(function (result) { _this.userService.setLogin(result.json()); })
                .catch(function (res) {
                if (res.status == "0") {
                    window.location.replace("/404.html");
                }
                else {
                    _this.LogOut();
                    return Observable_1.Observable.throw(res.json());
                }
            });
        }
        else {
            this.redirectUrl = targetUrl;
            this.router.navigate(['/login']);
            return Observable_1.Observable.throw(function () { return "No user"; });
        }
    };
    AuthService.prototype.handleError = function (error) {
        var errorMsg = "";
        if (error['_body']) {
            return Observable_1.Observable.throw(JSON.parse(error['_body']).error_description || JSON.parse(error['_body']).mes);
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService, processor_service_1.ProcessorService, message_service_1.MessageService,
        router_1.Router, http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map