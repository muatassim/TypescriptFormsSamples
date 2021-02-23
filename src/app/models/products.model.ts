import {IUtilities, Utilities} from "../helpers/utilities.helper";
interface IProducts {
    productID: number;
    productName: string;
    supplierID: number;
    categoryID: number;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
}

class Products implements IProducts {
    productID: number;
    productName: string;
    supplierID: number;
    categoryID: number;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
    utils: IUtilities;

    constructor() {
        this.utils = new Utilities();
        this.productID = Number(this.utils.getInputElement("txtProductID")!.value);
        this.productName = this.utils.getInputElement("txtProductName")!.value;
        this.supplierID = Number(this.utils.getInputElement("txtSupplierID")!.value);
        this.categoryID = Number(this.utils.getInputElement("txtCategoryID")!.value);
        this.quantityPerUnit = this.utils.getInputElement("txtQuantityPerUnit")!.value;
        this.unitPrice = Number(this.utils.getInputElement("txtUnitPrice")!.value);
        this.unitsInStock = Number(this.utils.getInputElement("txtUnitsInStock")!.value);
        this.unitsOnOrder = Number(this.utils.getInputElement("txtUnitsOnOrder")!.value);
        this.reorderLevel = Number(this.utils.getInputElement("txtReorderLevel")!.value);
        this.discontinued = this.utils.getInputElement("txtDiscontinued")!.value === "true" ? true : false;
    }
    validate(formId: string, btnId: string): boolean {
        let isValid: boolean = false;
        if (this.utils.validate(formId, btnId)) {
            isValid = true;
        }
        return isValid;
    }
}

export {IProducts, Products}
