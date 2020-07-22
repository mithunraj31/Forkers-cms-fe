import { UserAccount } from './../../../@core/entities/UserAccount.model';
import { UserService } from './../../../services/user.service';
import { Component, OnDestroy, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbToastrService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { AuthService } from '../../../auth/Auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { StompWebsocketService } from '../../../services/stomp-websocket.service';
import { StompSubscriber } from '../../../@core/entities/stomp-subscriber.model';
import { WS_TOPIC } from '../../../@core/constants/websocket-topic';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: UserAccount;

  themes: any;

  currentTheme = 'default';

  userMenu: any;

  currentLanguage = "";

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private toastrService: NbToastrService,
    private themeService: NbThemeService,
    private userDataService: UserData, // ngx-admin service
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private authService: AuthService,
    private userService: UserService, // cms service,
    private router: Router,
    private stompWebsocketService: StompWebsocketService,

    @Inject(LOCALE_ID) public locale: string,
    //iconRegistry: NbIconModule, 
    sanitizer: DomSanitizer) {
    sanitizer.bypassSecurityTrustResourceUrl('assets/icon/English.svg');
    sanitizer.bypassSecurityTrustResourceUrl('assets/icon/Japanese.svg');

    this.currentLanguage = locale;
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));

    this.userMenu = [
      {
        title: $localize`:@@userProfile:`,
        data: {
          action: 'profile'
        }
      },
      {
        title: $localize`:@@logout:`,
        data: {
          action: 'logout'
        }
      }
    ];

    this.themes = [
      {
        value: 'default',
        name: $localize`:@@themeLight:`,
      },
      {
        value: 'dark',
        name: $localize`:@@themeDark:`,
      },
      {
        value: 'cosmic',
        name: $localize`:@@themeCosmic:`,
      },
      {
        value: 'corporate',
        name: $localize`:@@themeCorporate:`,
      },
      {
        value: 'material-light',
        name: $localize`:@@themeMaterialLight:`,
      },
      {
        value: 'material-dark',
        name: $localize`:@@themeMaterialDark:`,
      },
    ];
  }

  wsConn: any;

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userDataService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });
    this.menuService.onItemClick()
      .subscribe(clicked => {
        if (clicked?.item?.data?.action == 'logout') {
          this.authService.logout();
        }
      })

    //get user info
    this.user = this.userService.getLoggedUser();

    // define websocket subscribe topic
    let wsUserSubscriber: StompSubscriber = null;
    // the user is admin
    if (this.user.roles.some(x => x == 'ROLE_ADMIN')) {
      wsUserSubscriber = <StompSubscriber>{
        topic: WS_TOPIC.EVENT_USER_ADMIN,
        onReceivedMessage: this.createWsNotifyHandler(this.toastrService)
      };
    // the user is enduser
    } else {
      wsUserSubscriber = <StompSubscriber>{
        topic: `${WS_TOPIC.EVENT_USER}/${this.user.stk_user}`,
        onReceivedMessage: this.createWsNotifyHandler(this.toastrService)
      };
    }

    this.wsConn = this.stompWebsocketService.createConnection(wsUserSubscriber);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stompWebsocketService.disconnect(this.wsConn);
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onSwitchLanguage() {
    if (this.currentLanguage != this.locale) {
      const hostName = this.currentLanguage == 'en' ? environment.hostEn : environment.hostJa;
      window.location.href = hostName + this.router.url;
    }
  }

  // create closure function to hold NbToastrService and use in callback function
  private createWsNotifyHandler(service: NbToastrService) {
    // onReceivedMessage will excute the arrow function
    return (event: any) => {
      const status = 'info';
      service.show($localize`:@@eventIdIs:` + event.eventId, $localize`:@@eventReceived:` , { status });
    }
  }
}
