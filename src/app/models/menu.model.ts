export interface IMenuModel {
    url:string;
    innerText:string;
    isSelected:boolean;
}
export class MenuModel  implements  IMenuModel {
    innerText: string;
    isSelected: boolean=false;
    url: string;
    constructor(text:string, link:string) {
        this.innerText = text;
        this.url = link;
    }
}

