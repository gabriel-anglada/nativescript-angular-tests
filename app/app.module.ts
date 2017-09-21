// nativescript
import {NativeScriptRouterModule, platformNativeScriptDynamic} from "nativescript-angular";
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {NativeScriptHttpModule} from 'nativescript-angular/http';
import {SIDEDRAWER_DIRECTIVES} from "nativescript-telerik-ui/sidedrawer/angular";

// angular
import {NgModule, enableProdMode} from '@angular/core';
import {Routes} from "@angular/router";

// common app-components
import {MainActionBarComponent} from './common-components/actionbar.component';
import {DrawerService} from "./services/drawer.service";

// app
import {HomeComponent} from './app-components/home/home.component';
import {HelpComponent} from './app-components/help/help.component';
import {LoginComponent} from "./app-components/login/login.component";
import {AppComponent} from "./app-components/app.component";
import {WelcomeComponent} from "./app-components/welcome/welcome.component";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {TNSFontIconModule} from "nativescript-ng2-fonticon";
import {FabButtonComponent} from "./view-components/fab-button/fab-button.component";
import {FlInputComponent} from "./view-components/fl-input/fl-input.component";
import {MainMenuButtonDirective} from "./view-components/main-menu/main-menu-button.directive";
import {MainMenuComponent} from "./view-components/main-menu/main-menu.component";

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
    path: "home",
    component: HomeComponent,
        children: [
            {path: '', component: WelcomeComponent},
            {path: "login", component: LoginComponent},
            {path: "help", component: HelpComponent},
        ]
    },

];

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

// view-components used as visual components: declared in NativeModule
export const VIEW_COMPONENTS: any[] = [
    FabButtonComponent,
    FlInputComponent,
    MainMenuComponent
];

export const DIRECTIVES: any[] = [
    MainMenuButtonDirective
];

// app-components used as routes NOTE: declared in NativeModule
export const APP_COMPONENTS: any[] = [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    HelpComponent,
    LoginComponent
];

// app-components used by other app-components
export const AUX_COMPONENTS: any[] = [
    MainActionBarComponent,
];

enableProdMode();

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        DIRECTIVES,
        VIEW_COMPONENTS,
        APP_COMPONENTS,
        SIDEDRAWER_DIRECTIVES,
        AUX_COMPONENTS,
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(APP_ROUTES),
        TNSFontIconModule.forRoot({
            'mdi': 'material-design-icons.css'
        })
    ],
    exports: [
        SIDEDRAWER_DIRECTIVES,
        AUX_COMPONENTS,
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
    ],
    providers: [
        DrawerService,
    ]
})
class AppModule { }

platformNativeScriptDynamic().bootstrapModule(AppModule);
