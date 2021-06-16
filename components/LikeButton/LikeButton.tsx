import { useState } from 'react';

import classes from './likeButton.module.scss';

interface ILikeItem {
  amount: number;
  active: boolean;
}

interface ILikeButtonProps {
  likeButtonParam: ILikeItem;
  onChange: (item: ILikeItem) => void;
}

const LikeButton = (props: ILikeButtonProps) => {
  const { likeButtonParam, onChange } = props;
  const { amount = 0, active = false } = likeButtonParam;

  const [isActive, setActive] = useState(active);
  const [currentAmount, setAmount] = useState(amount);

  const iconVariants = { active: '#fav-active', default: '#fav' };
  const variant = isActive ? 'active' : 'default';
  const buttonClass = [classes.likeButton, classes[variant]].join(' ');

  const handleClick = () => {
    const newAmount = isActive ? currentAmount - 1 : currentAmount + 1;
    setAmount(newAmount);

    const newActiveState = !isActive;
    setActive(newActiveState);

    onChange({ amount: newAmount, active: newActiveState });
  };

  return (
    <button className={buttonClass} onClick={handleClick}>
      <div className={classes.content}>
        <svg className={classes.heart}>
          <use xlinkHref={iconVariants[variant]}></use>
        </svg>
        <div className={classes.amount}>{currentAmount}</div>
      </div>
    </button>
  );
};
export default LikeButton;
export type { ILikeButtonProps, ILikeItem };
