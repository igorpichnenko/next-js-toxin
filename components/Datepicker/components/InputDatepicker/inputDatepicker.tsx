import classes from './inputDatepicker.module.scss';

interface InputProps {
  variant?: string;
  name?: string;
  value: string;
  showCalendar: () => void;
  hideCalendar: () => void;
}

const InputDatepicker = ({ variant, name, value, showCalendar, hideCalendar }: InputProps) => {
  const cls = [classes.inputWrapper, variant === 'single' ? classes.long : classes.short].join(' ');

  return (
    <div className={cls}>
      <input
        className={classes.inputDate}
        type="text"
        name={name}
        value={value}
        readOnly
        onClick={showCalendar}
        onBlur={hideCalendar}
      />
    </div>
  );
};

export default InputDatepicker;
