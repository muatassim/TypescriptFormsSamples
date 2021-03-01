import { ApplicationEvents } from "./helpers/applicationevents";
import {ConsolePrint} from "sampletypescriptlibraryproject";
class Main  {
    consolePrint:ConsolePrint;
    constructor() {
        this.consolePrint = new ConsolePrint();
    }
    init() {

        this.consolePrint.Print("Azizdd");

    }

}
export {Main}
document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let app: Main = new Main();  
    app.init();     
});
