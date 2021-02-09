interface  IUtilities {
    validate(formId:string, btnId:string): boolean;
    getInputElement(id: string): HTMLInputElement | null;
    validateInput(id:string): boolean ;

}
class Utilities implements  IUtilities {
    // this method we will use to validate
    // values entered in the register form
    validate(formId:string, btnId: string): boolean {
        let isValid: boolean = true;
        let form:HTMLFormElement= <HTMLFormElement>
            document.getElementById(formId);
        if (form)
        {
            for(let i=0;i<form.elements.length;i++) {
                let inputElement:HTMLInputElement|null =
                    this.getInputElement(form.elements[i].id);
                if (inputElement && inputElement.id !== btnId) {
                    if (!this.validateInput(inputElement.id)) {
                        isValid = false;
                    }
                }
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
export  {IUtilities, Utilities}

