import LocalizedStrings from 'react-localization';
import rulesLocale from 'public/locales/components/rules/rules';
import { useRouter } from 'next/router';

import Item from './components/Item/Item';

import classes from './rules.module.scss';

const strings = new LocalizedStrings(rulesLocale);

enum RuleId {
  id1 = 1,
  id2 = 2,
  id3 = 3,
}

interface IRule {
  text: string;
  id: RuleId;
}

interface IProps {
  rules: IRule[];
}

const Rules = ({ rules }: IProps) => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const items = rules.length !== 0
    ? rules.map(({ id }) => <Item text={strings[id]} key={`rule-${id}`} />)
    : null;

  return (
    <div className={classes.rules}>
      <h2 className={classes.title}>{strings.rules}</h2>
      <ul className={classes.itemList}>{items}</ul>
    </div>
  );
};

export default Rules;
export type { IRule };
