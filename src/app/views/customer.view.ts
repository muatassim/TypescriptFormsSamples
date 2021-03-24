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
            customers = await this.getAsync<CustomerModel>
                ('https://nwwebapi.azurewebsites.net/api/Customers')
                 ;
        } catch (error) {
            toastr.error(error);
        } finally {
           let main: HTMLElement | null = document.getElementById('main');
            if (main)
            {
                let ulElement = document.createElement("ul");
                for(let customer of customers){
                    let liElement = document.createElement("li");
                    liElement.innerText = `${customer.customerID}`;
                    ulElement.appendChild(liElement);
                }
                main.appendChild(ulElement);
            }

        }
    }

    async getAsync<T>(url:string) : Promise<T[]> {
        try{
            let response = await Axios.get(url);
            let {data} = response;
            return data as T[];
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
