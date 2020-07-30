import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardStatisticPieComponent } from './statistic-pie/statistic-pie.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardLegendChartComponent } from './legend-chart/legend-chart.component';
import { DashboardMapsViewComponent } from './dashboard-maps-view/dashboard-maps-view.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NgxEchartsModule,
    NbListModule,
    NbSpinnerModule,
    LeafletModule
  ],
  declarations: [
    DashboardComponent,
    DashboardStatisticPieComponent,
    DashboardLegendChartComponent,
    DashboardMapsViewComponent
  ],
})
export class DashboardModule { }
