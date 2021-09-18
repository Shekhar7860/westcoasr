import {Injectable} from '@angular/core';
import {Device} from '@ionic-native/device/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Toast} from '@ionic-native/toast/ngx';

@Injectable({
    providedIn: 'root'
})
export class GlobleService {
    PLAYSTORE = 'https://play.google.com/store/apps/details?id=com.westcost';
    // MAINURL = 'http://192.168.1.3/CODEIGNITER/westcoast-app/westcoast-app-api/app/';
    // MAINURL = 'https://rosix.in/westcoast/api/app/';
    MAINURL = 'https://production.drugneed.com/api/app/';
    headerspart: any;
    platform = '';
    CURRENT_VERSION = '';
    API_KEY = '';
    AUTH_KEY = '';
    LOGIN_DATA;
    loading;

    LOGIN_URL = 'customer/app_user_login';
    HOMELIST_URL = 'production/app_homepage_list';
    FORMDATA_URL = 'jqry/department_form_data';
    ADDNEW_URL = 'production/save';
    UPDATE_URL = 'production/app_update';
    ADDNEW_DETAILS_URL = 'production/app_homepage_list_details';
    CHANGES_PASSWORD_URL = 'customer/change_password';
    LOGOUT_URL = 'customer/logout';

    SEARCH_TYPE;
    SEARCH_TITLE;

    LOCATION_ID = null;
    DEPARTMENT_ID = null;
    SUB_DEPARTMENT_ID = null;
    SUB_DEPARTMENT_NAME = 'select';
    ROOM_ID = null;
    ROOM_NAME = 'select';
    PRODUCATION_ID = [];
    PRODUCATION_NAME = ['select'];
    QA_ID = [];
    QA_NAME = ['select'];
    MACHINE_ID = null;
    MACHINE_NAME = 'select';
    OPERATER_ID = [];
    OPERATER_NAME = ['select'];

    UNIT_ID = null;
    UNIT_NAME = 'select';
    TIME_ID = null;
    TIME_NAME = 'select';

    DETAILS_ID;

    constructor(public http: HTTP, public device: Device, public location: Location, private toast: Toast,
                public loadingController: LoadingController, public router: Router) {
    }


    LOGOUT_API(data) {
        console.log('preview URL', this.MAINURL + this.LOGOUT_URL);
        console.log('preview data', data);
        return new Promise((resolve, reject) => {
            this.http.setDataSerializer('json');
            this.http.post(this.MAINURL + this.LOGOUT_URL, data, this.getheaderspart())
                .then(DATA => {
                    console.log('api CHANGES_PASSWORD_URL data', DATA);
                    const SUCCESS_DATA = DATA;
                    resolve(JSON.parse(SUCCESS_DATA.data));
                }, (err) => {
                    console.log('api CHANGES_PASSWORD_URL err', err);
                    reject(err);
                });
        });
    }

    CHANGE_PASSWORD_API(data) {
        console.log('preview URL', this.MAINURL + this.CHANGES_PASSWORD_URL);
        console.log('preview data', data);
        return new Promise((resolve, reject) => {
            this.http.setDataSerializer('json');
            this.http.post(this.MAINURL + this.CHANGES_PASSWORD_URL, data, this.getheaderspart())
                .then(DATA => {
                    console.log('api CHANGES_PASSWORD_URL data', DATA);
                    const SUCCESS_DATA = DATA;
                    resolve(JSON.parse(SUCCESS_DATA.data));
                }, (err) => {
                    console.log('api CHANGES_PASSWORD_URL err', err);
                    reject(err);
                });
        });
    }

    ADDNEW_DETAILS_API(data) {
        console.log('preview URL', this.MAINURL + this.ADDNEW_DETAILS_URL);
        console.log('preview data', data);
        return new Promise((resolve, reject) => {
            this.http.setDataSerializer('json');
            this.http.post(this.MAINURL + this.ADDNEW_DETAILS_URL, data, this.getheaderspart())
                .then(DATA => {
                    console.log('api ADDNEW_DETAILS_URL data', DATA);
                    const SUCCESS_DATA = DATA;
                    resolve(JSON.parse(SUCCESS_DATA.data));
                }, (err) => {
                    console.log('api ADDNEW_DETAILS_URL err', err);
                    reject(err);
                });
        });
    }

    ADDNEW_API(data) {
        console.log('preview URL', this.MAINURL + this.ADDNEW_URL);
        console.log('preview data', data);
        return new Promise((resolve, reject) => {
            this.http.setDataSerializer('json');
            this.http.post(this.MAINURL + this.ADDNEW_URL, data, this.getheaderspart())
                .then(DATA => {
                   // console.log('api ADDNEW_URL data', DATA);
                    const SUCCESS_DATA = DATA;
                    // console.log('success', SUCCESS_DATA)
                    // resolve(SUCCESS_DATA.data)
                  resolve({
                    "status": 200,
                    "message": "Save Successfully",
                });
                }, (err) => {
                    console.log('api ADDNEW_URL err', err);
                    reject(err);
                });
        });

    }

    UPDATE_API(data) {
        console.log('preview URL', this.MAINURL + this.UPDATE_URL);
        console.log('preview data', data);
        return new Promise((resolve, reject) => {
            this.http.setDataSerializer('json');
            this.http.post(this.MAINURL + this.UPDATE_URL, data, this.getheaderspart())
                .then(DATA => {
                    console.log('api UPDATE_URL data', DATA);
                    const SUCCESS_DATA = DATA;
                    resolve(JSON.parse(SUCCESS_DATA.data));
                }, (err) => {
                    console.log('api UPDATE_URL err', err);
                    reject(err);
                });
        });

    }



