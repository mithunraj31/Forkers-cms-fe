import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'frk-event-details-container',
  templateUrl: './event-details-container.component.html',
  styleUrls: ['./event-details-container.component.scss']
})
export class EventDetailsContainerComponent implements OnInit {

    // initalize Tabs configuration for device device tab
  // each tabs contin tile and display component route
  // @type {any[]}
  // reference: https://akveo.github.io/nebular/docs/components/tabs/overview#nbtabsetcomponent
  tabs: any[] = [];  

    // event ID obtained from route params
  // @type {number}
  eventId: string;

  constructor(private route: ActivatedRoute,
    private router:Router,
    @Inject(DOCUMENT) private _document: Document) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      // get event id from parent  route params
      this.eventId = paramMap.get('eventId');
    });
    this.tabs = [
      {
        title: $localize`:@@DeviceDetails:`,
        route: ['./details'],
      },
      {
        title: $localize`:@@mapsView:`,
        route: ['./maps'],
      },
   
      {
        title: $localize`:@@video:`,
        route: ['./videos'],
      }
    ];

  
  }

  ngClickrefresh(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

 
}

