import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { NbAuthComponent, NbAuthService } from '@nebular/auth';
import { environment } from '../../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'frk-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss']
})
export class AuthContainerComponent extends NbAuthComponent{
    
  currentLanguage="";

  constructor(auth: NbAuthService, location: Location, @Inject(LOCALE_ID) public locale: string) {
    super(auth, location);
    this.currentLanguage = locale;
  }


  onSwitchLanguage(lang: string) {
    let hostname: string = '';
    if (lang == 'ja') {
      hostname = environment.hostJa;
    } else {
      hostname = environment.hostEn;
    }

    window.location.href = hostname +  '/login';
  }
}
