import { Component, OnInit } from '@angular/core';
import { Camera } from '../../../@core/entities/camera.model';
import { VehicleService } from '../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { AddCameraDialogComponent } from '../../dashboard/dialogs/add-camera-dialog/add-camera-dialog.component';
import { ConfirmModalComponent } from '../../../@theme/components/confirm-modal/cofirm-modal.component';

@Component({
  selector: 'frk-camera-details',
  templateUrl: './camera-details.component.html',
  styleUrls: ['./camera-details.component.scss']
})
export class CameraDetailsComponent implements OnInit {


  // the property binding to display camera infomation listings table.
  // @type {Camera[]}
  listings: Camera[] = [];


    // vehicle ID obtained from route params
    // @type {number}
    vehicleId: number;

    //total cameras in the device
    // @type {number}
    totalCamera:number;

    //loads spinner while connecting db
    // @type {boolean}
    progress = false;


  constructor(
    private vehicleService: VehicleService,
        private route: ActivatedRoute,
        private toastrService: NbToastrService,
        private dialog: NbDialogService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(paramMap => {
      // get vehicle id from route params
      this.vehicleId = parseInt(paramMap.get('id'));
      this.mockData();
     // this.initialTable();
  });
  }

  // the method request to Backend API to get event information listings
  // then assing obtained values to [listings] property, 
  // the property binding to display table.
  // @return {void}
  initialTable() {
    this.vehicleService.getCameraDataById(this.vehicleId).subscribe(cameraData => {
      this.listings = cameraData;
    }, error => {
      const status = 'danger';
      this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:`, { status });
    });
    this.totalCamera=this.listings.length;
  }

  mockData(){
    this.listings=
    [
      {
        "id":1,
        "no":1,
        "rotation":1,
        "channel":1
    
      },
      {
        "id":2,
        "no":2,
        "rotation":2,
        "channel":2
    
      }
    ]
    this.totalCamera=this.listings.length;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddCameraDialogComponent, {
      context: {
        title:'Add Camera',
        no:this.listings.length+1,
      }
    });
     dialogRef.onClose.subscribe(result => {
      if (result) {
        const camera: any = result;
        // API Requst to save camera
        this.progress = true;
        this.vehicleService.saveCamera(this.vehicleId,camera).subscribe(result => {
          this.initialTable();
        }, error => {
          const status = 'danger';
          this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:` , { status });
          this.initialTable();
          this.progress = false;
        })

      }
    });
   }
   editCamera(camera){
    const dialogRef = this.dialog.open(AddCameraDialogComponent, {
      context: {
        title:'Edit Camera',
        no:camera.no,
        rot: camera.rotation,
        ch: camera.channel,
        }
    });
    dialogRef.onClose.subscribe(result => {
      if (result) {
        const camera: any = result;
        // API Requst to update camera
        this.progress = true;
        this.vehicleService.updateCamera(this.vehicleId,camera).subscribe(result => {
          this.initialTable();
        }, error => {
          const status = 'danger';
          this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:` , { status });
          this.initialTable();
          this.progress = false;
        })

      }
    });

   }

   deleteCamera(camera){
       const dialogRef=this.dialog.open(ConfirmModalComponent, {
        context: {
            title: 'Confirm delete',
            description: `Would you like to delete this camera: ${camera.no} ?`
        }
    })
    dialogRef.onClose.subscribe(result => {
    if (result) {
     //const camera: any = result;
      // API Requst to delete camera
      this.progress = true;
       this.vehicleService.deleteCamera(this.vehicleId,camera.id).subscribe(result => {
         this.initialTable();
       }, error => {
        const status = 'danger';
        this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:` , { status });
         this.initialTable();
         this.progress = false;
       })
      }
    });
  }
}
