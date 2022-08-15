export interface Item {
  title: string;
  url: string;
  className: string;
}

export const MenuItems: Item[] = [
  {
    title: 'Home',
    url: '/',
    className: 'nav-links',
  },
  {
    title: 'About us',
    url: '/aboutus',
    className: 'nav-links',
  },
];
