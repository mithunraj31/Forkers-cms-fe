import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker } from 'leaflet';
import { VehicleService } from '../../../services';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'frk-vehicles-maps-view',
  styleUrls: ['./vehicles-maps-view.component.scss'],
  templateUrl: './vehicles-maps-view.component.html',
})
export class VehiclesMapsViewComponent implements OnInit {

  options: any = {};
  layers = [];

  constructor(private vehicleService: VehicleService,
    private router: Router,
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

    this.initialMaps();
  }

  initialMaps() {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.layers = [];
      vehicles.forEach(v => {
        const markerInstance = marker([
          parseFloat(v.location.lat),
          parseFloat(v.location.lng)
        ]);
        markerInstance.on('click', (e) => {
          this.router.navigate([`pages/vehicles/${v.id}`]);
        });
        this.layers.push(markerInstance)
      });
    }, error => {
      const status = 'danger';
      this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:` , { status });
    });
  }

}
