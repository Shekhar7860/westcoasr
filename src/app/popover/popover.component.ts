import {Component, OnInit} from '@angular/core';
import {AlertController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {GlobleService} from '../globle.service';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

    constructor(public popoverController: PopoverController, public router: Router, public api: GlobleService, public alertController: AlertController) {
    }

    ngOnInit() {
    }

    dismissPopover() {
        this.popoverController.dismiss();
    }

    open_chenge_password() {
        this.popoverController.dismiss();
        this.router.navigateByUrl('/change-password')
    }

    async LOGOUT_POPUP() {
        this.popoverController.dismiss();
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirm!',
            message: 'Are you sure want to Logout ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.api.presentLoading();
                        let data = {};
                        this.api.LOGOUT_API(data).then(DATA => {
                            // @ts-ignore
                            this.api.Toast(DATA.message);
                            localStorage.removeItem('login_details');
                            this.router.navigateByUrl('/login');
                            this.api.stoploading();
                        }).catch();

                    }
                }
            ]
        });

        await alert.present();
    }

}
