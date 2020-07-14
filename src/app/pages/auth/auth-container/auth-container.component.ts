import { Component, OnInit, Inject } from '@angular/core';
import { NbAuthComponent, NbAuthService } from '@nebular/auth';
import { Location } from '@angular/common';
import { NbIconLibraries } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'frk-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss']
})
export class AuthContainerComponent extends NbAuthComponent{
  router: Router;

  

  onSwitchEnglish() {
      const hostName =  environment.hostEn;
      window.location.href = hostName ;
  }

  onSwitJapanese(){
    const hostName =environment.hostJa;
    window.location.href = hostName ;
  }
}
