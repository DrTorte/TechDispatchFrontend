import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ProcessorService } from '../processor.service';

import {Customer} from './customer';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService{
    public currentlySearching : boolean = false;
    private url = '/api/Customers'

    constructor(private http: Http, private processorService:ProcessorService){}

    public getCustomers(search?:string) {
        let targetUrl = this.processorService.baseUrl + this.url;
        this.currentlySearching = true;
        if (search) {
            targetUrl += "?search=" + search;
        }
        return this.http.get(targetUrl, {headers: this.processorService.getHeaders()})
        .map(res=> {
            this.currentlySearching = false;
            return res.json();
        })
        .catch(this.processorService.handleError);
    }
}