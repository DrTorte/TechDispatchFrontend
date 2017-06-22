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
var auth_service_1 = require("../auth/auth.service");
var auth_guard_service_1 = require("../auth/auth-guard.service");
var user_service_1 = require("./user.service");
var message_service_1 = require("../message/message.service");
var LoginComponent = (function () {
    function LoginComponent(userService, authService, messageService, router, authGuard) {
        this.userService = userService;
        this.authService = authService;
        this.messageService = messageService;
        this.router = router;
        this.authGuard = authGuard;
        this.loading = false;
    }
    LoginComponent.prototype.Login = function (username, password) {
        var _this = this;
        this.loading = true;
        //remove cookies.
        var result = this.authService.login(username, password)
            .map(function (res) { return res; })
            .subscribe(function (data) {
            //set the cookies.
            document.cookie = "Authorization=Bearer " + data['access_token'] +
                ";expires=" + data['.expires'] + ";";
            if (!_this.authService.redirectUrl || _this.authService.redirectUrl == "login") {
                _this.authService.redirectUrl = "dashboard";
            }
            var myUser = _this.authService.checkLogin(_this.authService.redirectUrl)
                .map(function (res) { return res; })
                .subscribe(function (result) {
                _this.loading = false;
                _this.userService.setLogin(result);
                console.log(result);
                _this.router.navigate([_this.authService.redirectUrl]);
            });
            //now go get the user.
        }, function (error) {
            _this.messageService.addMessage(error);
            _this.loading = false;
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.CheckLogin = function () {
        var result = this.authGuard.canActivate(null, null).subscribe(function (res) { return console.log(res); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'my-login',
        templateUrl: './login.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, auth_service_1.AuthService, message_service_1.MessageService,
        router_1.Router, auth_guard_service_1.AuthGuardService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map