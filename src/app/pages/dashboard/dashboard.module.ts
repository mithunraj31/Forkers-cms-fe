import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbListModule,
    NbSpinnerModule,

  ],
  declarations: [
    DashboardComponent
  ],
})
export class DashboardModule { }
