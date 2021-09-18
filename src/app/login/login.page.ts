import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {GlobleService} from '../globle.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy, AfterViewInit  {
    USERNAME = '';
    PASSWORD = '';
    LOGIN_DATA;
    backButtonSubscription;
    constructor(public router: Router, public api: GlobleService, public platform: Platform) {
    }

    ngOnInit() {
    }
    ngAfterViewInit() {
        this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
            if (this.router.isActive('/login', true) && this.router.url === '/login') {
                navigator['app'].exitApp();
            }
        });
    }

    ngOnDestroy() {
        this.backButtonSubscription.unsubscribe();
    }
    LOGIN() {
        if (this.USERNAME == '') {
            this.api.Toast('Enter Username');
        }if (this.PASSWORD == '') {
            this.api.Toast('Enter Password');
        } else {
            this.api.presentLoading();
            const data = {
                USERNAME: this.USERNAME,
                PASSWORD: this.PASSWORD
            };
            this.api.LOGIN_API(data).then(DATA => {
                this.api.stoploading();
                console.log(DATA);
                this.LOGIN_DATA = DATA;
                if (this.LOGIN_DATA.status === 200) {
                    const LOGIN_PASS = {
                        login: 1,
                        data: this.LOGIN_DATA.data[0]
                    };
                    localStorage.setItem('login_details', JSON.stringify(LOGIN_PASS));
                    this.router.navigateByUrl('/home');
                    this.api.Toast(this.LOGIN_DATA.message);
                } else {
                    this.api.ErrorApi(this.LOGIN_DATA.status, this.LOGIN_DATA.message);
                }
            }).catch();
        }
    }
}
