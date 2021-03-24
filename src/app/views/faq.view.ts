import {View} from "./view";
import {fromEvent} from "rxjs";
import {ApplicationEvents} from "../helpers/applicationevents";
import {HttpRequestSampleView} from "./httprequestsample.view";

export class FaqView extends  View {

    constructor() {
        super("Frequently Asked Typescript Questions","");
    }

    onButtonClick(): void {
    }

}
const docEvent$ = fromEvent(document, ApplicationEvents.DOMContentLoaded)
docEvent$.subscribe(
    () => new FaqView()
)
