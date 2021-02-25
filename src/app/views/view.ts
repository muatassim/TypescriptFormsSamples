import {IView} from "../interfaces/iview.interfaces";
export abstract class View implements IView
{
    Header:string;
    DivHeaderId:string ="header";
    protected constructor(header:string) {
        this.Header = header;
        this.setPageHeader();
    }
    setPageHeader():void {
        document.getElementById( this.DivHeaderId)!.innerText = this.Header;
    }
    /*
    private header:string="";
    get Header():  string {
        console.log(`returning Header value = ${this.header}`);
        return this.header;
    }
    set Header(val) {
        console.log(`Changing header val to ${val} from ${this.header}`);
        document.getElementById("header")!.innerText= val;
        this.header = val;
    }

     */

}
