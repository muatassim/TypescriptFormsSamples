import toastr from "toastr";

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
    email: string ;
    confirmEmail: string ;
    password: string ;
    confirmPassword: string;

    constructor() {
        this.firstName = this.getInputElement("txtFirstName")!.value;
        this.lastName = this.getInputElement("txtLastName")!.value;
        this.email = this.getInputElement("txtEmail")!.value;
        this.confirmEmail = this.getInputElement("txtConfirmEmail")!.value;
        this.password = this.getInputElement("txtPassword")!.value;
        this.confirmPassword = this.getInputElement("txtConfirmPassword")!.value;
    }
    // this method we will use to validate
    // values entered in the register form
    validate(formId:string): boolean {
        let isValid: boolean = true;
        let form:HTMLFormElement= <HTMLFormElement>
            document.getElementById(formId);
        if (form)
        {
            for(let i=0;i<form.elements.length;i++) {
                let inputElement:HTMLInputElement|null =
                    this.getInputElement(form.elements[i].id);
                if (inputElement && inputElement.id !== "btnRegister") {
                    if (!this.validateInput(inputElement.id)) {
                        isValid = false;
                    }
                }
            }
            //validate password match
            if (this.email !== this.confirmEmail){
                isValid = false;
                let id:string ="txtConfirmEmail";
                this.getInputElement(id)!.setAttribute(
                    "class", "form-control is-invalid");
                document.getElementById(
                    `${id}Help`)!.setAttribute(
                    "class", "text-danger d-block");
            }
            //validate emails match
            if (this.password !== this.confirmPassword){
                isValid=false;
                let id:string ="txtConfirmPassword";
                this.getInputElement(id)!.setAttribute(
                    "class", "form-control is-invalid");
                document.getElementById(
                    `${id}Help`)!.setAttribute(
                    "class", "text-danger d-block");
            }
        }
        return isValid;
    }

    getInputElement(id: string): HTMLInputElement | null {
        return <HTMLInputElement> document.getElementById(id);
    }
    validateInput(id:string): boolean {
        let inputElement: HTMLInputElement | null =
            this.getInputElement(id);
        if (inputElement!.validity.valid) {
            inputElement!.setAttribute(
                "class", "form-control is-valid");
            document.getElementById(
                `${id}Help`)!.setAttribute(
                "class", "d-none");
            return true;
        }
        else{
            inputElement?.setAttribute(
                "class", "form-control is-invalid");
            document.getElementById(
                `${id}Help`)!.setAttribute(
                "class", "text-danger d-block");
            return false;
        }
    }
}
export {IRegisterModel, RegisterModel}
