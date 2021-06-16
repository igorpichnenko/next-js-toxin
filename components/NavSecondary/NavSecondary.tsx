import LocalizedStrings from 'react-localization';
import footerLocale from 'public/locales/components/navSecondary/navSecondary';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { IRoutes } from 'routes/routes';
import classes from './navSecondary.module.scss';

interface INavSecondary {
  routes: IRoutes[];
}

const strings = new LocalizedStrings(footerLocale);

const NavSecondary = ({ routes }: INavSecondary) => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const linkItems = routes.map((route, index) => (
    <li key={index} className={classes.item}>
      <Link href={route.href} shallow={true}>
        <a className={classes.link}>{strings[route.text]}</a>
      </Link>
    </li>
  ));

  return (
    <nav>
      <ul className={classes.list}>{linkItems}</ul>
    </nav>
  );
};

export default NavSecondary;
