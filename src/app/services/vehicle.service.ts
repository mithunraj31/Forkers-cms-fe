import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Vehicle } from '../@core/entities/vehicle.model';
import { OnlineStatus } from '../@core/entities/online-status.model';
import { Camera } from '../@core/entities/camera.model';


// Vehicle infomation management
@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    host = environment.host;
    cameraId:number;
    constructor(private http: HttpClient) { }

    //retriveVehicle information listings from Backend API
    getVehicles(username?: string) {
        let queryParams = '';
        if (username) {
            queryParams = `?customer=${username}`;
        }
        return this.http.get<any>(`${this.host}/vehicle${queryParams}`)
        .pipe(map(response => {
            if (response?.vehicles) {
                const vehiclesResponse = response.vehicles as any[];
                // mapping json response to array of object
                const vehicles = vehiclesResponse.map(x => {
                    return <Vehicle> { ...x };
                });

                return vehicles
            }

            throw new Error();
        }));
    }

    // retrive one vehicle information
    // find by vehicle id 
    getVehicleById(vehicleId: number) {
        return this.http.get<any>(`${this.host}/vehicle/${vehicleId}`)
        .pipe(map(response => {
            if (response?.vehicle) {
                // mapping json response to Vehicle object
                return <Vehicle> { ...response?.vehicle }
            }

            throw new Error();
        }));
    }

    // get number of online vehicle from backend API.
    getOnlineVehicle() {
        return this.http.get<any>(`${this.host}/vehicle/online`)
        .pipe(map(response => {
            if (response) {
                return response;
            }

            throw new Error();
        }));
    }

    // get online statistics from backend API
    // @parameter days: day range from x day to now
    getOnlineVehicleStatus(days: number) {
        return this.http.get<any>(`${this.host}/vehicle/online/summary?days=${days}`)
        .pipe(map(response => { 
            if (response?.reports) {
                const reportsResponse = response.reports as any[];

                // mapping json response to array of object
                const reports = reportsResponse.map(x => {
                    return <OnlineStatus> { ...x };
                });
                return reports;
            }

            throw new Error();
        }));
    }

      // retrive one camera information
    // find by vehicle id 
    getCameraDataById(vehicleId: number) {
    
       // return this.http.get<any>(`${this.host}/vehicle/${vehicleId}`)
        return this.http.get<any>( '/home/mithunraj/Documents/angular/FORKERS-CMS-FE/src/assets/data/foreccast.json')
        .pipe(map(response => {
            if (response) {
                console.log(response)

                // mapping json response to array of object
                const mappedEvents = response.map(x => {
                    return <Camera>{ ...x };
                });

                return mappedEvents
            }
            throw new Error();
        }));
    }

    // save one camera information
    saveCamera(vehicleId: number,camera: Camera) {
         return this.http.post<Camera>(`${this.host}/vehicle/${vehicleId}/camera`,camera)
     }

       // update one camera information
    updateCamera(vehicleId: number,camera: Camera) {
        this.cameraId=camera.id;
        return this.http.put<Camera>(`${this.host}/vehicle/${vehicleId}/camera/${this.cameraId}`,camera)
    }
   // delete one camera information
   deleteCamera(vehicleId: number,cameraId: number) {
    return this.http.delete<Camera>(`${this.host}/vehicle/${vehicleId}/camera/${cameraId}`)
}

}
