interface IRoutes {
  href: string;
  text: SecondaryRouteLabels;
}

interface IRoutesNavPrimary {
  href: string;
  text: PrimaryRouteLabels;
  cls?: string;
  dropdownLinks?: { href: string; text: PrimaryRouteLabels }[];
}

interface IRoutesNav {
  href: string;
  text: NavAccountRouteLabels;
}

enum PrimaryRouteLabels {
  about = 'about',
  services = 'services',
  service = 'service',
  vacancies = 'vacancies',
  news = 'news',
  agreements = 'agreements',
}

enum SecondaryRouteLabels {
  about = 'about',
  services = 'services',
  vacancies = 'vacancies',
  news = 'news',
  agreements = 'agreements',
  investors = 'investors',
  communities = 'communities',
  contactUs = 'contactUs',
  support = 'support',
  aboutService = 'aboutService',
  ourTeam = 'ourTeam',
}

enum NavAccountRouteLabels {
  profile = 'profile',
  bookedRooms = 'bookedRooms',
}

const primaryRoutes: IRoutesNavPrimary[] = [
  { href: '/about', text: PrimaryRouteLabels.about, cls: '' },
  {
    href: '/mock-address',
    text: PrimaryRouteLabels.services,
    dropdownLinks: [
      { href: '/services/:1', text: PrimaryRouteLabels.service },
      { href: '/services/:2', text: PrimaryRouteLabels.service },
      { href: '/services/:3', text: PrimaryRouteLabels.service },
    ],
  },
  { href: '/vacancies', text: PrimaryRouteLabels.vacancies, cls: '' },
  { href: '/news', text: PrimaryRouteLabels.news, cls: '' },
  {
    href: '/agreements',
    text: PrimaryRouteLabels.agreements,
    dropdownLinks: [
      { href: '/agreements/:1', text: PrimaryRouteLabels.agreements },
      { href: '/agreements/:2', text: PrimaryRouteLabels.agreements },
    ],
  },
];

const profileRoutes: IRoutesNav[] = [
  { href: '/profile/personal-account', text: NavAccountRouteLabels.profile },
  { href: '/profile/booked-rooms', text: NavAccountRouteLabels.bookedRooms },
];

const navigationRoutes: IRoutes[] = [
  { href: '/on-progress', text: SecondaryRouteLabels.about },
  { href: '/on-progress', text: SecondaryRouteLabels.news },
  { href: '/on-progress', text: SecondaryRouteLabels.support },
  { href: '/on-progress', text: SecondaryRouteLabels.services },
];

const aboutRoutes: IRoutes[] = [
  { href: '/on-progress', text: SecondaryRouteLabels.aboutService },
  { href: '/on-progress', text: SecondaryRouteLabels.ourTeam },
  { href: '/on-progress', text: SecondaryRouteLabels.vacancies },
  { href: '/on-progress', text: SecondaryRouteLabels.investors },
];

const supportRoutes: IRoutes[] = [
  { href: '/on-progress', text: SecondaryRouteLabels.agreements },
  { href: '/on-progress', text: SecondaryRouteLabels.communities },
  { href: '/on-progress', text: SecondaryRouteLabels.contactUs },
];

const secondaryRoutes = {
  navigationRoutes,
  aboutRoutes,
  supportRoutes,
};

export { primaryRoutes, secondaryRoutes, profileRoutes };
export type { IRoutes, IRoutesNavPrimary };
