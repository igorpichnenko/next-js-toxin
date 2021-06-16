import { declOfNum } from 'utils/helpers';

interface IPeriod {
  period: number;
  periodName: string;
}

interface IPeriodLocale {
  ago: string;
  years: string[];
  months: string[];
  weeks: string[];
  days: string[];
  today: string;
}

const oneDay = 86400000;

const countPeriod = (
  dayDifference: number,
  { years, months, weeks, days, today }: IPeriodLocale,
): IPeriod => {
  switch (true) {
    case dayDifference > 365: {
      const yearsAmount = Math.ceil(dayDifference / 365);
      return { period: yearsAmount, periodName: declOfNum(yearsAmount, years) };
    }
    case dayDifference > 30: {
      const monthsAmount = Math.ceil(dayDifference / 30);
      return { period: monthsAmount, periodName: declOfNum(monthsAmount, months) };
    }
    case dayDifference > 7: {
      const weeksAmount = Math.ceil(dayDifference / 7);
      return { period: weeksAmount, periodName: declOfNum(weeksAmount, weeks) };
    }
    case dayDifference === 0: {
      return { period: 0, periodName: today };
    }
    default: {
      return { period: dayDifference, periodName: declOfNum(dayDifference, days) };
    }
  }
};

const countDateFromNow = (targetDay: string, locale: IPeriodLocale): string => {
  const { ago } = locale;
  const dayDiff = Math.round(
    Math.abs((new Date().getTime() - new Date(targetDay).getTime()) / oneDay),
  );
  const period = countPeriod(dayDiff, locale);
  const periodFormatted = period.period === 0 ? '' : `${period.period} `;
  const agoFormatted = period.period === 0 ? '' : ` ${ago}`;
  return `${periodFormatted}${period.periodName}${agoFormatted}`;
};

export default countDateFromNow;
