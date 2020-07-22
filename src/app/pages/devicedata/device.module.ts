import { NgModule } from '@angular/core';
import { NbCardModule, NbSpinnerModule, NbTabsetModule, NbRouteTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EventdataComponent } from './eventdata/eventdata.component';
import { EventDetailsContainerComponent } from './eventdata/eventdetails/event-details-container/event-details-container.component';
import { EventMapComponent } from './eventdata/eventdetails/eventmap/event-map/event-map.component';
import { EventVideoComponent } from './eventdata/eventdetails/eventvideo/event-video/event-video.component';
import { EventListComponent } from './eventdata/eventdetails/eventlist/event-list/event-list.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbSpinnerModule,
    NbRouteTabsetModule,
    LeafletModule,
    NbTabsetModule,

  ],
  declarations: [
      EventdataComponent,
      EventDetailsContainerComponent,
      EventMapComponent,
      EventVideoComponent,
      EventListComponent,
  ],
})
export class DeviceModule {
}