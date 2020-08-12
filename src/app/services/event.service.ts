import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Event } from '../@core/entities/event.model'
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
        return this.http.get<any>(`${this.host}/event/${eventId}`)
            .pipe(map(response => {
                if (response) {
                    return <Event>{ ...response };
                }

                throw new Error();
            }));

    }

    getEventSummary() {

        return this.http.get<any>(`${this.host}/event/stat`)
            .pipe(map(response => {
                if (response) {
                    // mapping json response to array of object
                    return <EventSummary> {
                        acceleration: response.accelerate,
                        deacceleration: response.decelerate,
                        accident: response.impact,
                        suddenHandle: parseInt(response.turnLeft) + parseInt(response.turnRight),
                        total: response.total
                    };
                }

                throw new Error();
            }));
    }

    getEventTypeName(type: number) {

        switch (type) {
          case 0:
            return $localize`:@@Manual:`;
          case 1:
            return $localize`:@@Time:`;
          case 2:
            return $localize`:@@Motion:`;
          case 3:
            return $localize`:@@Speed:`;
          case 4:
            return $localize`:@@Gsensor:`;
          case 5:
            return $localize`:@@Temperature:`;
          case 6:
            return $localize`:@@Alaram:`;
          case 7:
            return $localize`:@@Alaram:`;
          case 8:
            return $localize`:@@Alaram:`;
          case 9:
            return $localize`:@@Alaram:`;
          case 10:
            return $localize`:@@Alaram:`;
          case 11:
            return $localize`:@@Alaram:`;
          case 12:
            return $localize`:@@Alaram:`;
          case 13:
            return $localize`:@@Alaram:`;
          case 14:
            return $localize`:@@Button:`;
          case 15:
            return $localize`:@@RFID:`;
          case 16:
            return $localize`:@@Accelerate:`;
          case 17:
            return $localize`:@@Deceleration:`;
          case 18:
            return $localize`:@@TurnAngle:`;
          case 19:
            return $localize`:@@TurnGyroscope:`;
          case 20:
              return $localize`:@@Impact:`;
          case 21:
            return $localize`:@@TurnLeft​:`;
          case 22:
            return $localize`:@@TurnRight:`;
          case 23:
            return $localize`:@@clip:`;
          default:
            return $localize`:@@none:`;
        } 
      }
}
