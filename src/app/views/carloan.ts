import {ApplicationEvents} from "../helpers/applicationevents";
import * as toastr from "toastr";

class CarLoan {
    constructor() {
        //console.log("constructor called");
    }

    init():void {
        this.addListener("txtLoanAmount");
        this.addListener("txtInterestRate");
        this.addListener("txtLoanPeriod");
    }
    addListener(id:string):void {
        let inputElement: HTMLInputElement = <HTMLInputElement> document.getElementById(id);
        if (inputElement){
            inputElement.addEventListener(ApplicationEvents.Input, () => {
                this.calculateLoan();
            });
        }
    }
    initd(): void {
        let inputLoanPeriod: HTMLInputElement = <HTMLInputElement>
            document.getElementById("txtLoanPeriod");
        let inputInterestRate: HTMLInputElement = <HTMLInputElement> document.getElementById("txtInterestRate");
        let inputLoanAmount: HTMLInputElement = <HTMLInputElement> document.getElementById("txtLoanAmount");

        if (inputLoanPeriod){
            inputLoanPeriod.addEventListener(ApplicationEvents.Input, () =>{
                this.calculateLoan();
            });
        }
        if (inputInterestRate){
            inputInterestRate.addEventListener(ApplicationEvents.Input, () =>{
                this.calculateLoan();
            });
        }
        if (inputLoanAmount){
            inputLoanAmount.addEventListener(ApplicationEvents.Input, () =>{
                this.calculateLoan();
            });
        }
    }

    calculateLoan() : void {
        let inputLoanAmount: HTMLInputElement = <HTMLInputElement> document.getElementById("txtLoanAmount");
        let inputInterestRate: HTMLInputElement = <HTMLInputElement> document.getElementById("txtInterestRate");
        let inputLoanPeriod: HTMLInputElement = <HTMLInputElement> document.getElementById("txtLoanPeriod");
        let inputMonthlyPayments: HTMLInputElement =<HTMLInputElement> document.getElementById("txtMonthlyPayments");
        let inputTotalCost:HTMLInputElement =<HTMLInputElement> document.getElementById("txtTotalCost");
        if (inputLoanPeriod &&
            inputInterestRate &&
            inputLoanAmount &&
            inputMonthlyPayments && inputTotalCost) {
            let loanPeriodInMonths:number = Number(inputLoanPeriod.value);
            let loanAmount:number = Number(inputLoanAmount.value);
            let interestRate: number = Number(inputInterestRate.value);
            let PaymentAmount:number;
            if (interestRate>0)
            {
                let interestRatePerYear: number = ((interestRate/100) / 12);
                PaymentAmount = (interestRatePerYear * loanAmount) /
                    (1 - (1 +interestRatePerYear)**-loanPeriodInMonths);

            }
            else{
                PaymentAmount = loanAmount / loanPeriodInMonths;

            }
            let totalCost : number = Math.round(PaymentAmount * loanPeriodInMonths );
            inputTotalCost.value = totalCost.toString()
            inputMonthlyPayments.value = Math.round(PaymentAmount).toString();


        }

    }
}

export {CarLoan}

document.addEventListener(ApplicationEvents.DOMContentLoaded, () => {
    let loan: CarLoan = new CarLoan();
    loan.init();
});
