import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../../../../services/event.service';
import { NbToastrService } from '@nebular/theme';
import { UserService } from '../../../../../../services';

@Component({
  selector: 'frk-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
 //@varible source: list of key pair value
    // the data obtain from parent component 
    // use for display in ng2-smart-table
    // key property will display on first column
    // value property will display on second column
    // @type {{ key: string, value: string }[]}
   // @Input() source: { key: string, value: string }[];

    // event information in array of key pair value format
  // @type {any[]}
  event: any[];

  // role of the loggedIn user is received
  role;

   //@variable tableSettings: use for config UI of ng2-smart-table
    //@type {any}
    tableSettings: any = {};

    // event ID obtained from route params
  // @type {number}
  eventId: string;



  constructor(private eventService: EventService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private userService: UserService) {
      this.tableSettings = {
        // hide create, update, and delete row buttons from ng2-smart-table
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        // hide column header
        hideHeader: true,
        // hide filter row
        hideSubHeader: true,
        // the property contains column configurations.u
        columns: {
            key: {
                class: 'key-name',

            },
            value: {
                // data feild can add html element
                type: 'html'
            }
        },
        pager: {
            display: false
        }
    };
    }

  ngOnInit(): void {
    this.role = this.userService.getLoggedUser().roles[0];
    this.route.parent.paramMap.subscribe(paramMap => {
      // get event id from parent  route params
      this.eventId = paramMap.get('eventId');
    });
    this.initailDetails(); 
  }

   // the method request to Backend API to get vehicle information by vehicle id
  // then mapping obtained response to key sources to display on VerticleDetailsComponent,
  // next update marker layers.
  // @return {void}

  initailDetails() {
     
    this.eventService.getEventById( this.eventId).subscribe(event => {
      if (event) {
        this.event = [

          {

            key: $localize`:@@userName:`,
            value: event.userName
          },

          {
            key: $localize`:@@DeviceId:`,
            value: event.deviceId
          },
          {
            key: $localize`:@@EventId:`,
            value: event.eventId
          },
          {
            key: $localize`:@@driverId:`,
            value: event.driverId
          },
          {
            key: $localize`:@@type:`,
            value: event.type
          },
          {
            key: $localize`:@@videoId:`,
            value: event.video.videoId
          },
          {
            key: $localize`:@@videoUrl:`,
            value: event.video.videoUrl
          },
          {
            key: $localize`:@@noOfCamera:`,
            value: event.video.noOfCamera
          },
          {
            key: $localize`:@@noOfVideo:`,
            value: event.video.noOfVideo
          },
          {
            key: `lat`,
            value: event.sensorValue.lat
          },
          {
            key: 'lng',
            value: event.sensorValue.lng
          },
          {
            key: `gx`,
            value: event.sensorValue.gx
          },
          {
            key: `gy`,
            value: event.sensorValue.gy
          },
          {
            key: `gz`,
            value: event.sensorValue.gz
          },
          {
            key: `roll`,
            value: event.sensorValue.roll
          },
          {
            key: 'pitch',
            value: event.sensorValue.pitch
          },
          {
            key: 'yaw',
            value: event.sensorValue.yaw
          },
          {
            key: 'status',
            value: event.sensorValue.status
          },
          {
            key: 'direction',
            value: event.sensorValue.direction
          },
          {
            key: 'speed',
            value: event.sensorValue.speed
          },

        ];
     //display userName only when the loggedIn user is admin
        if (this.role == "ROLE_ADMIN") {
          this.event =  this.event.filter(x => x.key != $localize`:@@userName:`);
        }
      }
    }, error => {
      const status = 'danger';
      this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:`, { status });
    });
  }



}
