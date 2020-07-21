import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'frk-event-video',
  templateUrl: './event-video.component.html',
  styleUrls: ['./event-video.component.scss']
})
export class EventVideoComponent implements OnInit {

  //receives the videoUrl when the tab is selcted from eventdetails menu
  //received as a param from event data component

  @Input() video: any;

 //receives the videoUrl when the link is clicked from event menu directly
  //received as a param from the route 
  videoUrl: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
   
    this.route.paramMap.subscribe(paramMap => {
      console.log(paramMap.get('videoUrl'));
      console.log(this.video);
      // get videoUrl  from route params
      if (paramMap.get('videoUrl') != null && paramMap.get('videoUrl') != undefined) {
        this.videoUrl = paramMap.get('videoUrl');
      } else {
        this.videoUrl = this.video;
      }

    });
  }
}

