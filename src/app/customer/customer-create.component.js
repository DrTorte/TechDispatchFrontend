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
var customer_service_1 = require("./customer.service");
var customer_1 = require("./customer");
var tower_service_1 = require("../tower/tower.service");
var CustomerCreateComponent = (function () {
    function CustomerCreateComponent(towerService, customerService) {
        this.towerService = towerService;
        this.customerService = customerService;
        this.newCustomer = new customer_1.CustomerCreate();
        this.newCustomer.TowerId = -1;
    }
    CustomerCreateComponent.prototype.getTowers = function (installZoneId) {
        return (this.towerService.towers.filter(function (x) { return x.InstallZoneId == installZoneId; }));
    };
    return CustomerCreateComponent;
}());
CustomerCreateComponent = __decorate([
    core_1.Component({
        selector: "customerCreate",
        templateUrl: "./customer-create.component.html",
        inputs: ['newCustomer']
    }),
    __metadata("design:paramtypes", [tower_service_1.TowerService, customer_service_1.CustomerService])
], CustomerCreateComponent);
exports.CustomerCreateComponent = CustomerCreateComponent;
//# sourceMappingURL=customer-create.component.js.map