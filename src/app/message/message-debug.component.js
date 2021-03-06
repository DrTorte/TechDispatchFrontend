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
var message_service_1 = require("./message.service");
var MessageDebugComponent = (function () {
    function MessageDebugComponent(messageService) {
        this.messageService = messageService;
    }
    MessageDebugComponent.prototype.removeMessage = function (message) {
        this.messageService.clearMessage(message, true);
    };
    MessageDebugComponent.prototype.addMessage = function (message) {
        this.messageService.addMessage(message, null, true);
    };
    return MessageDebugComponent;
}());
MessageDebugComponent = __decorate([
    core_1.Component({
        selector: 'messagesDebug',
        templateUrl: './message-debug.component.html'
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageDebugComponent);
exports.MessageDebugComponent = MessageDebugComponent;
//# sourceMappingURL=message-debug.component.js.map