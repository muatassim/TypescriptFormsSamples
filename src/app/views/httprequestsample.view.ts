import {View} from "./view";
import {from, fromEvent} from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";
import * as toastr from "toastr";
import {ApplicationEvents} from "../helpers/applicationevents";
import {ApiModel} from "../models/apimodel.model";
import {IUtility, Utility} from "../helpers/utility.helper";
import Axios from "axios";
import {BaseDataService, IBaseDataService} from "../helpers/base.dataservice";

export class HttpRequestSampleView extends View {
    apiModels: Array<ApiModel> = [];
    utility: IUtility;
    dataService: IBaseDataService;

    constructor() {
        super("HttpRequest", "btnLoad");
        this.utility = new Utility();
        this.dataService = new BaseDataService();
        this.apiModels.push(new ApiModel(1, "Promise"));
        this.apiModels.push(new ApiModel(2, "PromiseAsync"));
        this.apiModels.push(new ApiModel(3, "Observable"));
        this.apiModels.push(new ApiModel(4, "ObservableAsync"));
        this.apiModels.push(new ApiModel(5, "RxJs Ajax"));
        this.bindSelect();


    }

    bindSelect(): void {
        //toastr.info(JSON.stringify(this.apiModels));
        let selectElement: HTMLSelectElement =
            <HTMLSelectElement>document.getElementById("ddlMethod");
        if (selectElement) {
            for (let apiModel of this.apiModels) {
                let optionElement: HTMLOptionElement = document.createElement("option");
                optionElement.value = apiModel.Id.toString();
                optionElement.innerText = apiModel.methodName;
                selectElement.appendChild(optionElement);
            }
        }


    }

    async onButtonClick() {
        if (this.utility.validate("frmRequest", "btnLoad")) {
            //toastr.success("button Load Clicked");
            let urlElement: HTMLInputElement | null = <HTMLInputElement>
                document.getElementById("txtUrl");
            if (urlElement) {
                await this.processSelection(urlElement.value);
            }

        } else {
            toastr.error("Please fix Errors");
        }
    }

    async processSelection(url: string) {
        let selectElement: HTMLSelectElement = <HTMLSelectElement>
            document.getElementById("ddlMethod");
        switch (selectElement.options[selectElement.selectedIndex].value) {
            case "1":
                this.processPromise(url);
                break;
            case "2":
                await this.processPromiseAsync(url);
                break;
            case "3":
                this.processObservable(url);
                break;
            case "4":
                await this.processObservableAsync(url);
                break;
            case "5":
                this.processUsingRxJsAjax(url);
                break;
        }
    }

    processPromise(url: string): void {
        try {
            Axios.get(url).then(response => {
                //toastr.success(JSON.stringify(response.data));
                let {message} = response.data;
                this.displayImage(message);
            }).catch(error => toastr.error(error))
                .finally(() => console.log("Promise completed!"));
        } catch (error) {
            console.log(error);
        }
    }

    async processPromiseAsync(url: string) {
        try {
            let data = await this.dataService.getAsync<any>(url);
            //toastr.success(JSON.stringify(data));
            let {message} = data;
            this.displayImage(message);
        } catch (err) {
            toastr.error(err);
        }
    }
    processUsingRxJsAjax(url: string) {
        let data$ = ajax(url);
        data$.subscribe(
            (ajaxResponse: AjaxResponse) => {
                let {message} = ajaxResponse.response;
                this.displayImage(message);
            },
            error => {
                toastr.error(error);
            },
            () => console.log("all done")
        );
    }
    processObservable(url: string) {
        let data$ = from(Axios.get(url));
        data$.subscribe(
            response => {
               // toastr.success(JSON.stringify(response.data));
                let {message} = response.data;
                this.displayImage(message);
            },
            (error) => {
                toastr.error(error);
            },
            () => console.log("all done")
        );
    }

    async processObservableAsync(url: string) {
        let data$ = await from(Axios.get(url));
        data$.subscribe(
            response => {
                toastr.success(JSON.stringify(response.data));
                let {message} = response.data;
                this.displayImage(message);
            },
            (error) => {
                toastr.error(error);
            },
            () => toastr.info("all done")
        );
    }
    displayImage(imageUrl:string){
        //toastr.info(imageUrl);
        let imgElement: HTMLImageElement = <HTMLImageElement> document.getElementById("imgDog");
        if (imgElement){
            imgElement.setAttribute("src", imageUrl);
        }
    }
}

const docEvent$ = fromEvent(document, ApplicationEvents.DOMContentLoaded)
docEvent$.subscribe(
    () => new HttpRequestSampleView()
)
