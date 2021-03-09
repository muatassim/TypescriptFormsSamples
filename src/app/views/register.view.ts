import {ApplicationEvents} from "../helpers/applicationevents";
import * as toastr from "toastr";
import { RegisterModel} from "../models/register.model";
import {View} from "./view";

class RegisterView extends  View {
    constructor() {
         super("Register", "btnRegister");

    }
    onButtonClick(): void {
        let registerModel: RegisterModel =
            new RegisterModel();
        if (registerModel.validate("registerForm", "btnRegister")){
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
        new RegisterView();
    });


