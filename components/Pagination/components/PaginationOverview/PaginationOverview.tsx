import LocalizedStrings from 'react-localization';
import paginationOverviewLocale from 'public/locales/components/paginationOverview/paginationOverview';
import { useRouter } from 'next/router';

import classes from './paginationOverview.module.scss';

interface IPaginationOverviewProps {
  page: number;
}

const strings = new LocalizedStrings(paginationOverviewLocale);

const PaginationOverview = ({ page }: IPaginationOverviewProps) => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const temp = 12;
  const endDiapason = page * temp;
  const startDiapason = endDiapason - temp + 1;
  return (
    <div className={classes.overview}>
      <p>
        {startDiapason} – {endDiapason} {strings.choose}
      </p>
    </div>
  );
};

export default PaginationOverview;
