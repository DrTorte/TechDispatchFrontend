"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var message_1 = require("./message");
var MessageService = (function () {
    function MessageService() {
        this.Messages = [];
        this.Debug = [];
        this.LastId = 0;
        this.LastDebugId = 0;
    }
    MessageService.prototype.addMessage = function (details, title, debug) {
        if (title === void 0) { title = "Error"; }
        if (debug === void 0) { debug = false; }
        var msg = new message_1.Message();
        msg.Details = details;
        msg.Title = title;
        if (!debug) {
            this.LastId++;
            msg.Id = this.LastId;
            this.Messages.push(msg);
        }
        else {
            this.LastDebugId++;
            msg.Id = this.LastDebugId;
            this.Debug.push(msg);
        }
    };
    MessageService.prototype.clearMessage = function (message, debug) {
        if (debug === void 0) { debug = false; }
        if (!debug) {
            var index = this.Messages.findIndex(function (x) { return message.Id == x.Id; });
            this.Messages.splice(index, 1);
        }
        else {
            var index = this.Debug.findIndex(function (x) { return message.Id == x.Id; });
            this.Debug.splice(index, 1);
        }
    };
    //clear all messages.
    MessageService.prototype.clearMessages = function () {
        this.Messages = [];
        this.Debug = [];
        this.LastId = 0;
        this.LastDebugId = 0;
    };
    MessageService.prototype.paramTest = function (data) {
        var params = Object.keys(data).map(function (key) {
            if (typeof (data[key]) == "object") {
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
        this.addMessage(params);
    };
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable()
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map