import Axios, { AxiosResponse } from "axios";
import { Spinner } from "spin.js";
import { IUtility, Utility } from "../helpers/utility";
import {ValidationError } from "../models/validationerror";
interface IBaseDataService{
    Get<T>(url:string): Promise<AxiosResponse>;
    Add<T,FormData>(obj:T, contentType:string,url:string): Promise<AxiosResponse>;
    Update<T,FormData>(obj:T, contentType:string,url:string): Promise<AxiosResponse>;
    Remove(contentType:string,url:string): Promise<AxiosResponse>;
    handleError(reason:any):void;
    handleResponse(response:AxiosResponse) : void;
    HandleMethods(responseAx:Promise<AxiosResponse>,spinner: Spinner):void;
}

class BaseDataService implements IBaseDataService{
    utility:IUtility; 
    constructor(){
        this.utility =new Utility(); 
    }
    Get<T>(url:string): Promise<AxiosResponse>  { 
        let data = Axios.get<T>(url);
        //console.log(`Add >> ${data}`);
        return data;
    }
    Add<T>(obj:T, contentType:string,url:string): Promise<AxiosResponse>  {
        const config = { headers: { 'Content-Type': contentType } };
        let data = Axios.post<T>(url, obj,config);
        //console.log(`Add >> ${data}`);
        return data;
    }
    Update<T>(obj:T, contentType:string,url:string): Promise<AxiosResponse>  {
        const config = { headers: { 'Content-Type': contentType,  'dataType': 'json'}};
        let data = Axios.put<T>(url, obj,config);
        //console.log(`Update >> ${data}`);
        return data;
    }
    Remove(contentType:string,url:string): Promise<AxiosResponse>{
        const config = { headers: { 'Content-Type': contentType } };
        let data = Axios.delete(url,config);
        //console.log(`Remove >> ${data}`);
        return data;
    }
    HandleMethods(responseAx:Promise<AxiosResponse>,spinner: Spinner): void    {
        responseAx.then((response:AxiosResponse) : void => {
            this.utility.stopSpinner(spinner);
            //this.utility.hidediv(this.constants.AppVariables.SpinnerId);
            this.handleResponse(response); 
        }).catch( (error) =>  {           
            if (error.response) {
                if (error.statusCode === 401 || error.response.status ===401){ 
                    //empty 
                }
                else if (error.statusCode === 400 || error.response.status ===400
                      || error.statusCode === 404 || error.response.status ===404){
                    //empty
                }
                else {
                    let errors = this.getErrors(error.response.data);
                    if (errors && errors.length > 0) {
                        this.handleError(errors);
                    }
                    else{ 
                        //empty 
                    }
                }
            }
            else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */ 
            } else {
                // Something happened in setting up the request and triggered an Error 
            }
            //const json= JSON.stringify(responseError.response.data, null, 4);
            this.utility.stopSpinner(spinner); 
        });

        
    }
    handleResponse(response:AxiosResponse) : void  { 
        
    }
    handleError(errors: ValidationError[]):void {
       
    }
    getErrors(data: any) : ValidationError[] {
        let list: ValidationError[]=[];
        for(let result of data){
            let serverError: ValidationError;
            serverError = new ValidationError(result.name, result.message);
            list.push(serverError);
        }
        return list;
    }
}

export {IBaseDataService,BaseDataService}