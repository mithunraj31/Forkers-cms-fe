import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { OnlineStatus } from '../@core/entities/online-status.model';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    host = environment.host;

    constructor(private http: HttpClient) { }

    // convert raw data from backend API to PeriodAnalyticsChartComponent.chartData format.
    convertOnlineStatusToChartData(days: number, data: OnlineStatus[]): any {
        // if the day range is only one day will convert to hourly format
        if (days == 1) {
            return data.map(x => {
                return {
                    label: `${x.day} ${x.hour}:00`,
                    value: x.online
                };
            });
        } else  {
            let dayRange = this.getDateRange(days);
            
            // raw data contain only existing data 
            // so the statement will generate missing day and assign 0 to online value
            dayRange = dayRange.map(day => {
                if (data.some(x => x.day == day.label)) {
                    
                    day.value = data.find(x =>  x.day == day.label).online;
                }
                return day;
            });

            return dayRange;
        } 
    }

    // generate array of day range 
    // ex. today is 2020/07/15
    // input is 10
    // output should be [ { lalbel: '2020-7-15' }, { lalbel: '2020-7-14' }, { lalbel: '2020-7-13' }, { lalbel: '2020-7-12' }, ..., { lalbel: '2020-7-6' }  ]
    private getDateRange(days: number) {
        const dayListings = [];
        for (let i:number = 0; i < days; i++) {
            dayListings.push({
                label: moment().add(-i, 'days').format('YYYY-MM-DD'),
                value: 0
            });
        }

        return dayListings;
    }
}
