import {ApplicationEvents} from "../helpers/applicationevents";
import * as toastr from "toastr";
import {View} from "./view";
import Axios from "axios";
import {CustomerModel} from "../models/customer.model";

export class CustomerView extends View {
    constructor() {
        super("Customers", "btnLoadData");
    }

    async onButtonClick() {
        let customers: CustomerModel[] =[];
        try {
            customers = await this.getAsync('https://nwwebapi.azurewebsites.net/api/Customers');
        } catch (error) {
            toastr.error(error);
        } finally {
           document.getElementById('main')!.innerText = JSON.stringify(customers);
        }
    }





    async getAsync(url:string) : Promise<CustomerModel[]> {
        try{
            let response = await Axios.get(url);
            let {data} = response;
            return data as CustomerModel[];
        }
        catch (error){
            console.error(error);
            throw new Error(`error has Occurred in getting data from ${url}`);
        }
    }
}


document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let emp: CustomerView = new CustomerView();

});
