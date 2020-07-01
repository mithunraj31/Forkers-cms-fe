import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompaniesComponent } from './companies/companies.companent';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehiclesTableViewComponent } from './vehicles/vehicles-table-view/vehicles-table-view.component';
import { VehiclesMapsViewComponent } from './vehicles/vehicles-maps-view/vehicles-maps-view.component';
import { VehiclesDetailsComponent } from './vehicles/vehicle-details/vehicle-details.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'companies',
      component: CompaniesComponent,
    },
    {
      path: 'vehicles',
      component: VehiclesComponent,
      children: [
        {
          path: '',
          redirectTo: 'table',
          pathMatch: 'full',
        },
        {
          path: 'table',
          component: VehiclesTableViewComponent,
        },
        {
          path: 'maps',
          component: VehiclesMapsViewComponent,
        }
      ]
    },
    {
      path: 'vehicles/:id',
      component: VehiclesDetailsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
