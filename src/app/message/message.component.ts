import { Component } from '@angular/core';

import { Message } from './message';
import { MessageService } from './message.service';

@Component({
    selector: 'messages',
    templateUrl: './message.component.html'
})
export class MessageComponent {
    constructor(private messageService: MessageService) {

    }

    removeMessage(message: Message): void{
        this.messageService.clearMessage(message);
    }

    addMessage(message: string): void {
        this.messageService.addMessage(message);
    }
}