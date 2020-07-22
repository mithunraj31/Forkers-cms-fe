import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, delay } from 'rxjs/operators';
import {Event} from '../@core/entities/event.model'
import { of } from 'rxjs';


// Event infomation management
@Injectable({
    providedIn: 'root'
})
export class EventService {
    host = environment.host;

    constructor(private http: HttpClient) { }

 //retriveEvent information listings from Backend API
    getEvent(companyName?: string) {

        let queryString: string = '';
        if (companyName) {
            queryString = `?stk_user=${companyName}`;
        }
        return this.http.get<any>(`${this.host}/event${queryString}`)
        .pipe(map(events => {
            if (events) {

                // mapping json response to array of object
                const mappedEvents = events.map(x => {
                    return <Event> { ...x };
                });

                return mappedEvents
            }

            throw new Error();
        }));
    }

    getEventById(eventId: string) {
        return this.http.get<Event>(`${this.host}/event/${eventId}`)
    }

  
}
