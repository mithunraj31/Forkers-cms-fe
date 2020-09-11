import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;
@Component({
  selector: 'frk-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {
  title = 'HereMapDemo';

  @ViewChild("map", { static: true }) public mapElement: ElementRef;

  public lat: any = '35.6804';
  public lng: any = '139.7690';

  public width: any = '1000px';
  public height: any = '600px';

  private platform: any;
  private map: any;

  private _appId: string = 'DO3oXPrCCJRIIteH9w6t';
  private _appCode: string = '-n1cT4W5MJEz3g6tBQqrw-nT02qQ7vOYl6SnI-86EVo';

  public constructor() {

  }

  public ngOnInit() {
    this.platform = new H.service.Platform({
      "app_id": this._appId,
      "app_code": this._appCode,
      useHTTPS: true
    });

  }

  public ngAfterViewInit() {
    let pixelRatio = window.devicePixelRatio || 1;
    let defaultLayers = this.platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320
    });

    this.map = new H.Map(this.mapElement.nativeElement,
      defaultLayers.normal.map, { pixelRatio: pixelRatio });

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    var ui = H.ui.UI.createDefault(this.map, defaultLayers);

    this.map.setCenter({ lat: this.lat, lng: this.lng });
    this.map.setZoom(11);
  }

  // @ViewChild("map")
  // public mapElement: ElementRef;

  // @Input()
  // public appId: any;

  // @Input()
  // public appCode: any;

  // @Input()
  // public lat: any;

  // @Input()
  // public lng: any;

  // @Input()
  // public width: any;

  // @Input()
  // public height: any;

  // public constructor() { }

  // public ngOnInit() { }

  // public ngAfterViewInit() {
  //     let platform = new H.service.Platform({
  //         "app_id": this.appId,
  //         "app_code": this.appCode
  //     });
  //     let defaultLayers = platform.createDefaultLayers();
  //     let map = new H.Map(
  //         this.mapElement.nativeElement,
  //         defaultLayers.normal.map,
  //         {
  //             zoom: 10,
  //             center: { lat: this.lat, lng: this.lng }
  //         }
  //     );
  // }

}
