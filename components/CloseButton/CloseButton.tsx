import React from 'react';
import classes from './closeButton.module.scss';

interface ICloseButtonPropsTypes {
  title: string;
  type?: 'button' | 'reset';
  disabled?: boolean;
  onClick: () => void;
}

const CloseButton = ({
  onClick,
  title,
  type = 'button',
  disabled = false,
}: ICloseButtonPropsTypes) => (
  <button
    type={type}
    title={title}
    className={classes.button}
    onClick={onClick}
    disabled={disabled}
  ></button>
);
export default CloseButton;
export type { ICloseButtonPropsTypes };
