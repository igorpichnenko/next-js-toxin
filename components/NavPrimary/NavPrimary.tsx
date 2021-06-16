import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocalizedStrings from 'react-localization';
import { useRouter } from 'next/router';

import Button from 'components/Button/Button';
import { logOut } from 'redux/auth/authActions';
import { State } from 'redux/rootReducer/rootReducer';
import { IRoutesNavPrimary } from 'routes/routes';
import stringsHeader from 'public/locales/components/header/stringsHeader';

import NavPrimaryItem from './components/NavPrimaryItem/NavPrimaryItem';
import NavAccount from './components/NavAccount/NavAccount';
import classes from './navPrimary.module.scss';

const strings = new LocalizedStrings(stringsHeader);

interface INavPrimaryProps {
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
  routes: IRoutesNavPrimary[];
}

const NavPrimary = ({ isMenuOpen, routes }: INavPrimaryProps) => {
  const styles = [classes.nav, isMenuOpen ? classes.mobile : ''];
  const dispatch = useDispatch();
  const isLogin = useSelector((state: State) => state.auth.isLogin);
  const { name, surname } = useSelector((state: State) => state.auth);

  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const clickAccountHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <nav className={styles.join(' ')}>
      <ul className={classes.list}>
        {routes.map((route, index) => (
          <NavPrimaryItem
            key={index}
            text={strings[route.text]}
            href={route.href}
            dropdownLinks={route.dropdownLinks?.map((subLink) => ({
              ...subLink,
              text: strings[subLink.text],
            }))}
          />
        ))}
        {!isLogin ? (
          <>
            <span className={classes.buttonWrapper}>
              <Button value={strings.signIn} variant="white" href="/auth/login" />
            </span>
            <span className={classes.buttonWrapper}>
              <Button value={strings.singUp} href="/auth/registration" />
            </span>
          </>
        ) : (
          <NavAccount name={`${name} ${surname}`} clickHandler={clickAccountHandler} />
        )}
      </ul>
    </nav>
  );
};

export default NavPrimary;

export type { INavPrimaryProps };
