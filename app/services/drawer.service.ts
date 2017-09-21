import {Injectable} from '@angular/core';
import {SideDrawerType} from 'nativescript-telerik-ui/sidedrawer/angular';
import {Subject} from "rxjs/Subject";
import { Observable } from 'rxjs';

@Injectable()
export class DrawerService {

    static STATE_CLOSED:string = 'drawer_state.closed';
    static STATE_CLOSING:string = 'drawer_state.closing';
    static STATE_OPENED:string = 'drawer_state.opened';
    static STATE_OPENING:string = 'drawer_state.opening';

    private subject = new Subject<any>();
    private state:string;
    public drawer: SideDrawerType;

    setState(state: string) {
        this.state = state;
        this.subject.next(state);
    }

    getState():string {
        return this.state;
    }

    getStateObservable(): Observable<any> {
        return this.subject.asObservable();
    }

    public toggle(force?: boolean) {
        console.log("DrawerService.toggle");
        if (this.drawer) {
            if (typeof force !== 'undefined') {
                if (force === false) {
                    this.drawer.closeDrawer();
                }
            } else {
                console.log(`DrawerService.toggle called with drawer:`, this.drawer);
                this.drawer.toggleDrawerState();
            }
        } else {
            console.log("DrawerService.toggle: this.drawer was undefined");
        }
    }

    public setShowOverNavigation(value: boolean) {
        console.log("DrawerService.setShowOverNavigation");
        if (this.drawer) {
            this.drawer.showOverNavigation = value;
        } else {
            console.log("DrawerService.setShowOverNavigation: this.drawer was undefined");
        }
    }

    public setDrawerContentSize(value: number) {
        console.log("DrawerService.setDrawerContentSize");
        if (this.drawer) {
            this.drawer.drawerContentSize = value;
        } else {
            console.log("DrawerService.setDrawerContentSize: this.drawer was undefined");
        }
    }
}