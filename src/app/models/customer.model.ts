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
}
export class CustomerModel implements ICustomerModel {

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
