import LocalizedStrings from 'react-localization';
import buttonListLocale from 'public/locales/components/buttonList/buttonList';
import { useRouter } from 'next/router';

import React from 'react';

import classes from './buttonList.module.scss';

interface IButtonListProps {
  btnClearActive?: boolean;
  onClear: () => void;
  onToggleActive: () => void;
}

const strings = new LocalizedStrings(buttonListLocale);

const ButtonList = ({ btnClearActive, onClear, onToggleActive }: IButtonListProps) => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const classNameBtnClear = btnClearActive
    ? `${classes.btn} ${classes.btnToLeft}`
    : `${classes.btn} ${classes.btnNotActive}`;
  const classNameBtnApply = `${classes.btn} ${classes.btnToRight}`;
  return (
    <div className={classes.buttonList}>
      <button className={classNameBtnClear} onClick={() => onClear()} type="button">
        {strings.clear}
      </button>

      <button className={classNameBtnApply} onClick={() => onToggleActive()} type="button">
        {strings.apply}
      </button>
    </div>
  );
};

export default ButtonList;
