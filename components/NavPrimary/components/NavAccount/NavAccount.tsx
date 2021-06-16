import LocalizedStrings from 'react-localization';
import navAccountLocale from 'public/locales/components/navAccount/navAccount';
import { useRouter } from 'next/router';

import { SyntheticEvent } from 'react';
import Link from 'next/link';
import { profileRoutes } from 'routes/routes';
import classes from './navAccount.module.scss';

const strings = new LocalizedStrings(navAccountLocale);

type AccountType = {
  name: string;
  clickHandler?: (e: SyntheticEvent) => void;
};

const Account = ({ name = '', clickHandler }: AccountType) => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const profileLinks = profileRoutes.map((route, index) => {
    const { href, text } = route;

    return (
      <li key={index}>
        <Link href={href} shallow={true}>
          <a className={classes.subMenuItem}>{strings[text]}</a>
        </Link>
      </li>
    );
  });

  return (
    <div className={classes.account}>
      <span className={classes.name}>{name}</span>
      <ul className={classes.subMenu}>
        {profileLinks}
        <li>
          <button type="button" className={classes.subMenuItem} onClick={clickHandler}>
            {strings.logOut}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Account;
