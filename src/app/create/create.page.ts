import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {SearchPage} from '../search/search.page';
import {Location} from '@angular/common';
import {GlobleService} from '../globle.service';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    ADD_DATA;
    ID ='';
    NAME;
    TITLE;
    PRODUCT_NAME = null;
    REMARK = null;
    STATUS = null;
    DATE = new Date().toISOString();
    MACHINE_START_TIME = null;
    CLOSE_TIME = null;
    IMAGES = [];
    IMAGES_RPM = [];
    IMAGES_CRBOX = [];
    IMAGES_READY_CRBOX = [];
    NO_OF_KG = null;
    NO_OF_TABLE_IN_BATCH = null;
    RPM_MACHINE = null;
    NO_OF_LITER = null;
    NO_OF_BOTTLES_READY = null;
    NO_OF_BOX_LABELS = null;
    NO_OF_WORKERS = null;
    NO_OF_QTY_COMPLETED = null;
    B_NO = null;
    IS_SUBMIT = false;
    constructor(private activeroute: ActivatedRoute,
                public router: Router,
                public modalController: ModalController,
                public location: Location,
                public api: GlobleService,
                private camera: Camera,
                public actionSheetCtrl: ActionSheetController) {

        this.activeroute.queryParams.subscribe(params => {
            console.log('params', params);
            if (params) {
                // this.ID = params.id;
                this.NAME = params.name;
                this.TITLE = this.NAME;
            }
        });
    }

    ngOnInit() {

    }


    back_exit() {
        this.location.back();
    }

    public async oepn_search(type, title) {
        if (type != 1) {
            console.log(this.api.SUB_DEPARTMENT_ID);
            if (this.api.SUB_DEPARTMENT_ID == null) {
                this.api.Toast('Select Sub Department');
            } else {
                this.api.SEARCH_TYPE = type;
                this.api.SEARCH_TITLE = title;
                const modal = await this.modalController.create({
                    component: SearchPage,
                    cssClass: 'my-custom-class',
                });
                modal.onDidDismiss().then(data => {
                });
                return await modal.present();
            }
        } else {
            this.api.SEARCH_TYPE = type;
            this.api.SEARCH_TITLE = title;
            const modal = await this.modalController.create({
                component: SearchPage,
                cssClass: 'my-custom-class',
            });
            modal.onDidDismiss().then(data => {
                this.ID = this.api.SUB_DEPARTMENT_ID;
                console.log('SUB_DEPARTMENT_ID', this.ID);
            });
            return await modal.present();
        }
    }


    SAVE_DATA() {
        if (this.api.SUB_DEPARTMENT_ID == null) {
            this.api.Toast('Select Sub Department');
        } else if (this.api.ROOM_ID == null) {
            this.api.Toast('Select Room');
        } else if (this.api.PRODUCATION_ID.length == 0) {
            this.api.Toast('Select Production Chemist Name');
        } else if (this.api.QA_ID.length == 0) {
            this.api.Toast('Select Q.A. Chemist Name');
        } else if (this.api.MACHINE_ID == null) {
            this.api.Toast('Select Machine Name');
        } else if (this.MACHINE_START_TIME == null) {
            this.api.Toast('Select Machine Start Time');
        } else if (this.PRODUCT_NAME == null) {
            this.api.Toast('Enter Product Name');
        } else if (this.B_NO == null) {
            this.api.Toast('Enter B.No');
        // } else if (this.CLOSE_TIME == null) {
        //     this.api.Toast('Select Complete time/close time');
        } else if (this.STATUS == null) {
            this.api.Toast('Select Status');
        } else if (this.api.OPERATER_ID.length == 0) {
            this.api.Toast('Select Operator Name');
        } else if (this.NO_OF_KG == null && (this.ID == '1' || this.ID == '2' || this.ID == '3' || this.ID == '4' || this.ID == '5' || this.ID == '16' || this.ID == '17' || this.ID == '18' || this.ID == '19' || this.ID == '20' || this.ID == '21' || this.ID == '22' || this.ID == '23' || this.ID == '24' || this.ID == '25' || this.ID == '26' || this.ID == '27' || this.ID == '28' || this.ID == '30' || this.ID == '31' || this.ID == '37' || this.ID == '34' || this.ID == '35' || this.ID == '36' || this.ID == '37')) {
            this.api.Toast('Enter No.of kg');
        } else if (this.NO_OF_TABLE_IN_BATCH == null && (this.ID == '3' || this.ID == '4' || this.ID == '5' || this.ID == '18' || this.ID == '19' || this.ID == '20' || this.ID == '24' || this.ID == '25' || this.ID == '26' || this.ID == '27' || this.ID == '28' || this.ID == '31' || this.ID == '37' || this.ID == '35' || this.ID == '36' || this.ID == '37')) {
            this.api.Toast('Enter No of Tablets In batch');
            // } else if (this.RPM_MACHINE == null && this.ID == '8') {
        } else if (this.RPM_MACHINE == null && (this.ID == '4' || this.ID == '5' || this.ID == '6' || this.ID == '7' || this.ID == '8' || this.ID == '9' || this.ID == '10' || this.ID == '11' || this.ID == '12' || this.ID == '13' || this.ID == '14' || this.ID == '15' || this.ID == '19' || this.ID == '20' || this.ID == '24' || this.ID == '25' || this.ID == '26' || this.ID == '31' || this.ID == '37' || this.ID == '32' || this.ID == '33' || this.ID == '36' || this.ID == '37')) {
            console.log('this.RPM_MACHINE', this.RPM_MACHINE);
            this.api.Toast('Enter RPM Machine');
        } else if (this.NO_OF_LITER == null && (this.ID == '6' || this.ID == '7' || this.ID == '8' || this.ID == '9' || this.ID == '10' || this.ID == '11' || this.ID == '12' || this.ID == '13' || this.ID == '14' || this.ID == '15' || this.ID == '32' || this.ID == '33')) {
            this.api.Toast('Enter No of Liter');
        // } else if (this.NO_OF_BOTTLES_READY == null && (this.ID == '7' || this.ID == '9' || this.ID == '11' || this.ID == '15' || this.ID == '33')) {
        //     this.api.Toast('Enter No of Bottles Ready');
        } else if (this.NO_OF_BOX_LABELS == null && this.ID == '29') {
            this.api.Toast('Enter No of Box/Labels');
        // } else if (this.NO_OF_QTY_COMPLETED == null) {
        //     this.api.Toast('Enter No of Completed QTY');
        } else if (this.NO_OF_WORKERS == null) {
            this.api.Toast('Enter No. of workers');
        } else if (this.IMAGES.length == 0) {
            this.api.Toast('Select Images');
        } else if (this.IMAGES_RPM.length == 0 && (this.ID == '5' || this.ID == '6' || this.ID == '7' || this.ID == '8' || this.ID == '9' || this.ID == '10' || this.ID == '11' || this.ID == '12' || this.ID == '13' || this.ID == '14' || this.ID == '15' || this.ID == '20' || this.ID == '25' || this.ID == '26' || this.ID == '31' || this.ID == '37' || this.ID == '32' || this.ID == '33' || this.ID == '37')) {
            this.api.Toast('Select Image of RPM');
        // } else if (this.IMAGES_CRBOX.length == 0 && (this.ID == '5' || this.ID == '6' || this.ID == '7' || this.ID == '8' || this.ID == '9' || this.ID == '10' || this.ID == '11' || this.ID == '12' || this.ID == '13' || this.ID == '14' || this.ID == '15' || this.ID == '20' || this.ID == '25' || this.ID == '26' || this.ID == '31' || this.ID == '37' || this.ID == '32' || this.ID == '33' || this.ID == '37')) {
        //     this.api.Toast('Select C.R.box insthis.IDe image');
        // } else if (this.IMAGES_READY_CRBOX.length == 0 && (this.ID == '5' || this.ID == '6' || this.ID == '7' || this.ID == '8' || this.ID == '9' || this.ID == '10' || this.ID == '11' || this.ID == '12' || this.ID == '13' || this.ID == '14' || this.ID == '15' || this.ID == '20' || this.ID == '25' || this.ID == '26' || this.ID == '31' || this.ID == '37' || this.ID == '32' || this.ID == '33' || this.ID == '37')) {
        //     this.api.Toast('Select Ready C.R Box images');
        } else {
            this.IS_SUBMIT = true;
            this.Add_API();
        }
        /* const data = {
             'LOCATION_ID': this.api.LOCATION_ID,
             'DEPARTMENT_ID': this.api.DEPARTMENT_ID,
             'DATE': this.DATE,
             'SUB_DEPARTMENT_ID': this.api.SUB_DEPARTMENT_ID,
             'ROOM_ID': this.api.ROOM_ID,
             'PRODUCTION_CHEMIST_NAME': this.api.PRODUCATION_ID,
             'QA_CHEMIST_NAME': this.api.QA_ID,
             'MACHINE_NAME': this.api.MACHINE_ID,
             'MACHINE_START_TIME': this.MACHINE_START_TIME,
             'PRODUCT_NAME': this.PRODUCT_NAME,
             'B_NO': this.B_NO,
             'COMPLETE_TIME_CLOSE_TIME': this.CLOSE_TIME,
             'REMARK': this.REMARK,
             'STATUS': this.STATUS,
             'OPERATOR_NAME': this.api.OPERATER_ID,
             'NO_OF_KG': this.NO_OF_KG,
             'NO_OF_WORKERS': this.NO_OF_WORKERS,
             'NO_OF_TABLE_IN_BATCH': this.NO_OF_TABLE_IN_BATCH,
             'RPM_MACHINE': this.RPM_MACHINE,
             'NO_OF_LITER': this.NO_OF_LITER,
             'NO_OF_BOTTLES_READY': this.NO_OF_BOTTLES_READY,
             'NO_OF_BOX_LABELS': this.NO_OF_BOX_LABELS,
             'IMAGE': this.IMAGES,
             'IMAGE_OF_RPM': this.IMAGES_RPM,
             'CR_IMAGE': this.IMAGES_CRBOX,
             'CR_READY_IMAGE': this.IMAGES_READY_CRBOX
         };
         console.log('data', data);*/
    }

    private Add_API() {
        this.api.presentLoading();
        const data = {
            'LOCATION_ID': this.api.LOCATION_ID,
            'DEPARTMENT_ID': this.api.DEPARTMENT_ID,
            'DATE': this.DATE,
            'SUB_DEPARTMENT_ID': this.api.SUB_DEPARTMENT_ID,
            'ROOM_ID': this.api.ROOM_ID,
            'PRODUCTION_CHEMIST_NAME': this.api.PRODUCATION_ID,
            'QA_CHEMIST_NAME': this.api.QA_ID,
            'MACHINE_NAME': this.api.MACHINE_ID,
            'MACHINE_START_TIME': this.MACHINE_START_TIME,
            'PRODUCT_NAME': this.PRODUCT_NAME,
            'B_NO': this.B_NO,
            'COMPLETE_TIME_CLOSE_TIME': this.CLOSE_TIME,
            'REMARK': this.REMARK,
            'STATUS': this.STATUS,
            'OPERATOR_NAME': this.api.OPERATER_ID,
            'NO_OF_KG': this.NO_OF_KG,
            'NO_OF_WORKERS': this.NO_OF_WORKERS,
            'NO_OF_TABLE_IN_BATCH': this.NO_OF_TABLE_IN_BATCH,
            'RPM_MACHINE': this.RPM_MACHINE,
            'NO_OF_LITER': this.NO_OF_LITER,
            'NO_OF_BOTTLES_READY': this.NO_OF_BOTTLES_READY,
            'NO_OF_BOX_LABELS': this.NO_OF_BOX_LABELS,
            'IMAGE': this.IMAGES,
            'IMAGE_OF_RPM': this.IMAGES_RPM,
            'CR_IMAGE': this.IMAGES_CRBOX,
            'CR_READY_IMAGE': this.IMAGES_READY_CRBOX,
            'UNIT_ID': this.api.UNIT_ID,
            'TIME_ID': this.api.TIME_ID,
            // Commented by Dishant. Date: 21-05-2021 17:29:28 Comment: NEW INPUT ADDED
            'NO_OF_QTY_COMPLETED': this.NO_OF_QTY_COMPLETED
        };
        this.api.ADDNEW_API(data).then((result) => {
            this.ADD_DATA = result;
            console.log('data', this.ADD_DATA);
            if (this.ADD_DATA.status === 200) {
                this.api.Toast(this.ADD_DATA.message);
                this.IS_SUBMIT = false;
                this.router.navigateByUrl('/home');
                this.api.stoploading();
            } else {
                this.api.ErrorApi(this.ADD_DATA.status, this.ADD_DATA.message);
            }
        }, (err) => {
            console.log(err);
        });
    }


    async presentActionSheet(TYPE) {

        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Select Image Source',
            buttons: [
                {
                    // Open Gallery
                    text: 'Open Gallery',
                    handler: () => {
                        this.accessGallery(TYPE);
                    }
                },
                {
                    // Open Camare Method
                    text: 'Open Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA, TYPE);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    accessGallery(TYPE) {

        console.log('Enter access gallery');
        this.camera.getPicture({

            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.DATA_URL

        }).then((imageData) => {

            const IMAGE_DATA = {
                image: 'data:image/jpeg;base64,' + imageData,
                extension: 'png'
            };
            if (TYPE == 1) {
                this.IMAGES.push(IMAGE_DATA);
            }
            if (TYPE == 2) {
                this.IMAGES_RPM.push(IMAGE_DATA);
            }
            if (TYPE == 3) {
                this.IMAGES_CRBOX.push(IMAGE_DATA);
            }
            if (TYPE == 4) {
                this.IMAGES_READY_CRBOX.push(IMAGE_DATA);
            }

        }, (err) => {

            console.log(err + 'error');

        });

    }

    public takePicture(sourceType, TYPE) {

        const options = {
            quality: 50,
            sourceType: sourceType,
            saveToPhotoAlbum: true,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.capturePhoto(options, TYPE);
    }

    async capturePhoto(options: CameraOptions, TYPE) {
        try {
            const result = await this.camera.getPicture(options);

            const IMAGE_DATA = {
                image: `data:image/jpeg;base64,${result}`,
                extension: 'png'
            };
            if (TYPE == 1) {
                this.IMAGES.push(IMAGE_DATA);
            }
            if (TYPE == 2) {
                this.IMAGES_RPM.push(IMAGE_DATA);
            }
            if (TYPE == 3) {
                this.IMAGES_CRBOX.push(IMAGE_DATA);
            }
            if (TYPE == 4) {
                this.IMAGES_READY_CRBOX.push(IMAGE_DATA);
            }
        } catch (e) {
            console.error(e);
        }
    }

    removeimage(idx, TYPE) {
        // this.IMAGES.splice(idx, 1);
        if (TYPE == 1) {
            this.IMAGES.splice(idx, 1);
        }
        if (TYPE == 2) {
            this.IMAGES_RPM.splice(idx, 1);
        }
        if (TYPE == 3) {
            this.IMAGES_CRBOX.splice(idx, 1);
        }
        if (TYPE == 4) {
            this.IMAGES_READY_CRBOX.splice(idx, 1);
        }
        // console.log('TYPE', this.TYPE);
        // if (this.TYPE === '1') {
        //     let data = {
        //         'path': this.Get_data[0].SHOP_IMAGES[idx].path1 + this.Get_data[0].SHOP_IMAGES[idx].name,
        //         'id': this.Get_data[0].SHOP_IMAGES[idx].id,
        //     };
        //     this.DELETE_GALLERY_IMAGES.push(data);
        //     console.log('DELETE DATA', this.DELETE_GALLERY_IMAGES);
        // }
    }
}
