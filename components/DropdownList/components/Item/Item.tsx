import React from 'react';

import { IDropdownListItem } from 'components/DropdownList/DropdownList';

import classes from './item.module.scss';

interface IPropsItem {
  item: IDropdownListItem;
  onDecrement: (id: number) => void;
  onIncrement: (id: number) => void;
}

const Item = ({ item, onIncrement, onDecrement }: IPropsItem) => {
  const classNameBtnDecrement = item.value === 0 ? `${classes.btn} ${classes.btnInActive}` : classes.btn;

  return (
    <div className={classes.item}>
      <h3 className={classes.title}>{item.title}</h3>
      <div className={classes.container}>
        <button
          className={classNameBtnDecrement}
          onClick={() => onDecrement(item.id)}
          type="button"
        >
          -
        </button>
        <span className={classes.value}>{item.value}</span>
        <button className={classes.btn} onClick={() => onIncrement(item.id)} type="button">
          +
        </button>
      </div>
    </div>
  );
};

export default Item;
