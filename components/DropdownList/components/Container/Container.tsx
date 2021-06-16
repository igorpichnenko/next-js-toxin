import React from 'react';

import { IDropdownListItem } from 'components/DropdownList/DropdownList';
import ItemList from '../ItemList/ItemList';
import ButtonList from '../ButtonList/ButtonList';

import classes from './container.module.scss';

interface IContainerProps {
  itemList: IDropdownListItem[],
  containerActive: boolean
  btnClearActive: boolean
  onIncrement: (id: number) => void
  onDecrement: (id: number) => void
  isButtons: boolean
  onToggleActive: () => void
  onClear: () => void
}

const Container = ({
  itemList,
  containerActive,
  onIncrement,
  onDecrement,
  isButtons,
  btnClearActive,
  onToggleActive,
  onClear,
}:IContainerProps) => {
  const containerClassName = containerActive ? `${classes.container} ${classes.containerActive}` : classes.container;
  const buttonList = isButtons
    ? <ButtonList
      btnClearActive={btnClearActive}
      onToggleActive={onToggleActive}
      onClear={onClear}
    /> : '';

  return (
    <div className={containerClassName}>
      <ItemList
        itemList={itemList}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
      {buttonList}
    </div>
  );
};

export default Container;
