import React from 'react';

import classes from './expression.module.scss';

interface IExpressionProps {
  expression: string;
  expressionActive: boolean;
  onToggleActive: () => void;
}

const Expression = ({ expression, expressionActive, onToggleActive }: IExpressionProps) => {
  const classNameExpression = expressionActive
    ? `${classes.expression} ${classes.active}`
    : classes.expression;
  return (
    <div className={classNameExpression} onClick={() => onToggleActive()}>
      <input className={classes.text} value={expression} readOnly />
      <div className={classes.expandMore}></div>
    </div>
  );
};

export default Expression;
