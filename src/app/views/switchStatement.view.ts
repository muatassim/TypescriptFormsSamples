import {ApplicationEvents} from "../helpers/applicationevents";
import * as toastr from "toastr";
import Axios, {AxiosResponse} from "axios";
import {CountryModel} from "../models/country.model";
import {View} from "./view";
import * as data from '../../assets/country-by-population.json';
class switchStatementView extends View {
    constructor(){
        super("Switch Statements Sample", "btnCheck");

    }
    onButtonClick(): void {
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

    countries: Array<CountryModel> =[];
    bindFromLocal():void {
        console.log(data);
        this.countries  = data.default as Array<CountryModel>;
        this.bindDropDown();
    }
    getSelection(): void {
        Axios.get("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-population.json")
            .then((axiosResponse: AxiosResponse)=> {
                // console.log(axiosResponse.data);
                this.countries = axiosResponse.data;
                // let countryList : Array<CountryModel> = axiosResponse.data;
                // console.log(countries);
                this.bindDropDown();
            })
            .catch((error: any) => {
                toastr.error(error);
            })
            .finally(() => {
                toastr.success("Data Loaded!");
            });
    }
    bindDropDown() : void {
        // for loop
        let ddlCountry: HTMLSelectElement = <HTMLSelectElement>  document.getElementById("ddlCountry");
        let i = 0;
        while (i<this.countries.length){
        //for(let i=0; i< this.countries.length; i++){
            let myModel:CountryModel = this.countries[i];
            //console.log(`${countryModel.country} has ${countryModel.population}`);
            if (ddlCountry){
                let option: HTMLOptionElement = document.createElement("option");
                option.value = myModel.population.toString();
                option.innerText = myModel.country;
                ddlCountry.add(option);
            }
            i++;
        }
    }
}
export {switchStatementView}
document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let myView  = new switchStatementView();
    //myView.getSelection();
    //Add countries twice using local
    myView.bindFromLocal();

})
