import {IView} from "../interfaces/iview.interfaces";
import * as toastr from "toastr";

export abstract class View implements IView {
    Header: string;
    DivHeaderId: string = "header";

    protected constructor(header: string) {
        this.Header = header;
        this.setPageHeader();
        toastr.success(`${this.Header} initialized!`);

    }

    setPageHeader(): void {
        document.getElementById(this.DivHeaderId)!.innerText = this.Header;
        // console.log(`this.setPageHeader called for Header: ${this.Header}`);
    }

    buildNav(): void {
        //document.location.pathname ;
        let navBody: string = `
           <nav class="navbar = navbar-light bg-light">
        <a class="navbar-brand" href="#">Classes and Interfaces</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
                </li>
                 <li class="nav-item active">
                    <a class="nav-link" href="mathexamples.html">Math Examples</a>
                </li>

            </ul>

        </div>
    </nav>
    `;
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
