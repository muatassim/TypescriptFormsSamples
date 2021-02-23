import {ApplicationEvents} from "../helpers/applicationevents";
import * as toastr from "toastr";
import Axios from "axios";
import {CountryModel, ICountryModel} from "../models/country.model";

class switchStatementView {
    constructor(){
        document.getElementById("btnCheck")!
            .addEventListener("click", ((e: Event) => {
                e.preventDefault();
                this.ShowSelection();
            }));

    }

    ShowSelection(): void {
        //toastr.info("Show Selection");
        let ddlCountry:HTMLSelectElement =<HTMLSelectElement>
            document.getElementById("ddlCountry");
        if (ddlCountry){
            let index = ddlCountry.selectedIndex;
            let options = ddlCountry.options[index];
            switch (options.innerText) {
                case "Pakistan":
                case "Afghanistan":
                    toastr.success(`You picked: ${options.innerText} has ${options.value} `);
                    break;
                case "United States":
                    toastr.info(`${options.innerText} has ${options.value}`);
                    break;
                default:
                     toastr.error(`${options.innerText} has ${options.value}`);
                    break;
            }
        }
    }

    countries: CountryModel[] =[];

    getSelection(): void {
        Axios.get("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-population.json")
            .then(axiosResponse => {
                // console.log(axiosResponse.data);
                this.countries = axiosResponse.data;
                // let countryList : Array<CountryModel> = axiosResponse.data;
                // console.log(countries);
                this.bindDropDown();
            })
            .catch(error => {
                toastr.error(error);
            })
            .finally(() => {
                toastr.success("Data Loaded!");

            });

    }

    bindDropDown() : void {
        // for loop
        for(let i=0; i< this.countries.length; i++){
            let countryModel:CountryModel = this.countries[i];
            console.log(`${countryModel.country} has ${countryModel.population}`);
            let ddlCountry: HTMLSelectElement = <HTMLSelectElement>
                document.getElementById("ddlCountry")
            if (ddlCountry){
                let option: HTMLOptionElement = document.createElement("option");
                option.value = countryModel.population.toString();
                option.innerText = countryModel.country;
                ddlCountry.add(option);
            }
        }
        //while loop

        // do while
    }
}

export {switchStatementView}

document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let myView  = new switchStatementView();
    myView.getSelection();
})
