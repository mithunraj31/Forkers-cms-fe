import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserService } from '../../../../../services';

@Component({
  selector: 'frk-event-details-container',
  templateUrl: './event-details-container.component.html',
  styleUrls: ['./event-details-container.component.scss']
})
export class EventDetailsContainerComponent implements OnInit {

  // event ID obtained from route params
  // @type {number}
  eventId: string;

  // event information in array of key pair value format
  // @type {any[]}
  event: any[];


  // role of the loggedIn user is received
  role;

  videoUrl: string;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private toastrService: NbToastrService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.role = this.userService.getLoggedUser().roles[0];
    this.route.paramMap.subscribe(paramMap => {
      // get event id from route params
      this.eventId = paramMap.get('eventId');
    });
    this.initailDetails();
  }

  // the method request to Backend API to get vehicle information by vehicle id
  // then mapping obtained response to key sources to display on VerticleDetailsComponent,
  // next update marker layers.
  // @return {void}
  initailDetails() {
     
    this.eventService.getEvent().subscribe(events => {
      const event = events.filter(x => x.eventId == this.eventId)[0]
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
            key: 'lat',
            value: event.sensorValue.lat
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
        if (this.role != "ROLE_ADMIN") {
          this.event =  this.event.filter(x => x.key != $localize`:@@userName:`);
        }
        this.videoUrl = event.video.videoUrl;

      }
    }, error => {
      const status = 'danger';
      this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:`, { status });
    });
  }


}

