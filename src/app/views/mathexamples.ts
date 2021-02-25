import { Main } from "../main";
import {View} from "./view";

class MathExamples extends View {

    options: [string,string][]=[];
    constructor(){
        super("Math Operations");
        this.options.push(["+","Addition"])  // index options 0 --> 00 = +, 01 = "Addition"
        this.options.push(["-","subtraction"]);
        this.options.push(["/","division"]);
        this.options.push(["*","multiplication"]);
        this.options.push(["%","remainder"]);
        this.options.push(["^","power"]);
       }

    init(): void {
       //console.log("Math Example Init method called.");
       //Add options to select element
       let selectedOperator: HTMLSelectElement =   <HTMLSelectElement>
                            document.getElementById("operator") ;
       if (selectedOperator){
         for (let i =0; i< this.options.length; i++){
            let optionElement: HTMLOptionElement = document.createElement("option");
             optionElement.value = this.options[i][0];
             optionElement.text = this.options[i][1];
            selectedOperator.options.add(optionElement);
         }


         //End adding options to Select Element

         //Add click listener to button
         let buttonElement: HTMLButtonElement =
                    <HTMLButtonElement> document.getElementById("btnMath");
         if (buttonElement){
             buttonElement.addEventListener("click", (e:Event)=>{
                   this.onButtonClick(e);
              });
         }

       }
    }
    onButtonClick(e:Event) {
        e.preventDefault();
         //console.log("button clicked!");
         let firstNumberElement= <HTMLInputElement> document.getElementById("firstNumber");
         let secondNumberElement = <HTMLInputElement> document.getElementById("secondNumber");
         let selectedOperatorElement: HTMLSelectElement =   <HTMLSelectElement>
                            document.getElementById("operator") ;

         if (firstNumberElement && secondNumberElement && selectedOperatorElement){
                 let result: number = this.calculate(firstNumberElement.value, secondNumberElement.value,
                        selectedOperatorElement.selectedOptions[0].value);


            //find the ul tag
                let ulElement: HTMLUListElement = <HTMLUListElement> document.getElementById("answers");
             if (ulElement){
                let listItemElement: HTMLLIElement = document.createElement("li");
                listItemElement.setAttribute("class","list-group-item");
                listItemElement.innerHTML = `${firstNumberElement.value}&nbsp;
                     ${selectedOperatorElement.selectedOptions[0].value}&nbsp;
                     ${secondNumberElement.value}&nbsp;=&nbsp;${result}`;
                 ulElement.append(listItemElement);
            }
         }



    }

    calculate(firstNumber:string, secondNumber:string, selectedOperator:string): number {

        console.log(`${firstNumber},${secondNumber}, ${selectedOperator}`);
        let result:number;
        switch (selectedOperator) {
            case "+": {
                result = Number(firstNumber) + Number(secondNumber);
                break;
            }
            case "-": {
                result = Number(firstNumber) - Number(secondNumber);
                break;
            }
            case "/": {
                result = Number(firstNumber) / Number(secondNumber);
                break;
            }
            case "%": {
                result = Number(firstNumber) % Number(secondNumber);
                break;
            }
            case "*": {
                result = Number(firstNumber) * Number(secondNumber);
                break;
            }
            default: {
                result = Number(firstNumber) ** Number(secondNumber);
            }
        }
        return result;

    }
}

export { MathExamples }
document.addEventListener("DOMContentLoaded", () => {
    let math: MathExamples = new MathExamples();
    math.init();
});

/*
document.addEventListener("DOMContentLoaded",  callme);
function callme(e:Event): void {
    console.log("hello");
}



 */
