import { Component, OnInit } from '@angular/core';
import { Camera } from '../../../@core/entities/camera.model';
import { StompSubscriber } from '../../../@core/entities/stomp-subscriber.model';
import { WS_TOPIC } from '../../../@core/constants/websocket-topic';
import { VehicleService } from '../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { AddCameraDialogComponent } from '../../dashboard/dialogs/add-camera-dialog/add-camera-dialog.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ConfirmModalComponent } from '../../../@theme/components/confirm-modal/cofirm-modal.component';
import { IconLinkPrepartionComponent } from '../../devicedata/eventdata/icon-link-preparation/icon-link-preparation.component';

@Component({
  selector: 'frk-camera-details',
  templateUrl: './camera-details.component.html',
  styleUrls: ['./camera-details.component.scss']
})
export class CameraDetailsComponent implements OnInit {


  // use for config UI of ng2-smart-table
  // @type {any}
  tableSettings: any = {};

  // the property binding to display camera infomation listings table.
  // @type {Camera[]}
  listings: Camera[] = [];


    // vehicle ID obtained from route params
    // @type {number}
    vehicleId: number;

    totalCamera:number;

    progress = false;

    no:number;

  constructor(
    private vehicleService: VehicleService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: NbToastrService,
        private dialog: NbDialogService
  ) {
    this.tableSettings = {

      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      // hide filter row
      hideSubHeader: true,

      // the property contains column configurations.
      columns: {
        no: {
          title: $localize`:@@no:`,
          // data feild can add html element
          filter: false,

        },
        rotation: {
          title: $localize`:@@rotation:`,
          // data feild can add html element
          filter: false,
        },
        channel: {
          title: $localize`:@@channel:`,
          // data feild can add html element
          filter: false,
        },
        //Incase if we used ng2 table the edit delete button can be provided like this.
        action:{
          title: Action,
          // data feild can add html element
          filter: false,
          type: 'custom',
          valuePrepareFunction: (val: any) => {
            return val;
          },
          //Example component 
          renderComponent: IconLinkPrepartionComponent,
          onComponentInitFunction: (instance: any) => {
            // when user click serial number will redirect to events details page
            instance.onClicked.subscribe(response => {
            });
          },

        }
      },
      
    }
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(paramMap => {
      // get vehicle id from route params
      this.vehicleId = parseInt(paramMap.get('id'));
      this.initialTable();
  });
  }

  // the method request to Backend API to get event information listings
  // then assing obtained values to [listings] property, 
  // the property binding to display table.
  // @return {void}
  initialTable() {
    //mock data
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
      
    
    // this.vehicleService.getCameraDataById(this.vehicleId).subscribe(cameraData => {
    //   this.listings = cameraData;
      // let subscribers: StompSubscriber[] = [];
      // this.listings.forEach((item) => {
      //   if (!item.video.videoUrl) {
      //     subscribers.push(<StompSubscriber> {
      //       topic: `${WS_TOPIC.EVENT}/${item.eventId}`,
      //       onReceivedMessage: () => { this. initialTable(); }
      //     });
      //   }
      // });
    // }, error => {
    //   const status = 'danger';
    //   this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:`, { status });
    //   this.router.navigate([`pages/dashboard`]);
    // });
    this.totalCamera=this.listings.length;
    console.log(this.totalCamera);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddCameraDialogComponent, {
      context: {
        title:'Add Camera',
        no:this.listings.length+1,
      }
    });
     dialogRef.onBackdropClick.subscribe(result => {
      if (result) {
        const camera: any = result;
        // API Requst to save camera
        this.progress = true;
        this.vehicleService.saveCamera(this.vehicleId,camera).subscribe(result => {
          this.initialTable();
        }, error => {
          this.initialTable();
          this.progress = false;
        })

      }
    });
   }
   editCamera(camera){
     console.log(camera);
    const dialogRef = this.dialog.open(AddCameraDialogComponent, {
      context: {
        title:'Edit Camera',
        no:camera.no,
        rot: camera.rotation,
        ch: camera.channel,
        }
    });
     dialogRef.onBackdropClick.subscribe(result => {
      if (result) {
        const camera: any = result;
        // API Requst to update camera
        this.progress = true;
        this.vehicleService.updateCamera(this.vehicleId,camera).subscribe(result => {
          this.initialTable();
        }, error => {
          this.initialTable();
          this.progress = false;
        })

      }
    });

   }

   deleteCamera(camera:Camera){
       // API Requst to update camera
       this.progress = true;
       this.dialog.open(ConfirmModalComponent, {
        context: {
            title: 'Confirm delete',
            description: `Would you like to delete this camera: ${camera.no} ?`
        }
    })
       this.vehicleService.deleteCamera(this.vehicleId,camera.id).subscribe(result => {
         this.initialTable();
       }, error => {
         this.initialTable();
         this.progress = false;
       })

   }
}
