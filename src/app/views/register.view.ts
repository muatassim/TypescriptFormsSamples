import {ApplicationEvents} from "../helpers/applicationevents";
import * as toastr from "toastr";
import { RegisterModel} from "../models/register.model";

class RegisterView {
    constructor() {
        document.getElementById("btnRegister")!.addEventListener(ApplicationEvents.Click,
            (e: Event) => {
                e.preventDefault();
                this.Save();
            });
    }
    Save(): void {
        let registerModel: RegisterModel =
            new RegisterModel();
        if (registerModel.validate("registerForm")){
            toastr.info(`${JSON.stringify(registerModel)}`);
            localStorage.setItem(registerModel.email, JSON.stringify(registerModel));
        }
        else{
            toastr.error("Please enter all required fields!");
        }
    }
}
export {RegisterView}
document.addEventListener(ApplicationEvents.DOMContentLoaded,
    () => {
        let myView: RegisterView = new RegisterView();
    });


