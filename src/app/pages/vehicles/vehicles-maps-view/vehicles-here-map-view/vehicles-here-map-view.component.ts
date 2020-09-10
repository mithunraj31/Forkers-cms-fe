import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var H: any;
@Component({
  selector: 'frk-vehicles-here-map-view',
  templateUrl: './vehicles-here-map-view.component.html',
  styleUrls: ['./vehicles-here-map-view.component.scss']
})
export class VehiclesHereMapViewComponent implements OnInit {


  private platform: any;

  @ViewChild("map")
  public mapElement: ElementRef;

  public constructor() {
      this.platform = new H.service.Platform({
          "app_id": "DO3oXPrCCJRIIteH9w6t",
          "app_code": "-n1cT4W5MJEz3g6tBQqrw-nT02qQ7vOYl6SnI-86EVo"
      });
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
      let defaultLayers = this.platform.createDefaultLayers();
      // let map = new H.Map(
      //     this.mapElement.nativeElement,
      //     defaultLayers.normal.map,
      //     {
      //         zoom: 10,
      //         center: { lat: 37.7397, lng: -121.4252 }
      //     }
      // );
  }

}
