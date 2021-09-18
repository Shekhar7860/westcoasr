import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {GlobleService} from '../globle.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    DATA;
    IS_EDIT = false;
    constructor(public location: Location, public api: GlobleService, private photoViewer: PhotoViewer,public ruoter: Router) {
        this.Get_List();
    }

    ngOnInit() {
    }

    Edit_Data(){
        const navigationExtras: NavigationExtras = {
            queryParams: {
                name: this.DATA[0].DEPARTMENT_NAME,
                id: this.DATA[0].SUB_DEPARTMENT_ID,
                UPDATE_ID: this.DATA[0].ID,
                STATUS: this.DATA[0].STATUS
            }
        };
        this.api.DEPARTMENT_ID = this.DATA[0].DEPARTMENT_ID;
        this.ruoter.navigate(['/update'], navigationExtras);  
    }
    Get_List() {
        let data = {
            ID: this.api.DETAILS_ID,
        };
        this.api.presentLoading();
        this.api.ADDNEW_DETAILS_API(data).then(DATA => {
            // @ts-ignore
            this.DATA = DATA.data;
            if(this.DATA.length > 0){
                if(this.DATA[0].COMPLETE_TIME_CLOSE_TIME != '00-00-0000 12:00 AM'){
                    this.IS_EDIT = false;
                }else{
                    this.IS_EDIT = true;
                }
            }
            this.api.stoploading();
        }).catch();
    }


    back_exit() {
        this.location.back();
    }

    ZOOM_IMAGE(url){
        this.photoViewer.show(url);
    }
}
