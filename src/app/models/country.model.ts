export interface ICountryModel {
    country:string;
    population:number;
}
export class  CountryModel implements  ICountryModel {
    country: string;
    population: number;
    constructor() {
        this.country ="";
        this.population=0 ;

    }

}
