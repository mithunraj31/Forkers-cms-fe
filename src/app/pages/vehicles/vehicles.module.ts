import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbListModule, NbSpinnerModule, NbTabsetModule, NbRouteTabsetModule } from '@nebular/theme';

import { VehiclesComponent } from './vehicles.component';
import { VehiclesTableViewComponent } from './vehicles-table-view/vehicles-table-view.component';
import { VehiclesMapsViewComponent } from './vehicles-maps-view/vehicles-maps-view.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbSpinnerModule,
    NbRouteTabsetModule
  ],
  declarations: [
    VehiclesComponent,
    VehiclesTableViewComponent,
    VehiclesMapsViewComponent
  ],
})
export class VehiclesModule {
}
