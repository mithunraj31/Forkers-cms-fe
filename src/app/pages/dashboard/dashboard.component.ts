import { Component, OnInit } from '@angular/core';
import { VehicleService, DashboardService } from '../../services';
import { LegendItemModel } from '../../@core/entities/legend-item.model';
import { NgxLegendItemColor } from '../../@core/enums/enum.legend-item-color';
import { NbToastrService } from '@nebular/theme';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventSummary } from '../../@core/entities/event-summary.model';

@Component({
  selector: 'frk-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  // number of online vehicle
  // use to display on little card in dashboard 
  // obtain data from backend API when the component initializing.
  // @type {number} default with 0
  onlineVehicle: number = 0;

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


  // use for config UI of ng2-smart-table
  // @type {any}
  tableSettings: any = {};

  // the property binding to display event infomation listings table.
  // @type {Event[]}
  listings: Event[] = [];

  eventSummary: EventSummary = null;

  lengends: {
    acceleration: LegendItemModel[];
    deacceleration: LegendItemModel[];
    suddenHandle: LegendItemModel[];
    accident: LegendItemModel[];
  };

  constructor(private vehicleService: VehicleService,
    private dashboardService: DashboardService,
    private eventService: EventService,
    private router: Router,
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

    this.tableSettings = {
      // hide create, update, and delete row buttons from ng2-smart-table
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      // hide filter row
      hideSubHeader: true,
      // the property contains column configurations.
      columns: {
        time: {
          title: $localize`:@@datetime:`,
          filter: false,
          valuePrepareFunction: (time: string) => {
            return moment(time).format('YYYY/MM/DD');
          },
        },
        userName: {
          title: $localize`:@@company:`,
          filter: false,
        },
        deviceId: {
          title: $localize`:@@DeviceId:`,
          filter: false,
        },
        type: {
          title: $localize`:@@type:`,
          // data feild can add html element
          filter: false,
          // mapping nested property of user data to display  type of device
          valuePrepareFunction: (type: number) => {
            return type;
          },
        }
      }
    };

    this.lengends = {
      acceleration:[
        {
          iconColor: NgxLegendItemColor.YELLOW,
          title: $localize`:@@acceleration:`,
        },
        {
          iconColor: NgxLegendItemColor.GREEN,
          title: $localize`:@@all:`,
        },
      ],
      deacceleration: [
        {
          iconColor: NgxLegendItemColor.YELLOW,
          title: $localize`:@@deacceleration:`,
        },
        {
          iconColor: NgxLegendItemColor.GREEN,
          title: $localize`:@@all:`,
        },
      ],
      suddenHandle: [
        {
          iconColor: NgxLegendItemColor.YELLOW,
          title: $localize`:@@suddenHandle:`,
        },
        {
          iconColor: NgxLegendItemColor.GREEN,
          title:  $localize`:@@all:`,
        },
      ],
      accident: [
        {
          iconColor: NgxLegendItemColor.YELLOW,
          title: $localize`:@@accident:`,
        },
        {
          iconColor: NgxLegendItemColor.GREEN,
          title: $localize`:@@all:`,
        },
      ],
    };
  }

  ngOnInit() {
    // HTTP request to get number of online device.
    this.vehicleService.getOnlineVehicle()
      .subscribe(numberOfOnlineVehicle => {
        this.onlineVehicle = numberOfOnlineVehicle;
      }, this.httpServiceErrorHandler(this.toastrService));

    // HTTP request to get online status according to selected period
    this.getOnlineVehicleStatus(this.selectedNumberOfDays);

    this.eventService.getEvent().subscribe(event => {
      this.listings = event.slice(0, 10);
    }, this.httpServiceErrorHandler(this.toastrService));

    this.eventService.getEventSummary().subscribe(summary => {
      this.eventSummary = summary;
    }, this.httpServiceErrorHandler(this.toastrService));

  }

  // the method will trigger when user selected new period option or component initializing.
  // then HTTP request to backend to get statistic data and format data before send to PeriodAnalyticsChartComponent
  private getOnlineVehicleStatus(days: number) {
    this.vehicleService.getOnlineVehicleStatus(days)
      .subscribe(data => {
        this.displayData = this.dashboardService.convertOnlineStatusToChartData(days, data);
      }, error => {
        const status = 'danger';
        this.toastrService.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:`, { status });
      });
  }

  // the method trigger when user select new period option
  // then will pass selected data from PeriodAnalyticsChartComponent to the method.
  onStatusPeriodChange($event) {
    this.selectedNumberOfDays = $event;
    this.getOnlineVehicleStatus(this.selectedNumberOfDays);
  }

  private httpServiceErrorHandler(service: NbToastrService) {
    return () => {
      const status = 'danger';
      service.show($localize`:@@tryRefreshPage:`, $localize`:@@somethingWrongToaster:`, { status });
    };
  }
}
