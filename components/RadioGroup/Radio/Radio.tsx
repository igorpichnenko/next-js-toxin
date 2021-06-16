import classes from './radio.module.scss';

interface IRadioPropsTypes {
  value: string;
  name?: string;
  checked?: boolean;
  defaultChecked: boolean;
  label: string;
  variant?: string;
  onChange?: (valueSelected: string) => void;
}

const Radio = ({
  value,
  name,
  label,
  checked,
  defaultChecked,
  variant = '',
  onChange,
}: IRadioPropsTypes) => {
  const cls = [classes.radio, classes[variant]].join(' ');

  const handleRadioChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const valueSelected = evt.target.value;

    if (onChange) {
      onChange(valueSelected);
    }
  };

  return (
    <label className={cls}>
      <input
        className={classes.input}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleRadioChange}
      />
      <span className={classes.checkMark} />
      <span className={classes.label}>{label}</span>
    </label>
  );
};

export default Radio;
export type { IRadioPropsTypes };