    FORMDATA_API(data) {
        console.log('preview URL', this.MAINURL + this.FORMDATA_URL);
        console.log('preview data', data);
        return new Promise((resolve, reject) => {
            this.http.setDataSerializer('json');
            this.http.post(this.MAINURL + this.FORMDATA_URL, data, this.getheaderspart())
                .then(DATA => {
                    console.log('api FORMDATA data', DATA);
                    const SUCCESS_DATA = DATA;
                    resolve(JSON.parse(SUCCESS_DATA.data));
                }, (err) => {
                    console.log('api FORMDATA err', err);
                    reject(err);
                });
        });

    }


    HOMELIST_API(data) {
        console.log('preview URL', this.MAINURL + this.HOMELIST_URL);
        console.log('preview data', data);
        return new Promise((resolve, reject) => {
            this.http.setDataSerializer('json');
            this.http.post(this.MAINURL + this.HOMELIST_URL, data, this.getheaderspart())
                .then(DATA => {
                    console.log('api HOMELIST data', DATA);
                    const SUCCESS_DATA = DATA;
                    resolve(JSON.parse(SUCCESS_DATA.data));
                }, (err) => {
                    console.log('api HOMELIST err', err);
                    reject(err);
                });
        });

    }

    LOGIN_API(data) {
        console.log('preview URL', this.MAINURL + this.LOGIN_URL);
        console.log('preview data', data);
        return new Promise((resolve, reject) => {
            this.http.setDataSerializer('json');
            this.http.post(this.MAINURL + this.LOGIN_URL, data, this.getheaderspart())
                .then(DATA => {
                    console.log('api LOGIN_URL data', DATA);
                    const SUCCESS_DATA = DATA;
                    resolve(JSON.parse(SUCCESS_DATA.data));
                }, (err) => {
                    console.log('api LOGIN_URL err', err);
                    reject(err);
                });
        });

    }

    public getheaderspart() {
        this.gethederdata();
        this.headerspart = {
            'Accept-Encoding': 'gzip',
            'Content-Encoding': 'application/json',
            'Content-Type': 'application/json',
            'Platform': this.platform,
            'Current-Version': (localStorage.getItem('VERSITION') == null) ? '' : localStorage.getItem('VERSITION'),
            'Api-Key': this.API_KEY,
            'Auth-Key': this.AUTH_KEY,
            'Device-Id': this.device.uuid,
            'Token-Id': (localStorage.getItem('FIREBASETOKAN') == null) ? '' : localStorage.getItem('FIREBASETOKAN'),
            'Device-Model': this.device.manufacturer + ' ' + this.device.model,
            'Os-Version': this.device.version,
        };
        console.log('headers part', this.headerspart);
        return this.headerspart;
    }

    private gethederdata() {
        console.log('Device Details', this.device);
        if ((this.device.platform).toLowerCase() === 'android') {
            this.platform = '2';
        } else if ((this.device.platform).toLowerCase() === 'ios') {
            this.platform = '3';
        }
        this.LOGIN_DATA = JSON.parse(localStorage.getItem('login_details'));
        console.log('Local Data', this.LOGIN_DATA);

        if (this.LOGIN_DATA == null || this.LOGIN_DATA === '' || this.LOGIN_DATA === 'null') {

        } else {
            console.log('Enter If');
            if (this.LOGIN_DATA.data.AUTH_KEY === undefined && this.LOGIN_DATA.data.API_KEY === undefined) {
                this.AUTH_KEY = '';
                this.API_KEY = '';
            } else {
                this.AUTH_KEY = this.LOGIN_DATA.data.AUTH_KEY;
                this.API_KEY = this.LOGIN_DATA.data.API_KEY;
            }
            console.log('Auth key', this.AUTH_KEY);
            console.log('api key', this.API_KEY);
        }
    }

    Toast(msg) {
        this.toast.show(msg, '5000', 'bottom').subscribe(
            toast => {
                console.log(toast);
            }
        );
    }

    ErrorApi(status, message) {
        if (status === 404) {
            this.Toast(message);
            // this.loadingstop();
            // localStorage.removeItem('login_details');
            // this.router.navigateByUrl('/login');
        } else if (status === 440) {
            this.Toast(message);
            localStorage.removeItem('login_details');
            // this.router.navigateByUrl('/login');
            window.location.reload();
        } else if (status === 304) {
            this.Toast(message);
            window.open(this.PLAYSTORE, '_system');
        } else if (status === 530) {
            this.Toast(message);
            navigator['app'].exitApp();

        } else {
            this.Toast(message);
        }
    }

    CLEAR_FROM() {
        this.LOCATION_ID = null;
        this.DEPARTMENT_ID = null;
        this.SUB_DEPARTMENT_ID = null;
        this.SUB_DEPARTMENT_NAME = 'select';
        this.ROOM_ID = null;
        this.ROOM_NAME = 'select';
        this.PRODUCATION_ID = [];
        this.PRODUCATION_NAME = ['select'];
        this.QA_ID = [];
        this.QA_NAME = ['select'];
        this.MACHINE_ID = null;
        this.MACHINE_NAME = 'select';
        this.OPERATER_ID = [];
        this.OPERATER_NAME = ['select'];
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            duration: 2000
        });
        await this.loading.present();

        const {role, data} = await this.loading.onDidDismiss();
        console.log('Loading dismissed!');
    }

    stoploading() {
        this.loadingController.dismiss();
    }

}
