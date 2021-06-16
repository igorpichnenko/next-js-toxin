import { FunctionComponent } from 'react';

import classes from './datepickerWrapper.module.scss';

interface IDatepickerWrapperProps {
  isOpen: boolean;
}

const DatepickerWrapper: FunctionComponent<IDatepickerWrapperProps> = ({ isOpen, children }) => {
  const cls = [classes.datepickerWrapper, isOpen ? classes.open : classes.close].join(' ');

  return <div className={cls}>{children}</div>;
};

export default DatepickerWrapper;
