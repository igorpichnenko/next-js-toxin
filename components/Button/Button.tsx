import Link from 'next/link';
import React from 'react';

import classes from './button.module.scss';

interface IButtonPropsTypes {
  value: string;
  variant?: string;
  element?: string;
  href?: string;
  icon?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
}

const Button = ({
  value,
  variant = '',
  element = 'Link',
  href = '/',
  icon = false,
  onClick,
  type = 'button',
  disabled = false,
}: IButtonPropsTypes) => {
  let buttonClass = classes.button;
  const variantClasses = variant.trim().split(' ');
  variantClasses.forEach((variantClassName: string) => {
    buttonClass += ` ${classes[variantClassName]}`;
  });

  return (
    <>
      {element === 'Link' ? (
        <Link href={href} shallow={true}>
          <a className={buttonClass} onClick={onClick}>
            {value}
          </a>
        </Link>
      ) : (
        <button type={type} className={buttonClass} onClick={onClick} disabled={disabled}>
          {value}
          {icon ? (
            <svg className={classes.arrow}>
              <use xlinkHref="#arrow-forward"></use>
            </svg>
          ) : null}
        </button>
      )}
    </>
  );
};

export default Button;
export type { IButtonPropsTypes };
