import { Component } from '@angular/core';

import { Message } from './message';
import { MessageService } from './message.service';

@Component({
    selector: 'messagesDebug',
    templateUrl: './message-debug.component.html'
})
export class MessageDebugComponent {
    constructor(private messageService: MessageService) {

    }

    removeMessage(message: Message): void{
        this.messageService.clearMessage(message, true);
    }

    addMessage(message: string): void {
        this.messageService.addMessage(message, null, true);
    }
}