import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { tileLayer, latLng, marker } from 'leaflet';

@Component({
  selector: 'frk-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss']
})
export class EventMapComponent implements OnInit {

  options: any = {};
  layers = [];
  eventId: string;

  constructor(private eventService: EventService,
    private router: Router,private route: ActivatedRoute,
    private toastrService: NbToastrService) {

  }

  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 5,
      center: latLng(35.7251283, 139.8591726)
    }
    this.route.parent.paramMap.subscribe(paramMap => {
      // get event id from parent  route params
      this.eventId = paramMap.get('eventId');
      this.initialMaps();
    });
    
  }

  initialMaps() {
    this.eventService.getEventById(this.eventId).subscribe(event => {
      this.layers = [];
      if (!event.sensorValue.lat 
        || !event.sensorValue.lng
        || event.sensorValue.lat == "0.000000"
        || event.sensorValue.lng == "0.000000") {
          return;
        }
      const markerInstance = marker([
        parseFloat(event.sensorValue.lat),
        parseFloat(event.sensorValue.lng)
      ]);
      markerInstance.on('click', (e) => {
        this.router.navigate([`devices/events/${event.eventId}`]);
      });
      this.layers.push(markerInstance)
    }, error => {
      const status = 'danger';
      this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:` , { status });
    });
  }

}
