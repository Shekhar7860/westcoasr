import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {SearchPage} from '../search/search.page';
import {Location} from '@angular/common';
import {GlobleService} from '../globle.service';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
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
    CR_BOX_QTY = null;
    B_NO = null;
    UPDATE_ID = null;
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
                this.ID = params.id;
                this.NAME = params.name;
                this.TITLE = this.NAME;
                this.UPDATE_ID = params.UPDATE_ID;
                this.STATUS = params.STATUS;
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


    UPDATE_DATA() {
         if (this.CLOSE_TIME == null) {
            this.api.Toast('Select Complete time/close time');
        } else if (this.STATUS == null) {
            this.api.Toast('Select Status');
        } else if (this.NO_OF_BOTTLES_READY == null && (this.ID == '7' || this.ID == '9' || this.ID == '11' || this.ID == '15' || this.ID == '33')) {
            this.api.Toast('Enter No of Bottles Ready');
        } else if (this.NO_OF_QTY_COMPLETED == null) {
            this.api.Toast('Enter No of Completed QTY');
        } else {
            this.IS_SUBMIT = true;
            this.Add_API();
        }
    }

    private Add_API() {
        this.api.presentLoading();
        const data = {
            'ID': this.UPDATE_ID,
            'COMPLETE_TIME_CLOSE_TIME': this.CLOSE_TIME,
            'REMARK': this.REMARK,
            'STATUS': this.STATUS,
            'NO_OF_BOTTLES_READY': this.NO_OF_BOTTLES_READY,
            'CR_IMAGE': this.IMAGES_CRBOX,
           'CR_READY_IMAGE': this.IMAGES_READY_CRBOX,
           'NO_OF_QTY_COMPLETED': this.NO_OF_QTY_COMPLETED,
           'CR_BOX_QTY': this.CR_BOX_QTY
        };
        this.api.UPDATE_API(data).then((result) => {
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
