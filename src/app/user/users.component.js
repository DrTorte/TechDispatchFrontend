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
var user_1 = require("./user");
var user_service_1 = require("./user.service");
var message_service_1 = require("../message/message.service");
var UsersComponent = (function () {
    function UsersComponent(userService, messageService) {
        this.userService = userService;
        this.messageService = messageService;
        this.newUser = new user_1.UserCreate();
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.message = "Loading...";
        this.userService.getUsers().subscribe(function (result) {
            _this.userService.Users = result;
            _this.userService.sortUsers();
            _this.message = "";
        });
        this.userService.getUserRoles().subscribe(function (result) {
            _this.userService.UserRoles = result;
        }, function (error) {
            _this.messageService.addMessage(error);
        });
    };
    UsersComponent.prototype.CreateUser = function (user) {
        var _this = this;
        this.userService.createUser(user)
            .subscribe(function (result) {
            _this.userService.Users.push(result);
        }, function (error) {
            _this.messageService.addMessage(error);
        });
        this.userService.sortUsers();
    };
    UsersComponent.prototype.DisableUser = function (user) {
        var _this = this;
        this.userService.disableUser(user)
            .subscribe(function (result) {
            _this.userService.Users.splice(_this.userService.Users.findIndex(function (x) { return x.Email == user.Email; }), 1);
            _this.userService.Users.push(user);
        }, function (error) {
            _this.messageService.addMessage(error);
        });
        this.userService.sortUsers();
    };
    UsersComponent.prototype.EnableUser = function (user) {
        var _this = this;
        this.userService.enableUser(user)
            .subscribe(function (result) {
            _this.userService.Users.splice(_this.userService.Users.findIndex(function (x) { return x.Email == user.Email; }), 1);
            _this.userService.Users.push(user);
        }, function (error) {
            _this.messageService.addMessage(error);
        });
        this.userService.sortUsers();
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    core_1.Component({
        selector: "users-list",
        templateUrl: "./users.component.html"
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, message_service_1.MessageService])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map