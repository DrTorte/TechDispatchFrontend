import { Injectable } from '@angular/core';

import { Message } from './message';

@Injectable()
export class MessageService {
    Messages: Message[] = [];
    Debug: Message[] = [];
    LastId: number = 0;
    LastDebugId: number = 0;

    public addMessage(details: string, title: string = "Error", debug: boolean = false) {
        let msg: Message = new Message();
            msg.Details = details;
            msg.Title = title;

        if (!debug){
            this.LastId++;
            msg.Id = this.LastId;
            this.Messages.push(msg);
        } else {
            this.LastDebugId++;
            msg.Id = this.LastDebugId;
            this.Debug.push(msg);
        }

    }

    public clearMessage(message: Message, debug: boolean = false) {
        if (!debug){
            let index = this.Messages.findIndex(x => message.Id == x.Id);
            this.Messages.splice(index, 1);
        } else {
            let index = this.Debug.findIndex(x => message.Id == x.Id);
            this.Debug.splice(index,1);
        }
    }

    //clear all messages.
    public clearMessages() {
        this.Messages = [];
        this.Debug = [];
        this.LastId = 0;
        this.LastDebugId = 0;
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