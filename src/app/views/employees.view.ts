import {ApplicationEvents} from "../helpers/applicationevents";
import * as toastr from "toastr";
import {EmployeesModel, IEmployeesModel} from "../models/employees.model";
import {View} from "./view";

export class EmployeesView extends View {
    constructor() {
        super("Employees","btnSave");
        // console.log(document.location.pathname.toString());
        this.showAlert();
    }
    showAlert() {

        toastr.success("Child view");
    }

    onButtonClick(): void {
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
