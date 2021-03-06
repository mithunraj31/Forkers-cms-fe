import { Component, OnInit } from '@angular/core';
import { VehicleService, DashboardService } from '../../../services';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LegendItemModel } from '../../../@core/entities/legend-item.model';
import { NgxLegendItemColor } from '../../../@core/enums/enum.legend-item-color';

@Component({
  selector: 'frk-vehicles-statistics-view',
  styleUrls: ['./vehicles-statistics-view.component.scss'],
  templateUrl: './vehicles-statistics-view.component.html',
})
export class VehiclesStatisticsViewComponent implements OnInit {

  // online statistics chart's period (days range)
  // when user select dropdown the value will change according selected value.
  // then attach the value to HTTP request to get online statistics from backend API
  // @type {number} 30 (1 month)
  selectedNumberOfDays = 30;

  // store formatted online statistics data
  // the data will obtain after format raw data from backend API
  displayData: { label: string, value: number }[];

  // period range for PeriodAnalyticsChartComponent 
  // will display to dropdown options.
  onlineStatusGraphSelectionLabels: { title: string, value: number }[];

  // PeriodAnalyticsChartComponent label for explain what is displaying data
  chartLegend: LegendItemModel;

  constructor(private vehicleService: VehicleService,
    private dashboardService: DashboardService,
    private toastrService: NbToastrService) {
    this.onlineStatusGraphSelectionLabels = [
      {
        title: $localize`:@@oneDay:`,
        value: 1
      },
      {
        title: $localize`:@@oneWeek:`,
        value: 7
      },
      {
        title: $localize`:@@oneMonth:`,
        value: 30
      },
      {
        title: $localize`:@@threeMonth:`,
        value: 90
      },
      {
        title: $localize`:@@sixMonth:`,
        value: 180
      }, {
        title: $localize`:@@oneYear:`,
        value: 360
      }
    ];

    this.chartLegend = {
      iconColor: NgxLegendItemColor.BLUE,
      title: $localize`:@@onlineVehicle:`
    };
  }

  ngOnInit() {
    // HTTP request to get online status according to selected period
    this.getOnlineVehicleStatus(this.selectedNumberOfDays);
  }

  // the method will trigger when user selected new period option or component initializing.
  // then HTTP request to backend to get statistic data and format data before send to PeriodAnalyticsChartComponent
  onStatusPeriodChange($event) {
    this.selectedNumberOfDays = $event;
    this.getOnlineVehicleStatus(this.selectedNumberOfDays);
  }

  // the method trigger when user select new period option
  // then will pass selected data from PeriodAnalyticsChartComponent to the method.
  private getOnlineVehicleStatus(days: number) {
    this.vehicleService.getOnlineVehicleStatus(days)
      .subscribe(data => {
        this.displayData = this.dashboardService.convertOnlineStatusToChartData(days, data);
      }, error => {
        const status = 'danger';
        this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:`, { status });
      });
  }


}
 