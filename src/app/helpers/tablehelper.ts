import {EmployeesModel} from "../models/employees.model";

interface ITableHelper {
    getUploadTable(employees: Array<EmployeesModel>, apiUrl:string): HTMLTableElement;
}

class TableHelper implements ITableHelper {
    constructor() {
    }

    getUploadTable(employees: Array<EmployeesModel>,apiUrl:string): HTMLTableElement {
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
                imageElement.height = 100;
                imageElement.width = 100;

                let cell: HTMLTableDataCellElement = row.insertCell(4);
                cell.appendChild(imageElement);
                //}
                //else{
                //    this.addTableDataCell(row,employee.photoPath, 4);
                //}
            }
        }

        //#endregion
        let tFoot: HTMLTableSectionElement = table.createTFoot();
        if (tFoot) {
            let footerRow: HTMLTableRowElement = tFoot.insertRow(0);
            let cell: HTMLTableDataCellElement = footerRow.insertCell(0);
            cell.colSpan = 5;
            let footerCellValue = `Total Employees: ${employees.length}`
            cell.innerHTML = footerCellValue;

        }
        return table;
    }

    addTableDataCell(headerRow: HTMLTableRowElement, cellValue: string, index: number): void {
        let cell: HTMLTableDataCellElement = headerRow.insertCell(index);
        cell.innerHTML = cellValue;
    }

    convertDataUrlToBlob(dataUrl: string): Blob | null {
        const arr = dataUrl.split(',');
        if (arr) {
            if (arr[0] && arr[1]) {
                const mime = arr[0].match(/:(.*?);/)![1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }

                return new Blob([u8arr], {type: mime})
            }
        }
        return null;
    }

    _arrayBufferToBase64(buffer: any) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
}

export {ITableHelper, TableHelper}
