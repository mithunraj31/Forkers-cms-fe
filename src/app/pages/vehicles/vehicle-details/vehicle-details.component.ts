import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker } from 'leaflet';
import { VehicleService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../../@core/entities/vehicle.model';
import { NetworkType } from '../../../@core/enums/enum.network-type';

@Component({
    selector: 'frk-vehicle-details',
    styleUrls: ['./vehicle-details.component.scss'],
    templateUrl: './vehicle-details.component.html',
})
export class VehiclesDetailsComponent implements OnInit {

    options: any = {};
    layers = [];

    vehicleId: number;

    vehicle: any[];

    constructor(private vehicleService: VehicleService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {

        this.route.paramMap.subscribe(paramMap => {
            this.vehicleId = parseInt(paramMap.get('id'));
            this.initailDetails();
        });
        this.options = {
            layers: [
                tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
            ],
            zoom: 11,
            center: latLng(35.7251283, 139.8591726)
            //center: latLng(35.7251283,139.8591726)
        }


    }

    initailDetails() {

        this.vehicleService.getVehicleById(this.vehicleId).subscribe(response => {
            if (response) {
                this.vehicle = [
                    {
                        key: 'ID',
                        value: response.id
                    },
                    {
                        key: 'Plate number',
                        value: response.plateNumber
                    },
                    {
                        key: 'scan code',
                        value: response.scanCode
                    },
                    {
                        key: 'Group Name',
                        value: response.groupName
                    },
                    {
                        key: 'TCP server address',
                        value: response.tcpServerAdress
                    },
                    {
                        key: 'TCP stream out port',
                        value: response.tcpStreamOutPort
                    },
                    {
                        key: 'UPD server address',
                        value: response.udpServerAddress
                    },
                    {
                        key: 'UPD stream out port',
                        value: response.udpStreamOutPort
                    },
                    {
                        key: 'Online status',
                        value: response.isOnline
                        ? '<i class="fas fa-circle device-online"></i> Online'
                        : '<i class="fas fa-circle"></i> Offline'
                    },
                    {
                        key: 'Active',
                        value: response.isActive
                    },
                    {
                        key: 'Device type',
                        value: response.deviceType
                    },
                    {
                        key: 'Network type',
                        value: this.getNetworkType(response.networkType)
                    }
                ];
                this.layers = [
                    marker([
                        parseFloat(response.location.lat),
                        parseFloat(response.location.lng)
                    ])
                ];
            }
        }, error => {

        });
    }

    private getNetworkType(type: NetworkType) {
        console.log(type)
        switch (type) {
            case NetworkType.LAN : return 'LAN';
            case NetworkType.WIFI : return 'WIFI';
            case NetworkType.THREE_G : return '3G';
            case NetworkType.FOUR_G_LTE : return '4G/LTE';
            default : return 'Others';
        }
    }
}
