import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Location} from '@angular/common';
import {GlobleService} from '../globle.service';

@Component({
    selector: 'app-department',
    templateUrl: './department.page.html',
    styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {

    List;
    searchList;
    Data;
    Type;
    index;
    values;
    department = [];

    constructor(private route: ActivatedRoute, public modalCtrl: ModalController, public ruoter: Router, public location: Location, public api: GlobleService) {

    }


    ngOnInit() {
        this.Get_List();
    }


    getRandomColor() {
        // const randomItem = this.items[Math.floor(Math.random() * this.items.length)];
        const color = Math.floor(0x1000000 * Math.random()).toString(16);
        return '#' + ('000000' + color).slice(-6);
        // return randomItem;
    }

    initializeItems(ev: any) {
        let val;
        if (ev.detail != '') {
            val = ev.target.value.trim();
        } else {
            val = '';
            this.searchList = this.List;
        }
        console.log('val', val);

        if (val && val.trim() !== '') {
            this.searchList = this.List.filter((item) => {
                if (item.NAME) {
                    return (item.NAME.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
    }

    Get_List() {
        let data = {
            LOCATION_ID: this.api.LOCATION_ID,
            DEPARTMENT_ID: this.api.DEPARTMENT_ID,
            SUB_DEPARTMENT_ID: this.api.SUB_DEPARTMENT_ID
        };
        this.api.presentLoading();
        this.api.FORMDATA_API(data).then(DATA => {
            this.api.stoploading();
            // @ts-ignore
            this.List = DATA.DEPARTMENT;
            // @ts-ignore
            this.searchList = DATA.DEPARTMENT;
            console.log('LIST', this.List);
        }).catch();
    }

    selectname(i) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                name: i.NAME,
                id: i.ID
            }
        };
        this.api.DEPARTMENT_ID = i.ID;
        this.ruoter.navigate(['/create'], navigationExtras);
    }

    back_exit() {
        this.location.back();
    }
}
