import LocalizedStrings from 'react-localization';
import copyrightLocale from 'public/locales/components/copyright/copyright';
import { useRouter } from 'next/router';

import classes from './copyright.module.scss';

const strings = new LocalizedStrings(copyrightLocale);

const Copyright = ({ year = 2018 }) => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  return (
    <p className={classes.copyright}>
      Copyright © {year} {strings.copyright}
    </p>
  );
};

export default Copyright;
