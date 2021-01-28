import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbSpinnerModule, NbTabsetModule, NbRouteTabsetModule, NbButtonModule, NbListModule, NbIconModule } from '@nebular/theme';

import { VehiclesComponent } from './vehicles.component';
import { VehiclesTableViewComponent } from './vehicles-table-view/vehicles-table-view.component';
import { VehiclesMapsViewComponent } from './vehicles-maps-view/vehicles-maps-view.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { VehiclesDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehiclesStatisticsViewComponent } from './vehicles-statistics-view/vehicles-statistics-view.component';
import { CameraDetailsComponent } from './camera-details/camera-details.component';
import { VehiclesGoogleMapViewComponent } from './vehicles-maps-view/vehicles-google-map-view/vehicles-google-map-view.component';
import { HereMapComponent } from './vehicles-maps-view/vehicles-here-map-view/here-map/here-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbSpinnerModule,
    NbRouteTabsetModule,
    LeafletModule,
    NbButtonModule,
    NbListModule,
    NbIconModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  declarations: [
    VehiclesComponent,
    VehiclesTableViewComponent,
    VehiclesMapsViewComponent,
    VehiclesDetailsComponent,
    VehiclesStatisticsViewComponent,
    CameraDetailsComponent,
    VehiclesGoogleMapViewComponent,
    HereMapComponent,
  ],
})
export class VehiclesModule {
}
