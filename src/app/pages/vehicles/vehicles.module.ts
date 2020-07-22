import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbSpinnerModule, NbTabsetModule, NbRouteTabsetModule } from '@nebular/theme';

import { VehiclesComponent } from './vehicles.component';
import { VehiclesTableViewComponent } from './vehicles-table-view/vehicles-table-view.component';
import { VehiclesMapsViewComponent } from './vehicles-maps-view/vehicles-maps-view.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { VehiclesDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehiclesStatisticsViewComponent } from './vehicles-statistics-view/vehicles-statistics-view.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbSpinnerModule,
    NbRouteTabsetModule,
    LeafletModule
  ],
  declarations: [
    VehiclesComponent,
    VehiclesTableViewComponent,
    VehiclesMapsViewComponent,
    VehiclesDetailsComponent,
    VehiclesStatisticsViewComponent
  ],
})
export class VehiclesModule {
}
