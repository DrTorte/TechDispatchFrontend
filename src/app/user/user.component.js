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
require("rxjs/add/operator/switchMap");
var user_1 = require("./user");
var user_service_1 = require("./user.service");
var message_service_1 = require("../message/message.service");
var UserComponent = (function () {
    function UserComponent(route, router, userService, messageService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.messageService = messageService;
        this.newUser = new user_1.User();
        this.DisplayNewUser = false;
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        var sub = this.route.params.subscribe(function (params) {
            _this.userService.getUser(params['id'])
                .map(function (res) { return res; })
                .subscribe(function (response) { return _this.user = response; });
        });
        this.userService.getUserRoles().subscribe(function (result) {
            _this.userService.UserRoles = result;
        }, function (error) {
            _this.messageService.addMessage(error);
        });
    };
    UserComponent.prototype.saveChanges = function () {
        var _this = this;
        var sub = this.userService.updateUser(this.user)
            .map(function (res) { return res; }).subscribe(function (res) { _this.userService.Users[_this.userService.Users.findIndex(function (x) { return x.Id == _this.user.Id; })] = res; }, function (error) { _this.messageService.addMessage(error); });
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'user-detail',
        templateUrl: './user.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, user_service_1.UserService, message_service_1.MessageService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map