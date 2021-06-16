import { FunctionComponent } from 'react';
import classes from './container.module.scss';

const Container: FunctionComponent = ({ children }) => (
  <div className={classes.Container}>{children}</div>
);

export default Container;
