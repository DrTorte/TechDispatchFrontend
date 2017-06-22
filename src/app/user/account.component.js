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
var user_service_1 = require("./user.service");
var message_service_1 = require("../message/message.service");
var AccountComponent = (function () {
    function AccountComponent(userService, messageService) {
        this.userService = userService;
        this.messageService = messageService;
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.user = this.userService.myUser;
    };
    AccountComponent.prototype.saveChanges = function () {
        var _this = this;
        var sub = this.userService.updateUser(this.user)
            .map(function (res) { return res; }).subscribe(function (res) { _this.userService.Users[_this.userService.Users.findIndex(function (x) { return x.Id == _this.user.Id; })] = res; }, function (error) { _this.messageService.addMessage(error); });
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    core_1.Component({
        selector: 'my-account',
        templateUrl: './account.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, message_service_1.MessageService])
], AccountComponent);
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map