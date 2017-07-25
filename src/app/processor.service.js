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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var message_service_1 = require("./message/message.service");
var ProcessorService = (function () {
    function ProcessorService(messageService) {
        this.messageService = messageService;
        this.baseUrl = "http://localhost:50396";
    }
    ProcessorService.prototype.getParams = function (data) {
        var params = Object.keys(data).map(function (key) {
            if (data[key] == null) {
                return null;
            }
            if (typeof (data[key]) == "object") {
                //special treatment ofr objects!
                var myEncode = "";
                for (var _i = 0, _a = data[key]; _i < _a.length; _i++) {
                    var item = _a[_i];
                    myEncode += encodeURIComponent(key) + '=' + encodeURIComponent(item) + '&';
                }
                //delete the last &.
                myEncode = myEncode.substr(0, myEncode.length - 1);
                return myEncode;
            }
            else {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }
        }).join('&');
        return params;
    };
    ProcessorService.prototype.getHeaders = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // split the cookies.
        var cookies = document.cookie.split(';');
        // get authorization header.
        for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
            var c = cookies_1[_i];
            var keyVal = c.split('=');
            if (keyVal[0] == 'Authorization') {
                headers.append(keyVal[0], keyVal[1]);
            }
        }
        return headers;
    };
    ProcessorService.prototype.handleError = function (error) {
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
            return Observable_1.Observable.throw(errorMsg);
        }
        if (errors['Message']) {
            return Observable_1.Observable.throw(error['status'] + " " + errors['Message']);
        }
        else {
            return Observable_1.Observable.throw(error['status'] + " " + errors['statusText']);
        }
    };
    return ProcessorService;
}());
ProcessorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], ProcessorService);
exports.ProcessorService = ProcessorService;
//# sourceMappingURL=processor.service.js.map