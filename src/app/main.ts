import * as toastr from "toastr";
import Swal from "sweetalert2";
import { ApplicationEvents } from "./helpers/applicationevents";
import {BaseDataService, IBaseDataService} from "./helpers/base.dataservice";
import {EmployeesModel} from "./models/employees.model";
import {AxiosResponse} from "axios";
class Main {
    dataService:IBaseDataService;
    constructor() {
        this.dataService = new BaseDataService();

    }
    init() {
        toastr.options.positionClass = 'toast-bottom-full-width'
        toastr.info("This is the information","Title Toaster");
        let employees: Array<EmployeesModel>;
        this.dataService.Get(`https://nwwebapi.azurewebsites.net/api/Employees`)!
            .then((axiosResponse: AxiosResponse<Array<EmployeesModel>>) => {
                employees = axiosResponse.data;
                 console.log(axiosResponse.data);
                for (let i=0;i<employees.length; i++){
                    console.log(`${employees[i].lastName}, ${employees[i].firstName}`);
                }
            }).catch((error) =>{
                console.log(error);
            }).finally(() =>{
                console.log("finally method called. all done!");
                Swal.fire(`Employees `, `employess record count is ${employees.length}`, "info");
           });
    }
}
export {Main}
document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let app: Main = new Main();  
    app.init();     
});
