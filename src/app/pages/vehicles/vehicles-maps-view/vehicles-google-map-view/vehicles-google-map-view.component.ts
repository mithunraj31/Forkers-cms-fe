import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'

@Component({
  selector: 'frk-vehicles-google-map-view',
  templateUrl: './vehicles-google-map-view.component.html',
  styleUrls: ['./vehicles-google-map-view.component.scss']
})
export class VehiclesGoogleMapViewComponent implements OnInit {
  lat =35.6804;
  lng =139.7690;
  constructor() { }

  ngOnInit(): void {
  }

}
