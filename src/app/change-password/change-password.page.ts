import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {GlobleService} from '../globle.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
    OLD_PASSWORD = null;
    PASSWORD = null;
    CONFIRM_PASSWORD = null;

    constructor(public location: Location, public api: GlobleService, public router: Router) {
    }

    ngOnInit() {
    }

    back_exit() {
        this.location.back();
    }

    Change_password() {
        if (this.OLD_PASSWORD == null) {
            this.api.Toast('Enter Old Password');
        } else if (this.PASSWORD == null) {
            this.api.Toast('Enter New Password ');
        } else if (this.CONFIRM_PASSWORD == null) {
            this.api.Toast('Enter confirm Password');
        } else if (this.PASSWORD != this.CONFIRM_PASSWORD) {
            this.api.Toast('Password not match');
        } else {
            let data = {
                'OLD_PASSWORD': this.OLD_PASSWORD,
                'PASSWORD': this.PASSWORD
            };
            this.api.presentLoading();
            this.api.CHANGE_PASSWORD_API(data).then(DATA => {
                // @ts-ignore
                if (DATA.status === 200) {
                    // @ts-ignore
                    this.api.Toast(DATA.message);
                    this.router.navigateByUrl('/home');
                    this.api.stoploading();
                }else {
                    // @ts-ignore
                    this.api.ErrorApi(DATA.status, DATA.message);
                }
            }).catch();
        }
    }
}
