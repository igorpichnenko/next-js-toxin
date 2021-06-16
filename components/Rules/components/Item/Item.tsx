import React from 'react';

import classes from './item.module.scss';

interface IProps {
  text: string;
}

const Item = ({ text }: IProps) => (
  <li className={classes.item}>
    <div className={classes.itemMarker}></div>
    {text}
  </li>
);

export default Item;
