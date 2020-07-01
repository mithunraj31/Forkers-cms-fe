import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../services';
import { Vehicle } from '../../../@core/entities/vehicle.model';

@Component({
  selector: 'frk-vehicles-table-view',
  styleUrls: ['./vehicles-table-view.component.scss'],
  templateUrl: './vehicles-table-view.component.html',
})
export class VehiclesTableViewComponent implements OnInit {

  // use for config UI of ng2-smart-table
  // @type {any}
  tableSettings: any = {};

  // the property binding to display vehicle infomation listings table.
// @type {Vehicle[]}
  listings: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {
    this.tableSettings = {
      // hide create, update, and delete row buttons from ng2-smart-table
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      // hide filter row
      hideSubHeader: true,
      // the property contains column configurations.
      columns: {
        id: {
          title: 'ID'
        },
        isOnline: {
          title: 'Status',
          // data feild can add html element
          type: 'html',
          // mapping nested property of user data to display  username
          valuePrepareFunction: (isOnline: boolean) => {
            return isOnline
              ? '<i class="fas fa-circle device-online"></i> Online'
              : '<i class="fas fa-circle"></i> Offline';
          },
        }
      }
    }
  }

  ngOnInit() {
    this.initialTable();
  }

  // the method request to Backend API to get vehicle information listings
  // then assing obtained values to [listings] property, 
  // the property binding to display table.
  // @return {void}
  initialTable() {
    this.vehicleService.getVehicles().subscribe(response => {
      if (response?.vehicles) {
        this.listings = response.vehicles;
      }
    }, error => {

    });
  }
}
