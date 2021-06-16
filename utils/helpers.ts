import moment from 'moment';

const formattedValueSingle = (
  startDate: Date | null,
  endDate: Date | null,
  locale: { from: string; to: string; lang: string },
) => {
  const startRuDate = moment(startDate).locale(locale.lang).format('DD MMM');
  const endRuDate = moment(endDate).locale(locale.lang).format('DD MMM');

  const shortFirstDate = startRuDate.length > 6 ? startRuDate.substring(0, 6) : startRuDate;
  const shortSecondDate = endRuDate.length > 6 ? endRuDate.substring(0, 6) : endRuDate;

  const formattedDate = `${startDate ? shortFirstDate : locale.from} - ${
    endDate ? shortSecondDate : locale.to
  }`;

  return formattedDate.toLowerCase();
};

const prettifySum = (num: number) => {
  const n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1${' '}`);
};

const declOfNum = (n: number, textForms: string[]) => {
  const n1 = n;
  if (n1 >= 5) return textForms[3];
  if (n1 >= 2 && n1 <= 4) return textForms[2];
  if (n1 === 1) return textForms[1];
  if (n1 === 0) return textForms[0];
  return textForms[2];
};

export { formattedValueSingle, prettifySum, declOfNum };
