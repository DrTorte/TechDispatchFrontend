import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { Observable } from 'rxjs/Rx';

import { TowerService } from '../tower/tower.service';
import { MessageService} from '../message/message.service';

import 'rxjs/add/observable/timer';
import { Subject } from "rxjs/Subject";

@Component({
    selector: "customerSelect",
    templateUrl:"./customer-select.component.html"
})
export class CustomerSelectComponent{
    selectedCustomer : Customer;
    @Output() selectedCustomerId = new EventEmitter<number>();
    private customerId : number;
    private search = new Subject<string>();

    private _searchData : string;
    set searchData (val: string) { this._searchData = val; this.search.next(this._searchData); } 
    get searchData() { return this._searchData; }

    private _customers : Observable<Customer[]>;
    set customers(val: Observable<Customer[]>){ this._customers = val; }
    get customers(){ return this._customers; }

    constructor(private towerService : TowerService, private customerService: CustomerService, private messageService: MessageService){

    }

    selectCustomer(){
        this.selectedCustomerId.emit(this.customerId);
    }

    get currentlySearching():boolean{
        return (this.customerService.currentlySearching);
    }

    ngOnInit():void{
        this.customers = this.search
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(term => term
            ? this.customerService.getCustomers(term) : Observable.of<Customer[]>([]))
            .catch(error =>{
                this.messageService.addMessage(error);
                return Observable.of<Customer[]>();
            });
    }
}