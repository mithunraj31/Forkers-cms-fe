
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OnlineStatus } from '../@core/entities/online-status.model';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }

    convertOnlineStatusToChartData(days: number, data: OnlineStatus[]): any {
        if (days == 1) {
            return data.map(x => {
                return {
                    label: `${x.days} ${x.hour}:00`,
                    value: x.online
                };
            });
        } else  {
            let dayRange = this.getDateRange(days);
            dayRange.forEach(day => {
                if (data.some(x => x.days == day.label)) {
                    day.value = data.find(x =>  x.days == day.label).online;
                }
            });

            if (days == 30) {
                const filters = this.getOneMonthChartLabelFilter();
                dayRange = this.filterChartLabel(dayRange, filters);
            } else if (days == 90) {
                const filters = this.getMonthChartLabelFilter(90, 3);
                dayRange = this.filterChartLabel(dayRange, filters);
            } else if (days == 180) {
                const filters = this.getMonthChartLabelFilter(180, 5);
                dayRange = this.filterChartLabel(dayRange, filters);
            } else if (days == 360) {
                const filters = this.getMonthChartLabelFilter(360, 10);
                dayRange = this.filterChartLabel(dayRange, filters);
            }

            return dayRange;
        } 
    }

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

    private filterChartLabel(dayRange, filters) {
        const filteredData = [];

        for (let i: number; i < filters.length; i++) {
            const filter = filters[i];
            const day = dayRange[filter.index];
            day.label = filter.hasLabel ? day.label : '';
            filteredData.push(day);
        }

        return filteredData;
    }

    private getOneMonthChartLabelFilter() {
        const oneMonth = [];
        for (let i:number = 0; i < 30; i ++)  {
            oneMonth.push({
                index: i,
                hasLabel: i % 3 == 0 
            });
        }
        return oneMonth;
    }

    private getMonthChartLabelFilter(days: number, step: number) {
        const month = [];
        let hasLabel = true;
        for (let i:number = 0; i < days; i += step)  {
            month.push({
                index: i,
                hasLabel: hasLabel
            });

            hasLabel = !hasLabel;
        }
        return month;
    }
}
