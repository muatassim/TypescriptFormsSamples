import {ApplicationEvents} from "../helpers/applicationevents";
import * as toastr from "toastr";
import {EmployeesModel} from "../models/employees.model";
import Axios from "axios";
import {View} from "./view";

export class EmployeesListView extends  View{
    constructor() {
        super("Employee List","btnLoadData");
    }
    onButtonClick() {
        document.getElementById('spinner')!
            .setAttribute('class',
                'spinner-border d-block');
        Axios.get(`https://nwwebapi.azurewebsites.net/api/Employees`)!
            .then((axiosResponse) => {
                //let employees: EmployeesModel[] = axiosResponse.data;
                let employees: Array<EmployeesModel> = axiosResponse.data;
                let table = this.showTable(employees);
                document.getElementById("main")!.innerHTML = "";
                document.getElementById("main")!.appendChild(table);
            })
            .catch(error => {
                toastr.error(error);
            })
            .finally(() => {
                toastr.info(`Data Loaded!`);
                setTimeout(this.callMe, 1000);
            });
    }
     private callMe():void{
         document.getElementById('spinner')!
             .setAttribute('class', 'd-none');
     }
     showTable(employees: EmployeesModel[]): HTMLTableElement {
        let table: HTMLTableElement = document.createElement('table');
        table.setAttribute('class', `table table-bordered table-striped table-hover`);
        //thead Element
        let tHead: HTMLTableSectionElement = table.createTHead();
        if (tHead) {
            //Header Row
            let headerRow: HTMLTableRowElement = tHead.insertRow();
            this.addCell(headerRow,0, "ID", "scope", "col");
            this.addCell(headerRow,1, "Last Name","scope", "col" );
            this.addCell(headerRow,2, "First Name", "scope", "col");
            this.addCell(headerRow,3, "Title", "scope", "col")
            this.addCell(headerRow,4, "hired On", "scope", "col");


        }
        let tBody: HTMLTableSectionElement = table.createTBody();
        if (tBody) {
            for (let i = 0; i< employees.length; i++) {
                let employee: EmployeesModel = employees[i];
                let row: HTMLTableRowElement = tBody.insertRow();
                this.addCell(row, 0, employee.employeeID.toString(), 'scope', 'row');
                this.addCell(row, 1, employees[i].lastName, 'scope', 'row');
                this.addCell(row, 2, employees[i].firstName, 'scope', 'row');
                this.addCell(row, 3, employees[i].title, 'scope', 'row');
                this.addCell(row, 4, employees[i].hireDate.toString(), 'scope', 'row');

            }
        }
        let tFoot: HTMLTableSectionElement = table.createTFoot();
        if (tFoot) {
            let footerRow: HTMLTableRowElement = tFoot.insertRow();
            let footerCell: HTMLTableCellElement = footerRow.insertCell();
            footerCell.colSpan = 5;
            footerCell.setAttribute('class', 'text-right');
            footerCell.innerText = employees.length.toString();
        }
        return table;
    }
    addCell(row: HTMLTableRowElement, index: number, val: string, attributeName: string,
            attributeValue: string): void {
        let cell = row.insertCell(index);
        cell.innerText = val;
        cell.setAttribute(attributeName, attributeValue);

    }

}


document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let emp = new EmployeesListView();

});



