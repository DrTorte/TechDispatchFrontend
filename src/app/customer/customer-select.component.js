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
var Rx_1 = require("rxjs/Rx");
var tower_service_1 = require("../tower/tower.service");
var message_service_1 = require("../message/message.service");
require("rxjs/add/observable/timer");
var Subject_1 = require("rxjs/Subject");
var CustomerSelectComponent = (function () {
    function CustomerSelectComponent(towerService, customerService, messageService) {
        this.towerService = towerService;
        this.customerService = customerService;
        this.messageService = messageService;
        this.selectedCustomerId = new core_1.EventEmitter();
        this.search = new Subject_1.Subject();
    }
    Object.defineProperty(CustomerSelectComponent.prototype, "searchData", {
        get: function () { return this._searchData; },
        set: function (val) { this._searchData = val; this.search.next(this._searchData); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomerSelectComponent.prototype, "customers", {
        get: function () { return this._customers; },
        set: function (val) { this._customers = val; },
        enumerable: true,
        configurable: true
    });
    CustomerSelectComponent.prototype.selectCustomer = function () {
        this.selectedCustomerId.emit(this.customerId);
    };
    Object.defineProperty(CustomerSelectComponent.prototype, "currentlySearching", {
        get: function () {
            return (this.customerService.currentlySearching);
        },
        enumerable: true,
        configurable: true
    });
    CustomerSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customers = this.search
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(function (term) { return term
            ? _this.customerService.getCustomers(term) : Rx_1.Observable.of([]); })
            .catch(function (error) {
            _this.messageService.addMessage(error);
            return Rx_1.Observable.of();
        });
    };
    return CustomerSelectComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CustomerSelectComponent.prototype, "selectedCustomerId", void 0);
CustomerSelectComponent = __decorate([
    core_1.Component({
        selector: "customerSelect",
        templateUrl: "./customer-select.component.html"
    }),
    __metadata("design:paramtypes", [tower_service_1.TowerService, customer_service_1.CustomerService, message_service_1.MessageService])
], CustomerSelectComponent);
exports.CustomerSelectComponent = CustomerSelectComponent;
//# sourceMappingURL=customer-select.component.js.map