import {ApplicationEvents} from "../helpers/applicationevents";
import * as toastr from "toastr";
import {EmployeesModel, IEmployeesModel} from "../models/employees.model";
import {View} from "./view";

export class EmployeesView extends View {
    constructor() {
        super("Employees");
        toastr.info(`Employees View Initialized!`);
        document.getElementById("btnSave")!.addEventListener(ApplicationEvents.Click,
            (e: Event) => {
                e.preventDefault();
                this.Save();
            });
    }

    Save(): void {
        let empModel: EmployeesModel = new EmployeesModel();
        if (empModel.validate("employeesForm", "btnSave")) {
            toastr.info(`${JSON.stringify(empModel)}`);
            localStorage.setItem(empModel.employeeID.toString(), JSON.stringify(empModel));
        } else {
            toastr.error("Please enter all required fields!");
        }
    }
}


document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let emp:EmployeesView = new EmployeesView();


});
