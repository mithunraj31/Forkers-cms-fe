import { Component, OnInit } from '@angular/core';
import { VehicleService, DashboardService } from '../../services';
import { OnlineStatus } from '../../@core/entities/online-status.model';

@Component({
  selector: 'frk-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  onlineVehicle: number = 0;
  selectedNumberOfDays = 30;
  displayData: { label: string, value: number } [];
  onlineStatusGraphSelectionLabels: { title: string, value: number }[];

  constructor(private vehicleService: VehicleService,
    private dashboardService: DashboardService) {
    this.onlineStatusGraphSelectionLabels = [
      {
        title: $localize`:@oneDay:`,
        value: 1
      },
      {
        title: $localize`:@oneWeek:`,
        value: 7
      },
      {
        title: $localize`:@oneMonth:`,
        value: 30
      },
      {
        title: $localize`:@threeMonth:`,
        value: 90
      },
      {
        title: $localize`:@sixMonth:`,
        value: 180
      },{
        title: $localize`:@oneYear:`,
        value: 360
      }
    ];
  }

  ngOnInit() {
    this.vehicleService.getOnlineVehicle()
      .subscribe(numberOfOnlineVehicle => {
        this.onlineVehicle = numberOfOnlineVehicle;
      }, error => {

      });
    this.getOnlineVehicleStatus(this.selectedNumberOfDays);

  }

  private getOnlineVehicleStatus(days: number) {
    this.vehicleService.getOnlineVehicleStatus(days)
      .subscribe(data => {
        this.displayData = this.dashboardService.convertOnlineStatusToChartData(days, data);
      }, error => {

      });
  }

  onStatusPeriodChange($event) {
    this.selectedNumberOfDays = $event;
    this.getOnlineVehicleStatus(this.selectedNumberOfDays);
  }
}
