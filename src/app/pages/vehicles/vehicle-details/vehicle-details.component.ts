import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker } from 'leaflet';
import { VehicleService } from '../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkType } from '../../../@core/enums/enum.network-type';
import { NbToastrService } from '@nebular/theme';

@Component({
    selector: 'frk-vehicle-details',
    styleUrls: ['./vehicle-details.component.scss'],
    templateUrl: './vehicle-details.component.html',
})
export class VehiclesDetailsComponent implements OnInit {
    // leaflet maps configuratio, set map center, zoom view and map layers
    // @type {any}
    options: any = {};

    // store markers location.
    // @type {Marker<any>[]}
    layers = [];

    // vehicle ID obtained from route params
    // @type {number}
    vehicleId: number;

    // vehicle information in array of key pair value format
    // use for VerticleDetailsComponent
    // @type {any[]}
    vehicle: any[];

    constructor(private vehicleService: VehicleService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: NbToastrService) {

    }

    ngOnInit() {

        this.route.paramMap.subscribe(paramMap => {
            // get vehicle id from route params
            this.vehicleId = parseInt(paramMap.get('id'));
            this.initailDetails();
        });
        this.options = {
            layers: [
                tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
            ],
            // default close prefecture view 
            zoom: 4,
            // Default maps center "tokyo"
            center: latLng(35.7251283, 139.8591726)
        }


    }

    // the method request to Backend API to get vehicle information by vehicle id
    // then mapping obtained response to key sources to display on VerticleDetailsComponent,
    // next update marker layers.
    // @return {void}
    initailDetails() {
        this.vehicleService.getVehicles().subscribe(vehicles => {
            const vehicle = vehicles.filter(x => x.id == this.vehicleId)[0]
            if (vehicle) {
                this.vehicle = [
                    {
                        key: 'ID',
                        value: vehicle.id
                    },
                    {
                        key: $localize`:@@plateNumber:`,
                        value: vehicle.plateNumber
                    },
                    {
                        key:  $localize`:@@scanCode:`,
                        value: vehicle.scanCode
                    },
                    {
                        key: $localize`:@@groupName:`,
                        value: vehicle.groupName
                    },
                    {
                        key: $localize`:@@tcpServerAddress:`,
                        value: vehicle.tcpServerAdress
                    },
                    {
                        key: $localize`:@@tcpStreamOutPort:`,
                        value: vehicle.tcpStreamOutPort
                    },
                    {
                        key:  $localize`:@@updServerAddress:`,
                        value: vehicle.udpServerAddress
                    },
                    {
                        key:  $localize`:@@updStreamOutPort:`,
                        value: vehicle.udpStreamOutPort
                    },
                    {
                        key:  $localize`:@@status:`,
                        value: vehicle.isOnline
                        ? '<i class="fas fa-circle device-online"></i> ' + $localize`:@@online:`
                        : '<i class="fas fa-circle"></i> ' + $localize`:@@offline:`
                    },
                    {
                        key: $localize`:@@active:`,
                        value: vehicle.isActive
                    },
                    {
                        key: $localize`:@@deviceType:`,
                        value: vehicle.deviceType
                    },
                    {
                        key: $localize`:@@networkType:`,
                        value: this.getNetworkType(vehicle.networkType)
                    }
                ];
                this.layers = [
                    marker([
                        parseFloat(vehicle.location.lat),
                        parseFloat(vehicle.location.lng)
                    ])
                ];
            }
            else {
                this.router.navigate([`404`]);
            }
        }, error => {
            const status = 'danger';
            this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:` , { status });
        });
    }

    // mapping network type's display text from enum value
    // @parameter type {enum NetworkType}
    // @return {string}
    private getNetworkType(type: NetworkType) {
        switch (type) {
            case NetworkType.LAN : return 'LAN';
            case NetworkType.WIFI : return 'WIFI';
            case NetworkType.THREE_G : return '3G';
            case NetworkType.FOUR_G_LTE : return '4G/LTE';
            default : return $localize`:@@others:`;
        }
    }
}
