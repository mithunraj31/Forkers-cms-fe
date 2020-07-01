import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker } from 'leaflet';
import { VehicleService } from '../../../services';

@Component({
  selector: 'frk-vehicles-maps-view',
  styleUrls: ['./vehicles-maps-view.component.scss'],
  templateUrl: './vehicles-maps-view.component.html',
})
export class VehiclesMapsViewComponent implements OnInit {

  options: any = {};
  layers = [];
  
  constructor(private vehicleService: VehicleService) {

  }

  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 11,
      center: latLng(35.7251283,139.8591726)
      //center: latLng(35.7251283,139.8591726)
    }

    this.initialMaps();
  }

  initialMaps() {
    this.vehicleService.getVehicles().subscribe(response => {
      if (response?.vehicles) {
        this.layers = [];
        response?.vehicles.forEach(v => {
          this.layers.push(marker([ 
            parseFloat(v.location.lat), 
            parseFloat(v.location.lng)
          ]))
        });
      }
    }, error => {

    });
  }
}
