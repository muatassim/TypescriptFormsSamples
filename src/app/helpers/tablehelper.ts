interface ITableHelper {
    getUploadTable(): HTMLTableElement;
}

class TableHelper implements ITableHelper {
    constructor() {
    }
    getUploadTable(): HTMLTableElement {
        let table: HTMLTableElement = document.createElement("table");
        table.id = "progressTable";
        table.setAttribute("role", "presentation");
        table.className = "table table-striped";
        //create tHead
        let tHead: HTMLTableSectionElement = table.createTHead();
        if (tHead) {
            let headerRow: HTMLTableRowElement = tHead.insertRow(0);
            this.addTableDataCell(headerRow, "", 0);
            this.addTableDataCell(headerRow, "", 1);
            this.addTableDataCell(headerRow, "", 2);
            this.addTableDataCell(headerRow, "", 3);
            this.addTableDataCell(headerRow, "", 4);
        }
        let tBody: HTMLTableSectionElement = table.createTBody();
        //#region 
        if (tBody) {
            let row: HTMLTableRowElement = tBody.insertRow(0);
            row.className = "template-upload";
            this.addTableDataCell(row, "", 0);
            this.addTableDataCell(row, "", 1);
            this.addTableDataCell(row, "", 2);
            this.addTableDataCell(row, "", 3);
            this.addTableDataCell(row, "", 4);
        }

        //#endregion
        let tFoot: HTMLTableSectionElement = table.createTFoot();
        if (tFoot) {
            let footerRow: HTMLTableRowElement = tFoot.insertRow(0);
            let cell: HTMLTableDataCellElement = footerRow.insertCell(0);
            cell.colSpan = 5;
            let footerCellValue = `footer`
            cell.innerHTML = footerCellValue;

        }
        return table;
    }

    addTableDataCell(headerRow: HTMLTableRowElement, cellValue: string, index: number): void {
        let cell: HTMLTableDataCellElement = headerRow.insertCell(index);
        cell.innerHTML = cellValue;
    }
}

export {ITableHelper, TableHelper}
