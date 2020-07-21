import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { SmartTableLinkComponent } from '../../../@theme/components/smart-table-link/smart-table-link.component';
import { Event } from '../../../@core/entities/event.model';
import { UserService } from '../../../services/user.service';
import { IconLinkPrepartionComponent } from '../../../@theme/components/icon-link-preparation/icon-link-preparation.component';

@Component({
  selector: 'frk-eventdata',
  templateUrl: './eventdata.component.html',
  styleUrls: ['./eventdata.component.scss']
})
export class EventdataComponent implements OnInit {



  // use for config UI of ng2-smart-table
  // @type {any}
  tableSettings: any = {};

  // the property binding to display event infomation listings table.
  // @type {Event[]}
  listings: Event[] = [];


  @Input() name: any;

  role;
  companyName: string;



  constructor(private eventService: EventService,
    private router: Router,
    private toastrService: NbToastrService,
     private userService: UserService,
     private route: ActivatedRoute,) {
    this.tableSettings = {
      // hide create, update, and delete row buttons from ng2-smart-table
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      // hide filter row
      hideSubHeader: true,
      // the property contains column configurations.
      columns: {
        eventId: {
          title: $localize`:@@EventId:`,
          // data feild can add html element
          filter: false,
          type: 'custom',
          renderComponent: SmartTableLinkComponent,
          // mapping nested property of user data to display  type of device
          onComponentInitFunction: (instance: any) => {
            // when user click serial number will redirect to events details page
            instance.onClicked.subscribe(response => {
              this.router.navigate([`pages/devices/events/${response.eventId}`]);
            });
          },
        },
        deviceId: {
          title: $localize`:@@DeviceId:`,
          // data feild can add html element
          filter: false,
          type: 'html',
          // use for listening component events.
          valuePrepareFunction: (deviceId: number) => {
            return deviceId;
          },
        },
        type: {
          title: $localize`:@@type:`,
          // data feild can add html element
          filter: false,
          type: 'html',
          // mapping nested property of user data to display  type of device
          valuePrepareFunction: (type: number) => {
            return type;
          },
        },
        video: {
          title: $localize`:@@video:`,
          filter: false,
          type: 'custom',
          valuePrepareFunction: (val: any) => {
            return val;
          },
          renderComponent: IconLinkPrepartionComponent,
          onComponentInitFunction: (instance: any) => {
            // when user click serial number will redirect to events details page
            instance.onClicked.subscribe(response => {
              this.router.navigate([`pages/devices/video/${response.video.videoUrl}`]);
            });
          },


        }
      }
    }
  }

  ngOnInit() {
    this.role = this.userService.getLoggedUser().roles[0];
    this.initialTable();
    this.route.paramMap.subscribe(paramMap => {
      // get companyName from route params
      this.companyName = paramMap.get('companyName');
      this.initialTable();
    });

    //Display company name only when the loggedin user is admin
    if (this.role == "ROLE_ADMIN") {
      var clone = this.clone(this.tableSettings);
      clone.columns['userName'] = {
        title: $localize`:@@company:`,
        type: 'string',
      };
      this.tableSettings = clone;
    }

  }

  //clonning the table to dynamically include a column
  clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  // the method request to Backend API to get event information listings
  // then assing obtained values to [listings] property, 
  // the property binding to display table.
  // @return {void}
  initialTable() {
    this.eventService.getEvent(this.companyName).subscribe(event => {
      this.listings = event;
    }, error => {
      const status = 'danger';
      this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:`, { status });
      this.router.navigate([`pages/dashboard`]);
    });
    //this.listings = this.eventService.getEvent();
  }



}
