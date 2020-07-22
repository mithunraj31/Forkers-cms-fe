import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Company } from '../@core/entities/compay.model';



// Company infomation management
@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    host = environment.host;

    constructor(private http: HttpClient) { 
    }

    //retrive company information listings and include vehicle's status
    getCompanies() {
        return this.http.get<any>(`${this.host}/customer/status/`)
        .pipe(map(response => {
            if (response?.message == 'Success' 
            && response?.customers) {
                const customersResponse = response.customers as any[];
                // mapping json response to array of object
                const customers = customersResponse.map(x => {
                    return <Company> { ...x };
                });

                return customers
            }

            throw new Error();
        }));
    }
}
