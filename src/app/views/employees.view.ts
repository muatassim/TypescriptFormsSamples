import {ApplicationEvents} from "../helpers/applicationevents";
import * as toastr from "toastr";
import {EmployeesModel, IEmployeesModel} from "../models/employees.model";

class EmployeesView {
    constructor() {
        toastr.info(`Employees View Initialized!`);
        document.getElementById("btnSave")!.addEventListener(ApplicationEvents.Click,
            (e: Event) => {
                e.preventDefault();
                this.Save();
            });
    }

    Save(): void {
        let empModel: IEmployeesModel = new EmployeesModel();
        if (empModel.validate("employeesForm", "btnSave")) {
            toastr.info(`${JSON.stringify(empModel)}`);
            localStorage.setItem(empModel.employeeID.toString(), JSON.stringify(empModel));
        } else {
            toastr.error("Please enter all required fields!");
        }
    }
}

export {EmployeesView}

document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
     new EmployeesView();
});
