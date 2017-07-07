import { Component } from '@angular/core';

import { CustomerService} from './customer.service';
import { CustomerCreate } from './customer';

import { TowerService } from '../tower/tower.service';
import { Tower } from '../tower/tower'

@Component({
    selector: "customerCreate",
    templateUrl:"./customer-create.component.html",
    inputs:['newCustomer']
})
export class CustomerCreateComponent{
    newCustomer : CustomerCreate = new CustomerCreate();

    constructor(private towerService : TowerService, private customerService: CustomerService){
        this.newCustomer.TowerId = -1;
    }

    getTowers(installZoneId: number) : Tower[]{
        return (this.towerService.towers.filter(x=>x.InstallZoneId == installZoneId));
    }
}