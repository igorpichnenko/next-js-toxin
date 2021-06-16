import classes from './backdrop.module.scss';

interface IBackdropProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Backdrop = ({ isMenuOpen, toggleMenu }: IBackdropProps) => {
  const styles = [classes.backdrop, isMenuOpen ? classes.open : ''].join(' ');

  const clickHandler = () => {
    toggleMenu();
  };

  return <div className={styles} onClick={clickHandler}></div>;
};

export default Backdrop;
export type { IBackdropProps };
