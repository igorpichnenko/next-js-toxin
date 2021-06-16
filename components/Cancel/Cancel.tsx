import React from 'react';
import LocalizedStrings from 'react-localization';
import cancelLocale from 'public/locales/components/cancel/cancel';
import { useRouter } from 'next/router';

import classes from './cancel.module.scss';

const strings = new LocalizedStrings(cancelLocale);

const Cancel = () => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  return (
    <div className={classes.cancel}>
      <h2 className={classes.title}>{strings.cancel}</h2>
      <p className={classes.text}>{strings.cancelConditions}</p>
    </div>
  );
};

export default Cancel;
