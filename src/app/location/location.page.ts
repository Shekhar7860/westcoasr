import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Location} from '@angular/common';
import {GlobleService} from '../globle.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.page.html',
    styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
    List;
    searchList;
    Data;
    Type;
    index;
    values;

    constructor(private route: ActivatedRoute, public modalCtrl: ModalController, public ruoter: Router, public location: Location ,public api: GlobleService, public router: Router) {

    }

    ngOnInit() {
        this.api.CLEAR_FROM();
        this.Get_List();
    }


    getRandomColor() {
        // const randomItem = this.items[Math.floor(Math.random() * this.items.length)];
        const color = Math.floor(0x1000000 * Math.random()).toString(16);
        return '#' + ('000000' + color).slice(-6);
        // return randomItem;
    }

    Get_List() {
        let data = {
            LOCATION_ID: this.api.LOCATION_ID,
            DEPARTMENT_ID: this.api.DEPARTMENT_ID,
            SUB_DEPARTMENT_ID :this.api.SUB_DEPARTMENT_ID
        };
        this.api.presentLoading();
        this.api.FORMDATA_API(data).then(DATA => {
            this.api.stoploading();
            // @ts-ignore
            this.List = DATA.LOCATION;
            console.log('LIST', this.List);
        }).catch();
    }

    selectname(i) {
        this.api.LOCATION_ID = i.ID;
        this.router.navigateByUrl('/department')
    }

    back_exit() {
        this.location.back();
    }

}
