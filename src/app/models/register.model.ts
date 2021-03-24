import {IUtility, Utility} from "../helpers/utility.helper";

interface IRegisterModel {
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
}

class RegisterModel implements IRegisterModel {
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    utils: IUtility;
    constructor() {
        this.utils = new Utility();
        this.firstName = this.utils.getInputElement("txtFirstName")!.value;
        this.lastName = this.utils.getInputElement("txtLastName")!.value;
        this.email = this.utils.getInputElement("txtEmail")!.value;
        this.confirmEmail = this.utils.getInputElement("txtConfirmEmail")!.value;
        this.password = this.utils.getInputElement("txtPassword")!.value;
        this.confirmPassword = this.utils.getInputElement("txtConfirmPassword")!.value;
    }

    // this method we will use to validate
    // values entered in the register form
    validate(formId: string, btnId: string): boolean {
        let isValid: boolean = true;
        if (this.utils.validate(formId, btnId)) {
            if (this.email !== this.confirmEmail) {
                isValid = false;
                let id: string = "txtConfirmEmail";
                this.utils.getInputElement(id)!.setAttribute(
                    "class", "form-control is-invalid");
                document.getElementById(
                    `${id}Help`)!.setAttribute(
                    "class", "text-danger d-block");
            }
            //validate emails match
            if (this.password !== this.confirmPassword) {
                isValid = false;
                let id: string = "txtConfirmPassword";
                this.utils.getInputElement(id)!.setAttribute(
                    "class", "form-control is-invalid");
                document.getElementById(
                    `${id}Help`)!.setAttribute(
                    "class", "text-danger d-block");
            }

        } else {
            isValid = false;
        }
        return isValid;
    }
}

export {IRegisterModel, RegisterModel}
