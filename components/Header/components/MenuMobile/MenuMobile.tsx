import { IRoutesNavPrimary } from 'routes/routes';
import NavPrimary from '../../../NavPrimary/NavPrimary';
import classes from './menuMobile.module.scss';

interface IMenuMobilePropTypes {
  isMenuOpen: boolean;
  name?: string;
  toggleMenu: () => void;
  routes: IRoutesNavPrimary[];
}

const MenuMobile = ({ isMenuOpen, routes }: IMenuMobilePropTypes) => {
  const styles = [classes.menuMobile, isMenuOpen ? classes.open : ''].join(' ');

  return (
    <div className={styles}>
      <NavPrimary isMenuOpen={isMenuOpen} routes={routes} />
    </div>
  );
};

export default MenuMobile;
export type { IMenuMobilePropTypes };
