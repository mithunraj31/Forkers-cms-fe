import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Vehicle } from '../@core/entities/vehicle.model';


// Vehicle infomation management
@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    host = environment.host;

    constructor(private http: HttpClient) { }

    //retriveVehicle information listings from Backend API
    getVehicles() {
        return of({
            updateDate: new Date(),
            total: 3,
            vehicles: [
                <Vehicle>{
                    "id": 1806270003,
                    "isOnline": false,
                    "isActive": true,
                    "location": {
                        "lat": "35.6469619",
                        "lng": "139.7438105"
                    }
                },
                <Vehicle>{
                    "id": 1806110011,
                    "isOnline": true,
                    "isActive": true,
                    "location": {
                        "lat": "35.7751997",
                        "lng": "139.6887966"
                    }
                },
                <Vehicle>{
                    "id": 1806110013,
                    "isOnline": true,
                    "isActive": true,
                    "location": {
                        "lat": "35.6105337",
                        "lng": "139.6438215"
                    }
                },
            ]
        }).pipe(delay(1000));
    }

    // retrive one vehicle information
    // find by vehicle id 
    getVehicleById(vehicleId: number) {
        const vehicles = [
            <Vehicle>{
                "id": 1806270003,
                "isOnline": false,
                "isActive": true,
                "location": {
                    "lat": "35.6469619",
                    "lng": "139.7438105"
                },
                "plateNumber": "1806110013",
                "deviceType": "DV426",
                "networkType": 1
            },
            <Vehicle>{
                "id": 1806110011,
                "isOnline": true,
                "isActive": true,
                "location": {
                    "lat": "35.7751997",
                    "lng": "139.6887966"
                },
                "plateNumber": "1806110013",
                "deviceType": "DV426",
                "networkType": 3
            },
            <Vehicle>{
                "id": 1806110013,
                "isOnline": true,
                "isActive": true,
                "location": {
                    "lat": "35.6105337",
                    "lng": "139.6438215"
                },
                "plateNumber": "1806110013",
                "deviceType": "DV426",
                "networkType": 2
            },
        ];
        return of(vehicles.find(x => x.id == vehicleId)).pipe(delay(1000));
    }
}
