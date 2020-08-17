import { NgModule } from '@angular/core';
import { NbCardModule, NbSpinnerModule, NbTabsetModule, NbRouteTabsetModule, NbIconModule, NbButtonModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EventdataComponent } from './eventdata/eventdata.component';
import { EventDetailsContainerComponent } from './eventdata/eventdetails/event-details-container/event-details-container.component';
import { EventMapComponent } from './eventdata/eventdetails/eventmap/event-map/event-map.component';
import { EventVideoComponent } from './eventdata/eventdetails/eventvideo/event-video/event-video.component';
import { EventListComponent } from './eventdata/eventdetails/eventlist/event-list/event-list.component';
import { IconLinkPrepartionComponent } from './eventdata/icon-link-preparation/icon-link-preparation.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbSpinnerModule,
    NbRouteTabsetModule,
    LeafletModule,
    NbTabsetModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule

  ],
  declarations: [
      EventdataComponent,
      EventDetailsContainerComponent,
      EventMapComponent,
      EventVideoComponent,
      EventListComponent,
      IconLinkPrepartionComponent
  ],
})
export class DeviceModule {
}
