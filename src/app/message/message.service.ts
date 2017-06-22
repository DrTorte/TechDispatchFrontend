import { Injectable } from '@angular/core';

import { Message } from './message';

@Injectable()
export class MessageService {
    Messages: Message[] = [];
    LastId: number = 0;

    public addMessage(details: string, title: string = "Error") {
        
        this.LastId++;
        let msg: Message = new Message();
        msg.Details = details;
        msg.Title = title;
        msg.Id = this.LastId;
        this.Messages.push(msg);
    }

    public clearMessage(message: Message) {
        let index = this.Messages.findIndex(x => message.Id == x.Id);
        this.Messages.splice(index, 1);
    }

    //clear all messages.
    public clearMessages() {
        this.Messages = [];
        this.LastId = 0;
    }

    public paramTest(data: Object): void {
        const params = Object.keys(data).map((key) => {
            if (typeof (data[key]) == "object") {
                let myEncode : string = "";
                for (let item of data[key]) {
                    myEncode += encodeURIComponent(key) + '=' + encodeURIComponent(item) + '&';
                }
                //delete the last &.
                myEncode = myEncode.substr(0, myEncode.length - 1);
                return myEncode;
            } else {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }
        }).join('&');
        this.addMessage(params);
    }


}