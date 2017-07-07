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
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var processor_service_1 = require("../processor.service");
var message_service_1 = require("../message/message.service");
var TowerService = (function () {
    function TowerService(http, processorService, messageService) {
        this.http = http;
        this.processorService = processorService;
        this.messageService = messageService;
        this.towers = [];
        this.zones = [];
        this.url = '/api/Towers';
        this.zoneUrl = '/api/Zones';
    }
    TowerService.prototype.getTowers = function () {
        return this.http.get(this.processorService.baseUrl + this.url, { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.processorService.handleError);
    };
    TowerService.prototype.getZones = function () {
        return this.http.get(this.processorService.baseUrl + this.zoneUrl, { headers: this.processorService.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.processorService.handleError);
    };
    return TowerService;
}());
TowerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        processor_service_1.ProcessorService, message_service_1.MessageService])
], TowerService);
exports.TowerService = TowerService;
//# sourceMappingURL=tower.service.js.map