import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './pages/errors/404/404.component';
import { NotAllowAccessdComponent } from './pages/errors/403/403.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'login',
    loadChildren: './pages/auth/auth.module#NgxAuthModule',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '403',
    component: NotAllowAccessdComponent,
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
