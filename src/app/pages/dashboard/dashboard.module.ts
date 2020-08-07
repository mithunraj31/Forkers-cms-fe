import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbSpinnerModule, NbButtonModule, NbFormFieldModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardStatisticPieComponent } from './statistic-pie/statistic-pie.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardLegendChartComponent } from './legend-chart/legend-chart.component';
import { DashboardMapsViewComponent } from './dashboard-maps-view/dashboard-maps-view.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AddCameraDialogComponent } from './dialogs/add-camera-dialog/add-camera-dialog.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NgxEchartsModule,
    NbListModule,
    NbSpinnerModule,
    LeafletModule,
    NbButtonModule,
    NbFormFieldModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardStatisticPieComponent,
    DashboardLegendChartComponent,
    DashboardMapsViewComponent,
    AddCameraDialogComponent
  ],
})
export class DashboardModule { }
