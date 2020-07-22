import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../../../../services/event.service';
import { NbMenuService } from '@nebular/theme';

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

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private menuService: NbMenuService) {
  }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe(paramMap => {
      // get event id from parent  route params
      this.eventId = paramMap.get('eventId');

      this.getVideoUrl();
    });

  }

  getVideoUrl() {
    this.eventService.getEventById(this.eventId).subscribe(event => {
      if (event) {
        this.videoUrl = event.video.videoUrl;
      }
    });
  }

}