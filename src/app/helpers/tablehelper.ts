import { UploadViewModel } from "../models/uploadviewmodel";
import { IUtility, Utility } from "./utility";

interface ITableHelper {
    getUploadTable(uploadViewModelList: Array<UploadViewModel>): HTMLTableElement;

}

class TableHelper implements ITableHelper {
    utility: IUtility;
    constructor() {
        this.utility = new Utility();
    }
    getUploadTable(uploadViewModelList: Array<UploadViewModel>): HTMLTableElement {
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
        let totalSize: number = 0;
        //#region 
        if (tBody) {
            tBody.className = "files";
            for (let i = 0; i < uploadViewModelList.length; i++) {

                let row: HTMLTableRowElement = tBody.insertRow(i);
                row.className = "template-upload";
                this.addTableDataCell(row, `<span class='preview'>${(i + 1).toString()}</span>`, 0);
                let iconCell = `<p> ${this.utility.getFileIcon(uploadViewModelList[i].name)}</p>`;
                this.addTableDataCell(row, iconCell, 1);
                let fileNameCell = `<p class='name'>${uploadViewModelList[i].name}</p>`;
                this.addTableDataCell(row, fileNameCell, 2);
                let sizeCell = `<p class='size'>${uploadViewModelList[i].size.formatBytes()}</p>`;
                this.addTableDataCell(row, sizeCell, 3);
                let progressCell = `<div class="progress">
                                        <div id="${uploadViewModelList[i].id}"  class="progress-bar bg-success" role="progressbar" style="width: 1%" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>`;
              
                this.addTableDataCell(row, progressCell, 4);               
                totalSize += uploadViewModelList[i].size;
            }
        }
      
        //#endregion
        let tFoot: HTMLTableSectionElement = table.createTFoot();
        if (tFoot) {
            let footerRow: HTMLTableRowElement = tFoot.insertRow(0);
            let cell: HTMLTableDataCellElement = footerRow.insertCell(0);
            cell.colSpan = 5;
            let footerCellValue = `Total:<div class='pull-right'>${totalSize.formatBytes()}
                                            <div class="progress">
                                                <div id="totalProgressPercentage"  class="progress-bar-stripped bg-success" role="progressbar" style="width: 1%" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                         </div>`

            cell.innerHTML = footerCellValue;

        }
        return table;
    }
    addTableDataCell(headerRow: HTMLTableRowElement, cellValue: string, index: number): void {
        let cell: HTMLTableDataCellElement = headerRow.insertCell(index);
        cell.innerHTML = cellValue;
    }
}

export { ITableHelper, TableHelper }