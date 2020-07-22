import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardStatisticPieComponent } from './statistic-pie/statistic-pie.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NgxEchartsModule,
    NbListModule,
    NbSpinnerModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardStatisticPieComponent
  ],
})
export class DashboardModule { }
