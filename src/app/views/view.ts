import {IView} from "../interfaces/iview.interfaces";
import {MenuModel} from "../models/menu.model";
import * as menuData from "../../assets/menu.json";
import {ApplicationEvents} from "../helpers/applicationevents";
export abstract class View implements IView {
    Header: string;
    HeaderId: string = "header";
    btnId:string ="btnSave";
    menuItems: Array<MenuModel> = [];
    protected constructor(header: string, btnId:string) {
        this.Header = header;
        this.btnId = btnId;
        this.setPageHeader();
        // toastr.success(`${this.Header} initialized!`);
        this.menuItems = menuData.default as MenuModel[];
        //console.log(document.location.pathname.replace("/",""));
        this.buildNav();
        this.setButtonClick();

    }
    setPageHeader(): void {
        document.getElementById(this.HeaderId)!.innerHTML= `<h1>${this.Header}</h1>`;
        document.title = this.Header;
    }
    private buildNav(): void {
        //document.location.pathname ;
        let bodyElement: HTMLElement =  document.body;
        let nav: HTMLElement = document.createElement("nav");
        nav.setAttribute("class", "navbar navbar-expand-lg navbar-light bg-light");
        let ulTag: HTMLUListElement = document.createElement("ul");
        ulTag.setAttribute("class", "navbar-nav mr-auto");
        let path = document.location.pathname.replace("/","");
        for(let i=0; i<this.menuItems.length; i++) {
            let menuItem: MenuModel = this.menuItems[i]

            //create li
            let liTag: HTMLLIElement = document.createElement("li");
            //ternary operator
            liTag.setAttribute("class",
                (menuItem.url === path) ? "nav-item active" : "nav-item");
            //create anchor
            let anchorTag: HTMLAnchorElement = document.createElement("a");
            anchorTag.setAttribute("class", "nav-link");
            anchorTag.setAttribute("href", menuItem.url);
            anchorTag.innerText = menuItem.innerText;
            // <a href="index.html" class="nav-link">Home</a>  -- when ila =0;
            // <a href="employees.html" css="nav-lin">Employees</a>

            //add anchor to li
            liTag.appendChild(anchorTag)
            //<li class=""><a href="index.html" class="nav-link">Home</a> </li>
            //add li to ul
            ulTag.appendChild(liTag);
            //<ul>li......li --5
        }
       nav.innerHTML = `${this.menuBeforeHtml}  ${ulTag.outerHTML} ${this.menuAfterHtml}`;
        bodyElement.insertBefore(nav, document.getElementById(this.HeaderId)!);
    }
    private menuBeforeHtml:string= `<a class="navbar-brand" href="#">Classes and Interfaces</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">`;
    private menuAfterHtml:string =` </div> `;

    abstract onButtonClick(): void;
    private setButtonClick() :void {
        document.getElementById(this.btnId)!.addEventListener(ApplicationEvents.Click,
            (e: Event) => {
                e.preventDefault();
                this.onButtonClick();
            });
    }


}
