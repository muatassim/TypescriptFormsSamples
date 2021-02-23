import {EmployeesModel} from "../models/employees.model";

interface ITableHelper {
    getEmployeesTable(employees: Array<EmployeesModel>, apiUrl: string): HTMLTableElement;
}

class TableHelper implements ITableHelper {
    constructor() {
    }

    getEmployeesTable(employees: Array<EmployeesModel>, apiUrl: string): HTMLTableElement {
        let table: HTMLTableElement = document.createElement("table");
        table.id = "progressTable";
        table.setAttribute("role", "presentation");
        table.className = "table table-striped";
        //create tHead
        let tHead: HTMLTableSectionElement = table.createTHead();
        if (tHead) {
            let headerRow: HTMLTableRowElement = tHead.insertRow(0);
            this.addTableDataCell(headerRow, "ID", 0);
            this.addTableDataCell(headerRow, "Title", 1);
            this.addTableDataCell(headerRow, "FirstName", 2);
            this.addTableDataCell(headerRow, "LastName", 3);
            this.addTableDataCell(headerRow, "Photo", 4);
        }
        let tBody: HTMLTableSectionElement = table.createTBody();
        //#region 
        if (tBody) {
            for (let i = 0; i < employees.length; i++) {
                let employee: EmployeesModel = employees[i];
                let row: HTMLTableRowElement = tBody.insertRow(i);
                row.className = "template-upload";
                this.addTableDataCell(row, employee.employeeID.toString(), 0);
                this.addTableDataCell(row, employee.title, 1);
                this.addTableDataCell(row, employee.firstName, 2);
                this.addTableDataCell(row, employee.lastName, 3);
                let imageElement: HTMLImageElement = document.createElement("img")
                imageElement.src = `${apiUrl}image/${employee.employeeID}`;
                imageElement.height = 200;
                imageElement.width = 200;
                let cell: HTMLTableDataCellElement = row.insertCell(4);
                cell.appendChild(imageElement);
            }
        }

        //#t
        this.addFooter(table, `Total Employees: ${employees.length}`);
        return table;
    }

    addTableDataCell(headerRow: HTMLTableRowElement, cellValue: string, index: number): void {
        let cell: HTMLTableDataCellElement = headerRow.insertCell(index);
        cell.innerHTML = cellValue;
    }

    addFooter(table: HTMLTableElement, content: string) {
        let tFoot: HTMLTableSectionElement = table.createTFoot();
        if (tFoot) {
            let footerRow: HTMLTableRowElement = tFoot.insertRow(0);
            let cell: HTMLTableDataCellElement = footerRow.insertCell(0);
            cell.colSpan = 5;
            cell.innerHTML = content;

        }
    }
}

export {ITableHelper, TableHelper}
