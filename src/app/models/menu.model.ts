export interface IMenuModel {
    id:number;
    url:string;
    innerText:string;
    isSelected:boolean;
}
export class MenuModel  implements  IMenuModel {
    innerText: string;
    isSelected: boolean=false;
    url: string;
    id:number=0;
    constructor(text:string, link:string) {
        this.innerText = text;
        this.url = link;
    }
}

