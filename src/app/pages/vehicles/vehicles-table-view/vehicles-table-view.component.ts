import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../services';
import { Vehicle } from '../../../@core/entities/vehicle.model';
import { SmartTableLinkComponent } from '../../../@theme/components/smart-table-link/smart-table-link.component';
import { Router } from '@angular/router';

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

  constructor(private vehicleService: VehicleService,
    private router: Router,) {
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
          title: 'ID',
          // data feild can add html element
          filter: false,
          type: 'custom',
          renderComponent: SmartTableLinkComponent,
          // use for listening component events.
          onComponentInitFunction: (instance: any) => {
            // when user click serial number will redirect to devcie details page
            instance.onClicked.subscribe(response => {
              this.router.navigate([`pages/vehicles/${response.id}`]);
            });
          },
        },
        isOnline: {
          title: $localize`:@@status:`,
          // data feild can add html element
          type: 'html',
          // mapping nested property of user data to display  online status
          valuePrepareFunction: (isOnline: boolean) => {
            return isOnline
              ? '<i class="fas fa-circle device-online"></i> ' + ($localize`:@@online:`)
              : '<i class="fas fa-circle"></i> ' + ($localize`:@@offline:`);
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
