interface ICountryModel {
    country:string;
    population:number;
}
class  CountryModel implements  ICountryModel {
    country: string;
    population: number;

    constructor() {
        this.country ="";
        this.population=0 ;

    }

}
export {ICountryModel,CountryModel}
