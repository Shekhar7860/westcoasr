import {Component} from '@angular/core';
import {GlobleService} from './globle.service';
import {Router} from '@angular/router';
import {AlertController, ModalController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    login_details;
    OLD_APP_VERSION;
    SNOOZE_DATA;

    constructor(public router: Router, public platform: Platform, public api: GlobleService, public splashScreen: SplashScreen, public modalController: ModalController,
                public statusBar: StatusBar, public appVersion: AppVersion, public alertController: AlertController) {

        this.login_details = JSON.parse(localStorage.getItem('login_details'));
        console.log('Login Details', this.login_details);
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.statusBar.backgroundColorByHexString('#53ABDB');

            this.appVersion.getVersionNumber().then(data => {
                console.log('ApplicationVersion', data);
                this.api.CURRENT_VERSION = data;
                localStorage.setItem('VERSITION', data);
                this.OLD_APP_VERSION = data;
                //  console.log("old_app_version", this.old_app_version);
            });

            if (this.login_details == null) { // if not login
                this.router.navigateByUrl('/login');
            } else {
                this.router.navigateByUrl('/home');
            }
        });
    }
}
