import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbListModule, NbSpinnerModule } from '@nebular/theme';

import { CompaniesComponent } from './companies.companent';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbListModule,
    NbSpinnerModule,
  ],
  declarations: [
    CompaniesComponent,
  ],
})
export class CompaniesModule {
}
