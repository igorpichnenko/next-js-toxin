import LocalizedStrings from 'react-localization';
import pieChartLabelLocale from 'public/locales/components/pieChartLabel/pieChartLabel';
import { useRouter } from 'next/router';

import classes from './pieChartLabel.module.scss';

interface IPieChartLabelPropsTypes {
  pieLabelParam: {
    amount: number;
  };
}

const strings = new LocalizedStrings(pieChartLabelLocale);

const PieChartLabel = ({ pieLabelParam }: IPieChartLabelPropsTypes) => {
  const { amount } = pieLabelParam;
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  return (
    <div className={classes.textContainer}>
      <div className={classes.textItem}>
        <div className={classes.textMain}>{amount}</div>
        <div className={classes.textSub}>{strings.votes}</div>
      </div>
    </div>
  );
};

export default PieChartLabel;
export type { IPieChartLabelPropsTypes };
