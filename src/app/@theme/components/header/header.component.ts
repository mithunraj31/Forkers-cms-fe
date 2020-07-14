import { UserAccount } from './../../../@core/entities/UserAccount.model';
import { UserService } from './../../../services/user.service';
import { Component, OnDestroy, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbIconLibraries, NbIconModule, NbIconPack } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { AuthService } from '../../../auth/Auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

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
  
  currentLanguage="";

  English="";

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userDataService: UserData, // ngx-admin service
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private authService: AuthService,
    private userService: UserService, // mdm service,
    private router: Router,
  
    @Inject(LOCALE_ID) public locale: string,
    //iconRegistry: NbIconModule, 
    sanitizer: DomSanitizer) {
      //iconRegistry.addSvgIcon(
       // 'English',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/English.svg');
      //  iconRegistry.addSvgIcon(
       //   'Japanese',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icon/Japanese.svg');

         this.English=
    

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

    this.themes =[
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
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
      const hostName = this.currentLanguage == 'en' ? environment.hostEn: environment.hostJa;
      window.location.href = hostName + this.router.url;
    }
  }
}
