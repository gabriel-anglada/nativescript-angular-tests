import {
    ViewChild, ChangeDetectorRef, OnInit, AfterViewInit,
    ChangeDetectionStrategy, Component
} from '@angular/core';

import {NavigationEnd} from '@angular/router';

import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import {RadSideDrawerComponent} from "nativescript-telerik-ui/sidedrawer/angular";
import {DrawerTransitionBase, PushTransition} from "nativescript-telerik-ui/sidedrawer";
import {Page} from "ui/page";
import {Frame} from "ui/frame";
import {RouterExtensions} from "nativescript-angular";
import {DrawerService} from "../../services/drawer.service";
import {ActionBarUtil} from "../../utils/actionbar.util";
import {Observable} from "data/observable";

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent extends Observable implements OnInit, AfterViewInit {

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;
    private _currentNotification: string;

    // why RouterExtensions instead of router?  Well RouterExtenstions actually invokes the router APIs internally.
    // RouterExtenstions also provides access to some NativeScript-specific features like clearing navigation history or defining page transitions.
    // see https://docs.nativescript.org/angular/core-concepts/angular-navigation.html#router-links
    constructor(private routerExtensions: RouterExtensions,
                private _page: Page,
                private _frame: Frame,
                private changeDetectionRef: ChangeDetectorRef,
                public drawerService: DrawerService) {

        super();
        console.log(`HomeComponent constructor`);
        console.log(`page id: {}`, _page.id);
        ActionBarUtil.STATUSBAR_STYLE(1)
        _page.on("loaded", this.onLoaded, this);

    }

    navigateTo(pathToNavigate: string) {
        console.log("navigating to:", pathToNavigate);
        this.routerExtensions.navigate([pathToNavigate], {clearHistory: true});
    }

    ngOnInit() {
        console.log(`HomeComponent ngOnInit`);
        this.routerExtensions.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                console.log(`got router event: NavigationEnd, toggling drawer via our drawerService`);
                this.drawerService.toggle(false);
            }
        });
    }


    ngAfterViewInit() {
        console.log("HomeComponent ngAfterViewInit - this.drawerComponent.sideDrawer=", this.drawerComponent.sideDrawer);
        this.changeDetectionRef.detectChanges();
        this.drawerService.drawer = this.drawerComponent.sideDrawer;
        //this.drawerService.setShowOverNavigation(true);
        //this.drawerService.setDrawerContentSize(400);
    }


    public onLoaded(args) {
        console.log(`>>>>>>> HomeComponent onLoaded <<<<<<<<<`);
        this._sideDrawerTransition = new PushTransition();
    }

    public get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    public onDrawerOpening() {
        this.drawerService.setState(DrawerService.STATE_OPENING);
    }

    public onDrawerOpened() {
        this.drawerService.setState(DrawerService.STATE_OPENED);
    }

    public onDrawerClosing() {
        this.drawerService.setState(DrawerService.STATE_CLOSING);
    }

    public onDrawerClosed() {
        this.drawerService.setState(DrawerService.STATE_CLOSED);
    }
}