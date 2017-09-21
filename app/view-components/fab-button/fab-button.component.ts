import {Component, ViewChild} from '@angular/core';
import {Button} from "ui/button";
import {AnimationCurve} from "ui/enums";

@Component({
    selector: 'FabButton',
    templateUrl: 'view-components/fab-button/fab-button.component.html',
    styleUrls: ["view-components/fab-button/fab-button.component.css"],
})
export class FabButtonComponent {

    displayed:boolean;

    constructor() {}

    onFabButtonTab(){
        if(this.displayed) {
            this.hideButtons();
        } else {
            this.displayButtons();
        }
    }

    onFabListButtonTab() {
        this.hideButtons();
    }

    displayButtons(){
        console.log('Display fab list');
        this.displayed = true;
    }

    hideButtons(){
        console.log('Hide fab list');
        this.displayed = false;
    }
}