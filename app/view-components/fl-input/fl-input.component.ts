import {Component, ElementRef, ViewChild} from '@angular/core';
import {View} from "ui/core/view";
import {Animation} from "ui/animation";
import buttonModule = require("ui/button");

@Component({
    selector: 'FlInput',
    templateUrl: 'view-components/fl-input/fl-input.component.html',
    styleUrls: ["view-components/fl-input/fl-input.component.css"],
})
export class FlInputComponent {

    @ViewChild("label") labelElement: ElementRef;
    @ViewChild("input") inputElement: ElementRef;
    private _label:View;
    private _input:View;

    private toFill:boolean;

    constructor() {
        this.toFill = false;
    }

    ngOnInit() {
        this._label = <View>this.labelElement.nativeElement;
        this._input = <View>this.inputElement.nativeElement;

        this._input.style.opacity = 0.01;

        this._input.on(buttonModule.Button.tapEvent, this.onInputTab, this);
    }

    onInputTab(e) {
        if(!this.toFill) this.showInput();
    }

    showInput() {
        new Animation([
            {target: this._label, translate: {x: 0, y: -20},duration: 200, scale:{x:0.8, y:0.8}},
            {target: this._input, opacity: 1, duration: 200}
        ], false).play();
    }
}