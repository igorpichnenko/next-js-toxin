import React from 'react';

import { IDropdownListItem } from 'components/DropdownList/DropdownList';
import Item from '../Item/Item';

import classes from './itemList.module.scss';

interface IItemListProps {
  itemList: IDropdownListItem[]
  onIncrement: (id: number) => void
  onDecrement: (id: number) => void
}

const ItemList = ({ itemList, onIncrement, onDecrement }: IItemListProps) => {
  if (itemList !== undefined) {
    const listItemComponent = itemList.map((i) => (
      <Item
        item={i}
        key={i.id}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    ));
    return (
      <div className={classes.itemList}>
        {listItemComponent}
      </div>
    );
  }
  return (
    <div className="item-list">
      <p>...</p>
    </div>
  );
};

export default ItemList;
