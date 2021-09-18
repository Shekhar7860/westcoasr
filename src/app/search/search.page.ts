import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController, NavParams} from '@ionic/angular';
import {GlobleService} from '../globle.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    List;
    searchList;
    Data;
    Type;
    index;
    values;

    // SUB_DEPARTMENT_LIST;
    // ROOM_LIST;
    // PRODUCATION_LIST;
    // QA_LIST;
    // MACHINE_LIST;
    constructor(private route: ActivatedRoute, public modalCtrl: ModalController, public ruoter: Router, public api: GlobleService) {
        console.log('SEARCH_TYPE', api.SEARCH_TYPE);
        console.log('SEARCH_TITLE', api.SEARCH_TITLE);
    }

    ngOnInit() {
        this.Get_List();
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
            //Sub Department
            if (this.api.SEARCH_TYPE == 1) {
                // @ts-ignore
                this.List = DATA.SUB_DEPARTMENT;
                this.searchList = this.List

            }
            //Room No
            if (this.api.SEARCH_TYPE == 2) {
                // @ts-ignore
                this.List = DATA.ROOM;
                this.searchList = this.List
            }
            //Production Chemist Name
            if (this.api.SEARCH_TYPE == 3) {
                // @ts-ignore
                this.List = DATA.PRODUCATION;
                this.List.forEach(item => {
                    item.selected = false;
                });
                this.searchList = this.List;

            }
            //Q.A. Chemist Name
            if (this.api.SEARCH_TYPE == 4) {
                // @ts-ignore
                this.List = DATA.QA;
                this.List.forEach(item => {
                    item.selected = false;
                });
                this.searchList = this.List

            }
            //Machine Name
            if (this.api.SEARCH_TYPE == 5) {
                // @ts-ignore
                this.List = DATA.MACHINE;
                this.searchList = this.List

            }
            //Operator Name
            if (this.api.SEARCH_TYPE == 6) {
                // @ts-ignore
                let data = DATA.MACHINE;
                for (let i of data) {
                    if (this.api.MACHINE_ID == i.ID) {
                        this.List = i.OPERATER;
                        this.List.forEach(item => {
                            item.selected = false;
                        });
                        this.searchList = this.List
                    }
                }
                console.log('this.searchList', this.searchList);

            }
            //UNIT Name
            if (this.api.SEARCH_TYPE == 7) {
                // @ts-ignore
                this.List = DATA.UNIT;
                this.searchList = this.List;

            }
            //TIME Name
            if (this.api.SEARCH_TYPE == 8) {
                // @ts-ignore
                this.List = DATA.TIME;
                this.searchList = this.List;

            }
        }).catch();
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

    selectname(i = null) {
        let NAME = [];
        //Sub Department
        if (this.api.SEARCH_TYPE == 1) {
            this.api.SUB_DEPARTMENT_ID = i.ID;
            this.api.SUB_DEPARTMENT_NAME = i.NAME;
        }
        //Room No
        if (this.api.SEARCH_TYPE == 2) {
            this.api.ROOM_ID = i.ID;
            this.api.ROOM_NAME = i.NAME;
        }
        //Production Chemist Name multi
        if (this.api.SEARCH_TYPE == 3) {
            for (let i of this.searchList) {
                if (i.selected == true) {
                    this.api.PRODUCATION_ID.push(i.ID);
                    NAME.push(i.NAME);
                }
            }
            this.api.PRODUCATION_NAME = NAME;
        }
        //Q.A. Chemist Name multi
        if (this.api.SEARCH_TYPE == 4) {
            for (let i of this.searchList) {
                if (i.selected == true) {
                    this.api.QA_ID.push(i.ID);
                    NAME.push(i.NAME);
                }
            }
            this.api.QA_NAME = NAME;
            console.log('NAME', this.api.QA_NAME);
        }
        //Machine Name
        if (this.api.SEARCH_TYPE == 5) {
            this.api.MACHINE_ID = i.ID;
            this.api.MACHINE_NAME = i.NAME;
        }
        //Operator Name multi
        if (this.api.SEARCH_TYPE == 6) {

            for (let i of this.searchList) {
                if (i.selected == true) {
                    this.api.OPERATER_ID.push(i.ID);
                    NAME.push(i.NAME);
                }
            }
            this.api.OPERATER_NAME = NAME
        }

        //UNIT Name
        if (this.api.SEARCH_TYPE == 7) {
            this.api.UNIT_ID = i.ID;
            this.api.UNIT_NAME = i.NAME;
        }
        //TIME Name
        if (this.api.SEARCH_TYPE == 8) {
            this.api.TIME_ID = i.ID;
            this.api.TIME_NAME = i.NAME;
        }
        this.modalCtrl.dismiss();
    }

    back_exit() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }
}
