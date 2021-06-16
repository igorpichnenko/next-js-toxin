import React from 'react';

import classes from './title.module.scss';

interface ITitleProps {
  title: string;
  onToggleActive: () => void;
}

const Title = ({ title, onToggleActive }: ITitleProps) => (
  <h3 className={classes.title} onClick={() => onToggleActive()}>
    {title}
  </h3>
);

export default Title;
