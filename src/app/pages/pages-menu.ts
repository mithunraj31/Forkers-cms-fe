import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: $localize`:@@dashboard:`,
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: $localize`:@@userManagement:`,
    icon: 'person-outline'
  },
  {
    title: $localize`:@@userListings:`,
    icon: 'people-outline',
    link: '/pages/companies',
  },
  {
    title: $localize`:@@sidebarMenuForklift:`,
    icon: 'car-outline',
    link: '/pages/vehicles',
  }
];
