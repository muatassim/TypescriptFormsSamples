export interface ICustomerModel {
    customerID:string;
    companyName:string;
    contactName:string;
    contactTitle:string;
    address:string;
    city:string;
    region:string;
    postalCode:string;
    country:string;
    phone:string;
    fax:string;
    [key:string]:string;
}
export class CustomerModel implements ICustomerModel {
    [key: string]: string;
    address: string="";
    city: string="";
    companyName: string="";
    contactName: string="";
    contactTitle: string="";
    country: string="";
    customerID: string="";
    fax: string="";
    phone: string="";
    postalCode: string="";
    region: string="";

}
