export interface  IApiModel {
    Id: number;
    methodName: string;
}

export class ApiModel implements  IApiModel {
    Id: number;
    methodName: string;
    constructor(id:number, name:string) {
        this.Id = id;
        this.methodName= name;
    }
}
