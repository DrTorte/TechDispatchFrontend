import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Tower } from './tower';
import { ProcessorService } from '../processor.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class TowerService{
    public towers : Tower[] = [];
    url : string = '/api/Towers';

    constructor(private http: Http,
        private processorService: ProcessorService, private messageService: MessageService) {
    }

    public getTowers() : Observable<Tower[]>{
        return this.http.get(this.processorService.baseUrl + this.url, {headers: this.processorService.getHeaders()})
        .map(res=>res.json() as Tower[])
        .catch(this.processorService.handleError);
    }
}