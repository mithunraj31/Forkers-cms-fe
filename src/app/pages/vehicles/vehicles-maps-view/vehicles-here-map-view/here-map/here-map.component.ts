import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { VehicleService } from '../../../../../services';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { marker, icon } from 'leaflet';

declare var H: any;
@Component({
  selector: 'frk-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {
  public lat: any = '35.7251283';
  public lng: any = '139.8591726';
  public width: any = '1000px';
  public height: any = '600px';

  private platform: any;
  private map: any;

 // private _appId: string = 'DO3oXPrCCJRIIteH9w6t';
  private _appCode: string = '-NQ4_jgQ99mXizpgKOnCF8iFa276tMHA4uWePlkT9-M';

  private ui: any;
  layers = [];

  public constructor(private vehicleService: VehicleService,
    private router: Router,
    private toastrService: NbToastrService) {

  }

  public ngOnInit() {
    this.platform = new H.service.Platform({
      "apikey": this._appCode,
    });



  }

  public ngAfterViewInit() {
    var maptypes = this.platform.createDefaultLayers();
    this.map = new H.Map(document.getElementById('mapContainer'),
    maptypes.vector.normal.map, {
      center: {lat: this.lat, lng: this.lng},
      zoom: 5,
    });
    // Enable the event system on the map instance:
    var mapEvents = new H.mapevents.MapEvents(this.map);
    var behavior = new H.mapevents.Behavior(mapEvents);


    this.initialMaps()


  }


  initialMaps() {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.layers = [];
      vehicles.forEach(v => {
        console.log(vehicles);
        if (!v.location.lat
          || !v.location.lng
          || v.location.lat == "0.000000"
          || v.location.lng == "0.000000") {
            return;
        }
          var vehicleIcon=`./assets/icon/forklift-${v.online ? 'online' : 'offline'}.png`
          console.log(vehicleIcon);
        var icon = new H.map.Icon(vehicleIcon, { size: {w: 34, h: 34}}),
        coords = {lat:  parseFloat(v.location.lat), lng:  parseFloat(v.location.lng)},
        marker = new H.map.Marker(coords, {icon: icon});
        this.map.addObject(marker);
          marker.addEventListener('tap', event => {
            this.router.navigate([`pages/vehicles/${v.id}`]);
          });

      });
    }, error => {
      const status = 'danger';
      this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:` , { status });
    });
  }

}
