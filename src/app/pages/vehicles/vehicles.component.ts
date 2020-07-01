import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'frk-vehicles',
  styleUrls: ['./vehicles.component.scss'],
  templateUrl: './vehicles.component.html',
})
export class VehiclesComponent implements OnInit {

  // initalize Tabs configuration for device device tab
  // each tabs contin tile and display component route
  // @type {any[]}
  // reference: https://akveo.github.io/nebular/docs/components/tabs/overview#nbtabsetcomponent
  tabs: any[] = [];  

  constructor() {

  }

  ngOnInit() {
    // initialize tabsets
    this.tabs = [
      {
        title: $localize`:@@tableView:`,
        route: ['./table'],
      },
      {
        title: $localize`:@@mapsView:`,
        route: ['./maps'],
      }
    ];
  }
}
