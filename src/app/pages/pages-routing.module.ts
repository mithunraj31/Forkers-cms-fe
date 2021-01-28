import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompaniesComponent } from './companies/companies.companent';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehiclesTableViewComponent } from './vehicles/vehicles-table-view/vehicles-table-view.component';
import { VehiclesMapsViewComponent } from './vehicles/vehicles-maps-view/vehicles-maps-view.component';
import { VehiclesDetailsComponent } from './vehicles/vehicle-details/vehicle-details.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { VehiclesStatisticsViewComponent } from './vehicles/vehicles-statistics-view/vehicles-statistics-view.component';
import { EventdataComponent } from './devicedata/eventdata/eventdata.component';
import { EventDetailsContainerComponent } from './devicedata/eventdata/eventdetails/event-details-container/event-details-container.component';
import { EventVideoComponent } from './devicedata/eventdata/eventdetails/eventvideo/event-video/event-video.component';
import { EventMapComponent } from './devicedata/eventdata/eventdetails/eventmap/event-map/event-map.component';
import { EventListComponent } from './devicedata/eventdata/eventdetails/eventlist/event-list/event-list.component';
import { VehiclesGoogleMapViewComponent } from './vehicles/vehicles-maps-view/vehicles-google-map-view/vehicles-google-map-view.component';
import { HereMapComponent } from './vehicles/vehicles-maps-view/vehicles-here-map-view/here-map/here-map.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate : [AuthGuard]
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
      canActivate : [AuthGuard]
    },
    {
      path: 'companies',
      component: CompaniesComponent,
      canActivate : [AuthGuard],
      data: {
        role: 'ROLE_ADMIN'
      }
    },
    {
      path: 'vehicles',
      component: VehiclesComponent,
      children: [
        {
          path: '',
          redirectTo: 'table',
          pathMatch: 'full',
          canActivate : [AuthGuard],
        },
        {
          path: 'table',
          component: VehiclesTableViewComponent,
          canActivate : [AuthGuard],
        },
        {
          path: 'maps',
          component: VehiclesMapsViewComponent,
          canActivate : [AuthGuard],
        },
        {
          path: 'google/maps',
          component: VehiclesGoogleMapViewComponent,
          canActivate : [AuthGuard],
        },
        {
          path: 'here/maps',
          component: HereMapComponent,
          canActivate : [AuthGuard],
        },
        {
          path: 'statistics',
          component: VehiclesStatisticsViewComponent,
          canActivate : [AuthGuard],
        }
      ]
    },
    {
      path: 'vehicles/:id',
      component: VehiclesDetailsComponent,
      canActivate : [AuthGuard],
    },
    {
      path:'devices/events',
      component:EventdataComponent,
      canActivate:[AuthGuard],

    },
    {
      path:'devices/events/company/:companyName',
      component:EventdataComponent,
      canActivate:[AuthGuard],

    },
    {
      path: 'devices/events/:eventId',
      component: EventDetailsContainerComponent,
      children: [
        {
          path: '',
          redirectTo: 'details',
          pathMatch: 'full',
          canActivate : [AuthGuard],
        },
        {
          path: 'details',
          component: EventListComponent,
          canActivate : [AuthGuard],
        },
        {
          path: 'maps',
          component: EventMapComponent,
          canActivate : [AuthGuard],
        },
        {
          path: 'videos',
          component: EventVideoComponent,
          canActivate : [AuthGuard],
        }
      ]
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
