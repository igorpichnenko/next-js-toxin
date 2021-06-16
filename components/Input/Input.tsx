import React from 'react';
import MaskedInput from 'react-text-mask';
import classes from './input.module.scss';

interface IInputPropsTypes {
  placeholder?: string;
  type: string;
  name: string;
  value?: string;
  errorMessages?: string[] | null;
  withButton?: boolean;
  mask?: (string | RegExp)[] | false;
  required?: boolean;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  placeholder = 'Описание',
  type = 'text',
  name = 'name',
  value = '',
  errorMessages = null,
  withButton = false,
  mask = false,
  required = false,
  id,
  onChange,
}: IInputPropsTypes) => {
  const inputClass = withButton ? `${classes.input} ${classes.inputWithButton}` : classes.input;
  const hasError = errorMessages?.length;
  const baseWrapClass = hasError
    ? `${classes.inputBaseWrap} ${classes.inputBaseWrapWithError}`
    : classes.inputBaseWrap;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className={classes.inputWrap}>
      <div className={baseWrapClass}>
        {mask ? (
          <MaskedInput
            mask={mask}
            type={type}
            name={name}
            value={value}
            className={inputClass}
            placeholder={placeholder}
            guide={false}
            required={required}
            id={id}
            onChange={changeHandler}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            className={inputClass}
            placeholder={placeholder}
            required={required}
            id={id}
            onChange={changeHandler}
          ></input>
        )}
        {withButton ? <button type="submit" className={classes.inputButton}></button> : null}
      </div>

      {hasError ? <p className={classes.errorMessages}>{errorMessages?.join(', ')}</p> : null}
    </div>
  );
};

export default Input;
export type { IInputPropsTypes };
