export interface ICallbackParameter {
    (data: any): void;
}
export interface ICallBack {
    (): void;

}
//To define it
class defineCall {
    save(Action: ICallbackParameter):void {
        let id="my data";
        Action(id);
    }
}
//to use it
class useClass {
    constructor() {
        let d:defineCall = new defineCall();
        d.save(this.save);
    }
    save():void{
        //will be called
    }
}


