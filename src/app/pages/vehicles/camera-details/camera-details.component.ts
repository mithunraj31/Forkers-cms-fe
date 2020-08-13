import { Component, OnInit } from '@angular/core';
import { Camera } from '../../../@core/entities/camera.model';
import { VehicleService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
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
    vehicleId: string;

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
      this.vehicleId = paramMap.get('id');
      this.initialTable();
  });
  }

  // the method request to Backend API to get event information listings
  // then assing obtained values to [listings] property, 
  // the property binding to display table.
  // @return {void}
  initialTable() {
    this.vehicleService.getCameraDataById(this.vehicleId).subscribe(cameraData => {
      this.listings = cameraData;
      this.totalCamera=this.listings.length;
    }, error => {
      const status = 'danger';
      this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:`, { status });
    });
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCameraDialogComponent, {
      context: {
        title:$localize`:@@addCamera:`,
        no:this.listings.length+1,
        deviceId:this.vehicleId,
      }
    });
     dialogRef.onClose.subscribe(result => {
      if (result) {
        const camera: any = result;
        // API Requst to save camera
        this.progress = true;
        this.vehicleService.saveCamera(camera).subscribe(result => {
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
   editCamera(camera,no){
    const dialogRef = this.dialog.open(AddCameraDialogComponent, {
      context: {
        title:$localize`:@@editCamera:`,
        no:no,
        id:camera.id,
        rot: camera.rotation,
        ch: camera.ch,
        deviceId:this.vehicleId,
        }
    });
    dialogRef.onClose.subscribe(result => {
      if (result) {
        const camera: any = result;
        // API Requst to update camera
        this.progress = true;
        this.vehicleService.updateCamera(camera).subscribe(result => {
          this.initialTable();
          this.progress = false;
        }, error => {
          const status = 'danger';
          this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:` , { status });
          this.initialTable();
          this.progress = false;
        })

      }
    });

   }

   deleteCamera(camera,no){
       const dialogRef=this.dialog.open(ConfirmModalComponent, {
        context: {
            title:$localize`:@@deleteCamera:`, 
            description: $localize`:@@confirmDelete:`+':' +no+`?`
        }
    })
    dialogRef.onClose.subscribe(result => {
    if (result) {
     //const camera: any = result;
      // API Requst to delete camera
      this.progress = true;
       this.vehicleService.deleteCamera(this.vehicleId,camera.id).subscribe(result => {
         this.initialTable();
         this.progress = false;
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
