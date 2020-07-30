import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../../../../services/event.service';
import { NbMenuService } from '@nebular/theme';
import { StompWebsocketService } from '../../../../../../services/stomp-websocket.service';
import { StompSubscriber } from '../../../../../../@core/entities/stomp-subscriber.model';
import { WS_TOPIC } from '../../../../../../@core/constants/websocket-topic';

@Component({
  selector: 'frk-event-video',
  templateUrl: './event-video.component.html',
  styleUrls: ['./event-video.component.scss']
})
export class EventVideoComponent implements OnInit {


  // event ID obtained from route params
  // @type {number}
  eventId: string;


  //receives the videoUrl from the eventId passed through the route param
  //received as a param from the route 
  videoUrl: string;


  //Web ocket Connection
  wsConn: any;

  totalCameras:number;

  totalVideos:number;

  status:string;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private menuService: NbMenuService,
    private stompWebsocketService: StompWebsocketService) {
  }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe(paramMap => {
      // get event id from parent  route params
      this.eventId = paramMap.get('eventId');

      this.getVideoUrl();

    //Start webSocket Subscription
    // define websocket subscribe topic
    let wsUserSubscriber: StompSubscriber = {
      topic: `${WS_TOPIC.EVENT}/${this.eventId}`,
      onReceivedMessage: ()=> {
        this.getVideoUrl()
      }
    };
    this.wsConn = this.stompWebsocketService.createConnection(wsUserSubscriber);

    });

    

  }

  getVideoUrl() {
    this.eventService.getEventById(this.eventId).subscribe(event => {
      if (event) {
        this.videoUrl = event.video.videoUrl;
        this.totalCameras = event.video.noOfCamera;
        this.totalVideos = event.video.noOfVideo;

      }
    });
  } 

  ngOnDestroy() {
    if(this.wsConn != null) {
      this.wsConn.disconnect();
    }
  }

  getVideoStatus() {
    if(this.totalVideos<this.totalCameras ||this.totalCameras==0){
      return $localize`:@@waitingForVideo:`
    }else if( this.totalCameras==this.totalVideos && this.videoUrl){
      return $localize`:@@videoAvailable:`
    }else if(this.totalCameras==this.totalVideos){
      return $localize`:@@processingVideo:`
    }
  }
}