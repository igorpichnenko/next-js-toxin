import React, { useState, useEffect, useRef } from 'react';

import Title from './components/Title/Title';
import Expression from './components/Expression/Expression';
import Container from './components/Container/Container';

import classes from './dropdownList.module.scss';

interface IDropdownListItem {
  title: string;
  value: number;
  id: number;
}

interface IDropdownListProps {
  title: string;
  itemList: IDropdownListItem[];
  expression: string;
  isButtons: boolean;
  createExpression: (itemListState: IDropdownListItem[]) => string;
  onChange: (itemListState: IDropdownListItem[]) => void;
}

const DropdownList = ({
  title,
  itemList,
  isButtons,
  expression,
  createExpression,
  onChange,
}: IDropdownListProps) => {
  const [itemListState, setItemList] = useState(itemList);

  const [expressionActive, setExpressionActive] = useState(false);

  const [containerActive, setContainerActive] = useState(false);

  const [btnClearActive, setBtnClearActive] = useState(() => {
    const res = Boolean(itemListState.filter((el) => el.value !== 0).length);
    return res;
  });

  const handleIncrement = (id: number) => {
    const idx = itemListState.findIndex((el) => el.id === id);
    const newItem = { ...itemListState[idx], value: itemListState[idx].value + 1 };
    const newItemList = [...itemListState.slice(0, idx), newItem, ...itemListState.slice(idx + 1)];
    setItemList([...newItemList]);

    if (isButtons) {
      setBtnClearActive(true);
    }

    onChange(newItemList);
  };

  const handleDecrement = (id: number) => {
    const idx = itemListState.findIndex((el) => el.id === id);
    if (itemListState[idx].value === 0) return;
    const newItem = { ...itemListState[idx], value: itemListState[idx].value - 1 };
    const newItemList = [...itemListState.slice(0, idx), newItem, ...itemListState.slice(idx + 1)];
    setItemList([...newItemList]);

    const isSetBtnClearActive = isButtons && newItemList.filter((el) => el.value > 0).length === 0;

    if (isSetBtnClearActive) {
      setBtnClearActive(false);
    }

    onChange(newItemList);
  };

  const handleToggleActive = () => {
    setExpressionActive(!expressionActive);
    setContainerActive(!containerActive);
  };

  const handleClear = () => {
    const newItemList = itemListState.map((el) => {
      const item = { ...el, value: 0 };
      return item;
    });

    if (isButtons) {
      setBtnClearActive(false);
    }

    setItemList(newItemList);

    onChange(newItemList);
  };

  const node = useRef<HTMLDivElement>(null);

  const handleClickDocument = (e: MouseEvent) => {
    if (node && node.current && e.target) {
      if (node.current.contains(e.target as Node)) return;
      setExpressionActive(false);
      setContainerActive(false);
    }
  };

  useEffect(() => {
    createExpression(itemListState);
    document.addEventListener('click', handleClickDocument);
    return () => document.removeEventListener('click', handleClickDocument);
  }, []);

  return (
    <div className={classes.dropdownList} ref={node}>
      <Title title={title} onToggleActive={handleToggleActive} />
      <Expression
        expression={createExpression(itemListState) || expression}
        expressionActive={expressionActive}
        onToggleActive={handleToggleActive}
      />
      <Container
        itemList={itemListState.map((item, key) => ({ ...item, title: itemList[key].title }))}
        containerActive={containerActive}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        isButtons={isButtons}
        btnClearActive={btnClearActive}
        onToggleActive={handleToggleActive}
        onClear={handleClear}
      />
    </div>
  );
};

export default DropdownList;
export type { IDropdownListItem };
