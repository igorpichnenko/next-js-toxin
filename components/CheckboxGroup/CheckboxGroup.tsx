import { useState } from 'react';
import CheckboxItem from './components/CheckboxItem';

import classes from './checkboxGroup.module.scss';

interface IItemType {
  title: string;
  text: string;
  isChecked: boolean;
}

interface ICheckBoxGroupItemProps {
  checkboxParam: IItemType[];

  onChange: (newItems: IItemType[]) => void;
}

const CheckboxGroup = (props: ICheckBoxGroupItemProps) => {
  const { checkboxParam, onChange } = props;
  const [items, setItems] = useState(checkboxParam);

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const newItems = [...items];
    newItems[index].isChecked = isChecked;
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <>
      {checkboxParam.map((el, index: number) => (
        <div className={classes.checkbox} key={`${el.title}${index}`}>
          <label>
            <CheckboxItem
              param={items[index].isChecked}
              onChange={handleCheckboxChange}
              index={index}
            />
            <p className={classes.title}>{el.text ? el.title : ''}</p>

            <p className={el.text ? classes.comment : classes.text}>
              {el.text ? el.text : el.title}
            </p>
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckboxGroup;
export type { IItemType };
