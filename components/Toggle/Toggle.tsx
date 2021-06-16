import classes from './toggle.module.scss';

interface IToggleSelected {
  name: string;
  value: boolean;
}

interface ITogglePropsTypes {
  name: string;
  label: string;
  checked?: boolean;
  defaultChecked: boolean;
  variant?: string;
  onChange: (item: IToggleSelected) => void;
}

const Toggle = ({
  name,
  checked,
  label,
  defaultChecked = false,
  variant = '',
  onChange,
}: ITogglePropsTypes) => {
  const cls = [classes.toggle, classes[variant]].join(' ');

  const handleToggleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.checked;
    onChange({ name, value });
  };

  return (
    <label className={cls}>
      <input
        className={classes.input}
        type="checkbox"
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleToggleChange}
      />
      <span className={classes.slider} />
      {label}
    </label>
  );
};

export default Toggle;
export type { ITogglePropsTypes };
