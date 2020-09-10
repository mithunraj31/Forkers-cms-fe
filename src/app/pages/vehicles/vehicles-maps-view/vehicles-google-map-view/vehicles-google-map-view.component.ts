import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'

@Component({
  selector: 'frk-vehicles-google-map-view',
  templateUrl: './vehicles-google-map-view.component.html',
  styleUrls: ['./vehicles-google-map-view.component.scss']
})
export class VehiclesGoogleMapViewComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  constructor() { }

  ngOnInit(): void {
  }

}
