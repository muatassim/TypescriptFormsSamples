import * as toastr from "toastr";

import { ApplicationEvents } from "./helpers/applicationevents";

class Main {
    constructor() {
    }
    init() {
        toastr.options.positionClass = 'toast-bottom-full-width'
        toastr.info("This is the information","Title Toaster");
    }
}
export {Main}
document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let app: Main = new Main();  
    app.init();     
});