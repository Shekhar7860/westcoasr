import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PopoverComponent} from './popover/popover.component';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Device} from '@ionic-native/device/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {Toast} from '@ionic-native/toast/ngx';
import { Camera} from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@NgModule({
    declarations: [AppComponent, PopoverComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        HTTP,
        Device,
        StatusBar,
        SplashScreen,
        AppVersion,
        Toast,
        Camera,
        PhotoViewer],
    bootstrap: [AppComponent, PopoverComponent],
})
export class AppModule {
}
