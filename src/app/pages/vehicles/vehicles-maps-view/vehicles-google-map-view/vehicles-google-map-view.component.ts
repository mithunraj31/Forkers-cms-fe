import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { VehicleService } from '../../../../services/vehicle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'frk-vehicles-google-map-view',
  templateUrl: './vehicles-google-map-view.component.html',
  styleUrls: ['./vehicles-google-map-view.component.scss']
})
export class VehiclesGoogleMapViewComponent implements OnInit {
  lat = 35.7251283;
  lng =139.8591726;
  zoom: number = 4;
  markers = [];
  constructor(private vehicleService: VehicleService,
    private toastrService: NbToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
    this.initialMaps();
  }

  initialMaps() {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.markers = [];
      vehicles.forEach(v => {
        if (!v.location.lat
          || !v.location.lng
          || v.location.lat == "0.000000"
          || v.location.lng == "0.000000") {
            return;
        }
        const markerInstance = {
         lat: parseFloat(v.location.lat),
         lng: parseFloat(v.location.lng),
         id:v.id,
         icon: {
          url: `./assets/icon/forklift-${v.online ? 'online' : 'offline'}.png`,
          scaledSize: {
          height: 40,
          width: 30
          }
        }
        }
        this.markers.push(markerInstance)
      });
    }, error => {
      const status = 'danger';
      this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:` , { status });
    });
  }

  clickedMarker( id: number) {
    this.router.navigate([`pages/vehicles/${id}`]);
  }

}


