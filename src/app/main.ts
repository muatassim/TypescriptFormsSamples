import * as toastr from "toastr";
import Swal from "sweetalert2";
import { ApplicationEvents } from "./helpers/applicationevents";
import {BaseDataService, IBaseDataService} from "./helpers/base.dataservice";
import {EmployeesModel} from "./models/employees.model";
import {AxiosResponse} from "axios";
import {ITableHelper, TableHelper} from "./helpers/tablehelper";
class Main {
    dataService:IBaseDataService;
    tableHelper: ITableHelper;
    constructor() {
        this.dataService = new BaseDataService();
        this.tableHelper = new TableHelper();
    }
    init() {
        toastr.options.positionClass = 'toast-bottom-full-width'
        toastr.info("This is the information","Title Toaster");
        let apiUrl:string = "https://nwwebapi.azurewebsites.net/api/";
        this.GetEmployees(apiUrl);
    }

    GetEmployees(apiUrl: string):void {
        let employees: Array<EmployeesModel>;
        this.dataService.Get(`${apiUrl}Employees`)!
            .then((axiosResponse: AxiosResponse<Array<EmployeesModel>>) => {
                employees = axiosResponse.data;
                console.log(axiosResponse.data);
                for (let i = 0; i < employees.length; i++) {
                    console.log(`${employees[i].lastName}, ${employees[i].firstName}`);
                }
                let table: HTMLTableElement = this.tableHelper.getEmployeesTable(employees, apiUrl)
                document.getElementById("main")!.appendChild(table);
            }).catch((error) => {
            Swal.fire(error);
        }).finally(() => {
            console.log(`Employees `, `employess record count is ${employees.length}`);
        });
    }
}
export {Main}
document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let app: Main = new Main();  
    app.init();     
});
