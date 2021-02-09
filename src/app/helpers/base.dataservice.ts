import Axios, { AxiosResponse } from "axios";
interface IBaseDataService{
    Get<T>(url:string): Promise<AxiosResponse>;
    Add<T,FormData>(obj:T, contentType:string,url:string): Promise<AxiosResponse>;
    Update<T,FormData>(obj:T, contentType:string,url:string): Promise<AxiosResponse>;
    Remove(contentType:string,url:string): Promise<AxiosResponse>;
    handleResponse(response:AxiosResponse) : void;
    HandleMethods(responseAx:Promise<AxiosResponse>):void;
}

class BaseDataService implements IBaseDataService{

    constructor(){
    }
    Get<T>(url:string): Promise<AxiosResponse>  { 
        let data = Axios.get<T>(url);
        //console.log(`Add >> ${data}`);
        return data;
    }
    Add<T>(obj:T, contentType:string,url:string): Promise<AxiosResponse>  {
        const config = { headers: { 'Content-Type': contentType } };
        let data = Axios.post<T>(url, obj,config);
        console.log(`Add >> ${data}`);
        return data;
    }
    Update<T>(obj:T, contentType:string,url:string): Promise<AxiosResponse>  {
        const config = { headers: { 'Content-Type': contentType,  'dataType': 'json'}};
        let data = Axios.put<T>(url, obj,config);
        console.log(`Update >> ${data}`);
        return data;
    }
    Remove(contentType:string,url:string): Promise<AxiosResponse>{
        const config = { headers: { 'Content-Type': contentType } };
        let data = Axios.delete(url,config);
        console.log(`Remove >> ${data}`);
        return data;
    }
    HandleMethods(responseAx:Promise<AxiosResponse>): void    {
        responseAx.then((response:AxiosResponse) : void => {
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
                    console.log(error.response.data);
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
        });

        
    }
    handleResponse(response:AxiosResponse) : void  {
        console.log(response.data);
    }


}

export {IBaseDataService,BaseDataService}
/*

 */
