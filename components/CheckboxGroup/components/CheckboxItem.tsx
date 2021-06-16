import { useState } from 'react';
import classes from './checkboxItem.module.scss';

interface ICheckBoxItemProps {
  param?: boolean;
  onChange: (index: number, isChecked: boolean) => void;
  index: number;
}

const CheckboxItem = (props: ICheckBoxItemProps) => {
  const { param, onChange, index } = props;
  const [isChecked, setIsChecked] = useState(param);

  const handlerInputChecked = () => {
    setIsChecked(!isChecked);
    onChange(index, !isChecked);
  };

  return (
    <>
      <span className={classes.content}>
        <input
          defaultChecked={isChecked}
          onChange={handlerInputChecked}
          className={classes.input}
          type="checkbox"
        />
        <span className={classes.style}></span>
      </span>
    </>
  );
};
export default CheckboxItem;
