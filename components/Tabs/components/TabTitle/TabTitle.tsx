import classes from './tabTitle.module.scss';

type Props = {
  title: string;
  index: number;
  selectedTab: number;
  handleClick: (evt: React.ChangeEvent<{}>, newValue: number) => void;
};

const TabTitle = ({ title, index, selectedTab, handleClick }: Props) => {
  const buttonClass = selectedTab === index ? `${classes.button} ${classes.buttonActive}` : classes.button;
  return (
    <li>
      <button
        className={buttonClass}
        onClick={(evt: React.ChangeEvent<{}>) => {
          handleClick(evt, index);
        }}
      >
        <span className={classes.buttonTitle}>{title}</span>
      </button>
    </li>
  );
};

export default TabTitle;
