import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { FieldTech } from './field-tech';
import { ProcessorService } from '../processor.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class FieldTechService{
    public fieldTechs : FieldTech[] = [];
    url : string = '/api/FieldTechs';

    constructor(private http: Http,
        private processorService: ProcessorService, private messageService: MessageService) {
    }

    public getTechs() : Observable<FieldTech[]>{
        return this.http.get(this.processorService.baseUrl + this.url, {headers: this.processorService.getHeaders()})
        .map(res => res.json() as FieldTech[]
        )
        .catch(this.processorService.handleError);
    }
}