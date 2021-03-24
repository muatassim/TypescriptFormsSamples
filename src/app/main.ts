import { ApplicationEvents } from "./helpers/applicationevents";
import {ConsolePrint} from "sampletypescriptlibraryproject";
export class Main  {
    consolePrint:ConsolePrint;
    constructor() {
        this.consolePrint = new ConsolePrint();
    }
    init() {
     // console.log(this.sumAll(this.array));
    //  console.log(this.sumAllUsingRest(1,2,3,4));
    }
    array: number[] = [1,2,3,4];
    sumAll(arr: number[]){
        return arr.reduce((prev:number, next) => prev+next);
    }
    sumAllUsingRest(...arr: number[]){
        return arr.reduce((prev:number, next) => prev+next);
    }
}

document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let app: Main = new Main();  
    app.init();
});









