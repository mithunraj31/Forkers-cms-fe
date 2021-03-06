import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { SmartTableLinkComponent } from '../../../@theme/components/smart-table-link/smart-table-link.component';
import { Event } from '../../../@core/entities/event.model';
import { UserService } from '../../../services/user.service';
import { StompWebsocketService } from '../../../services/stomp-websocket.service';
import { StompSubscriber } from '../../../@core/entities/stomp-subscriber.model';
import { UserAccount } from '../../../@core/entities/UserAccount.model';
import { WS_TOPIC } from '../../../@core/constants/websocket-topic';
import { LocalDataSource } from 'ng2-smart-table';
import { IconLinkPrepartionComponent } from './icon-link-preparation/icon-link-preparation.component';

@Component({
  selector: 'frk-eventdata',
  templateUrl: './eventdata.component.html',
  styleUrls: ['./eventdata.component.scss']
})
export class EventdataComponent implements OnInit, OnDestroy {



  // use for config UI of ng2-smart-table
  // @type {any}
  tableSettings: any = {};

  // the property binding to display event infomation listings table.
  // @type {Event[]}
  listings: Event[] = [];

  source: LocalDataSource;


  @Input() name: any;

  role;
  companyName: string;
  eventName: string;
  user: UserAccount;
  wsConn: any;
  wsvideoConn: any;

  constructor(private eventService: EventService,
    private router: Router,
    private toastrService: NbToastrService,
    private userService: UserService,
    private route: ActivatedRoute,
    private stompWebsocketService: StompWebsocketService,) {
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
          // mapping nested property of event data to display  events details
          onComponentInitFunction: (instance: any) => {
            // when user click event id will redirect to events details page
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
            return this.eventService.getEventTypeName(type);
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
            // when user click video icon will redirect to video page
            instance.onClicked.subscribe(response => {
              this.router.navigate([`pages/devices/events/${response.eventId}/videos`]);
            });
          },
        }
      }
    }

    //get user info
    this.user = this.userService.getLoggedUser();

    // define websocket subscribe topic
    let wsUserSubscriber: StompSubscriber = null;
    // the user is admin
    if (this.user.roles.some(x => x == 'ROLE_ADMIN')) {
      wsUserSubscriber = <StompSubscriber>{
        topic: WS_TOPIC.EVENT_USER_ADMIN,
        onReceivedMessage: () => { this. initialTable(); }
      };
    // the user is enduser
    } else {
      wsUserSubscriber = <StompSubscriber>{
        topic: `${WS_TOPIC.EVENT_USER}/${this.user.stk_user}`,
        onReceivedMessage: () => { this. initialTable(); }
      };
    }

    this.wsConn = this.stompWebsocketService.createConnection(wsUserSubscriber);
  }

  ngOnInit() {
    this.role = this.userService.getLoggedUser().roles[0];
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
      let subscribers: StompSubscriber[] = [];
      this.listings.forEach((item) => {
        if (!item.video.videoUrl) {
          subscribers.push(<StompSubscriber> {
            topic: `${WS_TOPIC.EVENT}/${item.eventId}`,
            onReceivedMessage: () => { this. initialTable(); }
          });
        }
      });
      this.source = new LocalDataSource(this.listings);
      if (subscribers.length > 0) {
        if (this.wsvideoConn) {
          this.wsvideoConn.disconnect();
        }
        this.wsvideoConn = this.stompWebsocketService.createConnections(subscribers);
      }
    }, error => {
      const status = 'danger';
      this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:`, { status });
    });
  }

  ngOnDestroy() {
    this.stompWebsocketService.disconnect(this.wsConn);
    this.stompWebsocketService.disconnect(this.wsvideoConn);
  }

  onClickRefresh(){
  this.initialTable();
  }
  onSearch(query: string = '') {
    if(!query){
      return this.initialTable();
    }
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'eventId',
        search: query
      },
      {
        field: 'deviceId',
        search: query
      },
      {
        field: 'userName',
        search: query
      }
    ], false); 
    // second parameter specifying whether to perform 'AND' or 'OR' search 
  // (meaning all columns should contain search query or at least one)
  // 'AND' by default, so changing to 'OR' by setting false here
  }

}
