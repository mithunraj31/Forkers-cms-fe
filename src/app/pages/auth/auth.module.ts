import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbCardModule,
  NbSpinnerModule,
  NbLayoutModule,
  NbIconModule,
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { AuthContainerComponent } from './auth-container/auth-container.component';


@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbSpinnerModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbAuthModule,
    NbLayoutModule,
    NbIconModule,
  ],
  declarations: [
    LoginComponent,
    AuthContainerComponent
    

  ],
})
export class NgxAuthModule {
}