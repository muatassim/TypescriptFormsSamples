import {IUtilities, Utilities} from "../helpers/utilities.helper";

interface IEmployeesModel {
    employeeID: number;
    lastName: string;
    firstName: string;
    title: string;
    titleOfCourtesy: string;
    birthDate: Date;
    hireDate: Date;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    homePhone: string;
    extension?: string;
    photo: string;
    photoUrl: string;
    notes: string;
    reportsTo: number;
    photoPath: string;
    validate(formId:string, btnId:string): boolean;
}

class   EmployeesModel implements  IEmployeesModel {
    address: string;
    birthDate: Date;
    city: string;
    country: string;
    employeeID: number;
    extension?: string;
    firstName: string;
    hireDate: Date;
    homePhone: string;
    lastName: string;
    notes: string;
    photo: string;
    photoPath: string;
    photoUrl: string;
    postalCode: string;
    region: string;
    reportsTo: number;
    title: string;
    titleOfCourtesy: string;

    utils:IUtilities;
    constructor() {
        this.utils = new Utilities();
        this.address = this.utils.getInputElement("txtAddress")!.value;
        this.birthDate =  new Date(this.utils.getInputElement("txtBirthDate")!.value);
        this.city = this.utils.getInputElement("txtCity")!.value;
        this.country = this.utils.getInputElement("txtCountry")!.value;
        this.employeeID = Number(this.utils.getInputElement("txtEmployeeID")!.value);
        this.extension = this.utils.getInputElement("txtExtension")!.value;
        this.firstName = this.utils.getInputElement("txtFirstName")!.value;
        this.hireDate = new Date(this.utils.getInputElement("txtHireDate")!.value);
        this.homePhone = this.utils.getInputElement("txtHomePhone")!.value;
        this.lastName = this.utils.getInputElement("txtLastName")!.value;
        this.notes = this.utils.getInputElement("txtNotes")!.value;
        this.photo = this.utils.getInputElement("txtPhoto")!.value;
        this.photoPath = this.utils.getInputElement("txtPhotoPath")!.value;
        this.photoUrl = this.utils.getInputElement("txtPhotoUrl")!.value;
        this.postalCode = this.utils.getInputElement("txtPostalCode")!.value;
        this.region = this.utils.getInputElement("txtRegion")!.value;
        this.reportsTo= Number(this.utils.getInputElement("txtReportsTo")!.value);
        this.title = this.utils.getInputElement("txtTitle")!.value;
        this.titleOfCourtesy = this.utils.getInputElement("txtTitleOfCourtesy")!.value;

    }
    // this method we will use to validate
    // values entered in the employee form
    validate(formId: string, btnId: string): boolean {
        let isValid: boolean = false;
        if (this.utils.validate(formId, btnId)) {
            isValid = true;
        }
        return isValid;
    }
    static className:string = "employees";
}

export  {IEmployeesModel, EmployeesModel}
