import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Event } from '../@core/entities/event.model'
import { of } from 'rxjs';
import { EventSummary } from '../@core/entities/event-summary.model';


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
                        return <Event>{ ...x };
                    });

                    return mappedEvents
                }

                throw new Error();
            }));
    }

    getEventById(eventId: string) {
        return this.http.get<any>(`${this.host}/event/:eventId`)
            .pipe(map(response => {
                if (response?.events) {
                    const eventResponse = response.events as any[];
                    // mapping json response to array of object
                    const events = eventResponse.map(x => {
                        return <Event>{ ...x };
                    });

                    return events
                }

                throw new Error();
            }));

    }

    getEventSummary() {
        return of(<EventSummary>{
            total: 20,
            acceleration: 10,
            deacceleration: 7,
            suddenHandle: 3,
            accident: 0
        }).pipe(delay(1000))
    }
}
