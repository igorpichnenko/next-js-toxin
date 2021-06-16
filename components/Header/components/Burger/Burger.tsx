import { useEffect } from 'react';
import classes from './burger.module.scss';

interface IBurgerPropTypes {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Burger = ({ isMenuOpen, toggleMenu }: IBurgerPropTypes) => {
  const styles = [classes.layout, isMenuOpen ? classes.active : ''].join(' ');

  const clickHandler = () => {
    toggleMenu();
  };

  const stopScrolling = () => {
    document.body.classList.remove('stop-scrolling');
    if (isMenuOpen) document.body.classList.add('stop-scrolling');
  };

  useEffect(() => {
    stopScrolling();
  });

  return (
    <div className={classes.burger} onClick={clickHandler}>
      <div className={styles}></div>
    </div>
  );
};

export default Burger;
export type { IBurgerPropTypes };
