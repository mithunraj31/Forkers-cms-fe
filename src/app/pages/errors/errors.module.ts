import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './404/404.component';
import { NotAllowAccessdComponent } from './403/403.component';

@NgModule({
    imports: [
      NbCardModule,
      ThemeModule,
      NbLayoutModule,
    ],
    declarations: [
        NotFoundComponent,
      NotAllowAccessdComponent
    ],
  })
  export class ErrorsModule { }
  