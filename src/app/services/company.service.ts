import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Company } from '../@core/entities/compay.model';


// Company infomation management
@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    host = environment.host;

    constructor(private http: HttpClient) { }

    //retrive company information listings and include vehicle's status
    getCompanies() {
        return of({
            updateDate: new Date(),
            companies: [
                <Company> {
                    "id": 1,
                    "name": "Company A",
                    "totalVehicle": 100,
                    "runningVehicle": 87
                },
                <Company> {
                    "id": 2,
                    "name": "Company B",
                    "totalVehicle": 15,
                    "runningVehicle": 2
                },
                <Company> {
                    "id": 3,
                    "name": "Company C",
                    "totalVehicle": 57,
                    "runningVehicle": 56
                },
            ]
        }).pipe(delay(3000));
    }
}
