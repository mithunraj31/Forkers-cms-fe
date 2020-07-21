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
import { EventdataComponent } from './devicedata/eventdata/eventdata.component';
import { EventDetailsContainerComponent } from './devicedata/eventdata/eventdetails/event-details-container/event-details-container.component';
import { RegulardataComponent } from './devicedata/regulardata/regulardata/regulardata.component';
import { RegularDetailsContainerComponent } from './devicedata/regulardata/regular-details/regular-details-container/regular-details-container.component';
import { EventVideoComponent } from './devicedata/eventdata/eventdetails/eventvideo/event-video/event-video.component';

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
        }
      ]
    },
    {
      path: 'vehicles/:id',
      component: VehiclesDetailsComponent,
      canActivate : [AuthGuard],
    },
    {
      path:'devices/events/company',
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
      canActivate : [AuthGuard],
    },
    {
      path: 'devices/video/:videoUrl',
      component: EventVideoComponent,
      canActivate : [AuthGuard],
    },
    {
      path: 'devices/regular',
      component: RegulardataComponent,
      canActivate : [AuthGuard],
    },
    {
      path: 'devices/regular/:deviceId',
      component: RegularDetailsContainerComponent,
      canActivate : [AuthGuard],
    },
   
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
