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
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
