import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: $localize`:@@dashboard:`,
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  // {
  //   title: $localize`:@@userManagement:`,
  //   icon: 'person-outline'
  // },
  {
    title: $localize`:@@userListings:`,
    icon: 'people-outline',
    link: '/pages/companies',
  },
  {
    title: $localize`:@@sidebarMenuForklift:`,
    icon: 'car-outline',
    link: '/pages/vehicles',
    expanded: true,
    children: [
      {
        title: $localize`:@@tableView:`,
        icon: 'grid-outline',
        link: '/pages/vehicles/table',
      },
      {
        title: $localize`:@@mapsView:`,
        icon: 'map-outline',
        link: '/pages/vehicles/maps',
      },
      {
        title: $localize`:@@statisticsView:`,
        icon: 'activity-outline',
        link: '/pages/vehicles/statistics',
      }
    ]
  },
  {
    title: $localize`:@@sidebarMenuDevice:`,
    icon: 'car-outline',
    link: '/pages/devices',
    expanded: true,
    children: [
      {
        title: $localize`:@@eventView:`,
        icon: 'video-outline',
        link: '/pages/devices/events/company',
      }      
     
    ]
  }
];
