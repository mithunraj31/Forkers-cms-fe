import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbListModule,
    NbSpinnerModule,
    NgxEchartsModule
  ],
  declarations: [
    DashboardComponent
  ],
})
export class DashboardModule { }
