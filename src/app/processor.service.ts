import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { MessageService } from './message/message.service';

@Injectable()
export class ProcessorService {
    public baseUrl:string = "http://localhost:50396";

    constructor(private messageService: MessageService) {

    }

    public getParams(data: Object): Object {
        const params = Object.keys(data).map((key) => {
            if (data[key] == null) {
                return null;
            }
            if (typeof (data[key]) == "object") {
                //special treatment ofr objects!
                let myEncode: string = "";
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
        return params;
    }

    public getHeaders(): Headers {
        let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        // split the cookies.
        let cookies = document.cookie.split(';');

        // get authorization header.
        for (let c of cookies) {
            let keyVal = c.split('=');
            if (keyVal[0] == 'Authorization') {
                headers.append(keyVal[0], keyVal[1]);
            }
        }

        return headers;
    }

    public handleError(error: any): Observable<any> {
        let errorMsg: string;
        let errors: Object;
        errors = JSON.parse(error['_body']);
        let modelState = errors['ModelState'];
        if (modelState) {
            errorMsg = "";
            for (let y in modelState) {
                if (errorMsg.indexOf(modelState[y]) == -1) {
                    errorMsg += modelState[y];
                }
            }
            return Observable.throw(errorMsg);
        }
        if (errors['Message']) {
            return Observable.throw(error['status'] + " " + errors['Message']);
        } else {
            return Observable.throw(error['status'] + " " + errors['statusText']);
        }
    }
}