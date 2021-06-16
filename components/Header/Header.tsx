import { useState } from 'react';

import { primaryRoutes } from 'routes/routes';
import { useSelector } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';

import Backdrop from 'components/Header/components/Backdrop/Backdrop';
import MenuMobile from 'components/Header/components/MenuMobile/MenuMobile';
import Container from 'components/Container/Container';
import Burger from 'components/Header/components/Burger/Burger';
import Logo from 'components/Logo/Logo';
import NavPrimary from 'components/NavPrimary/NavPrimary';

import classes from './header.module.scss';
import LanguageToggler from './components/LanguageToggler/LanguageToggler';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { name, surname } = useSelector((state: State) => state.auth);
  const maxNameLength = 15;
  let userName: string = `${name} ${surname}`;

  if (userName.length > maxNameLength) {
    userName = `${userName.slice(0, maxNameLength)}...`;
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.wrapper}>
          <Logo />

          <LanguageToggler items={['ru', 'en', 'ua']} />

          <NavPrimary routes={primaryRoutes} toggleMenu={toggleMenu} />
          <Burger isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </Container>
      <MenuMobile
        routes={primaryRoutes}
        isMenuOpen={isMenuOpen}
        name={userName}
        toggleMenu={toggleMenu}
      />
      <Backdrop isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
}

export default Header;
