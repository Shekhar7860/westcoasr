import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Platform, PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../popover/popover.component';
import {GlobleService} from '../globle.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
    GET_DATA = true;
    backButtonSubscription;
    LIST;
    searchList;
    listpostion;

    constructor(public popoverController: PopoverController, public router: Router, public api: GlobleService, public platform: Platform) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
            if (this.router.isActive('/home', true) && this.router.url === '/home') {
                navigator['app'].exitApp();
            }
        });
    }

    ngOnDestroy() {
        this.backButtonSubscription.unsubscribe();
    }

    ionViewDidEnter() {
        this.Get_List();
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true
        });
        return await popover.present();
    }

    doRefresh(event) {
        this.GET_DATA = false;
        this.Get_List();
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
            this.GET_DATA = true;
        }, 2000);
    }

    Get_List() {
        let data = {};
        this.api.presentLoading();
        this.api.HOMELIST_API(data).then(DATA => {
            this.api.stoploading();
            // @ts-ignore
            if (DATA.status === 200) {
                // @ts-ignore
                this.LIST = DATA.data;
                console.log('LIST', this.LIST);
                this.searchList = [];
                let count = 15;
                if (this.LIST.length < 15) {
                    count = this.LIST.length;
                }
                for (let i = 0; i < count; i++) {
                    this.searchList.push(this.LIST[i]);
                    this.listpostion = i;
                }
            } else {
                // @ts-ignore
                this.api.ErrorApi(DATA.status, DATA.message);
            }
        }).catch();
    }

    open_details(ID) {
        this.api.DETAILS_ID = ID;
        this.router.navigateByUrl('/details');
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
        setTimeout(() => {
            console.log('LIST', this.listpostion);
            this.listpostion++;
            let list_count = (this.listpostion + 15);
            for (let i = this.listpostion; i < list_count; i++) {
                if (this.LIST[i]) {
                    this.searchList.push(this.LIST[i]);
                    this.listpostion = i;
                }

                if (this.listpostion == this.LIST.length) {
                    infiniteScroll.target.disabled = true;
                }
            }

            infiniteScroll.target.complete();
            console.log('this.LIST', this.searchList);

        }, 500);
    }

}
