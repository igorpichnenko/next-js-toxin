import LocalizedStrings from 'react-localization';
import initValuesLocale from 'public/locales/components/filterRoom/initValues';
import { useRouter } from 'next/router';

import CheckboxGroup, {
  IItemType,
} from 'components/CheckboxGroup/CheckboxGroup';
import { checkboxListParam } from 'components/FilterRoom/initValues';
import { useSelector } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';
import classes from './expandableCheckboxGroup.module.scss';

interface IExpandableCheckboxGroupProps {
  title: string;
  onChange: (newItems: IItemType[]) => void;
}

const initValueStrings = new LocalizedStrings(initValuesLocale);

const ExpandableCheckbox = ({
  title,
  onChange,
}: IExpandableCheckboxGroupProps) => {
  const { locale = 'ru' } = useRouter();
  const { filter } = useSelector((state: State) => state.filter);
  initValueStrings.setLanguage(locale);

  return (
    <>
      <details className={classes.expandableCheckbox}>
        <summary className={classes.summary}>{title}</summary>
        <CheckboxGroup
          onChange={(newItems) => onChange(newItems)}
          checkboxParam={checkboxListParam.map((checkbox, key) => ({
            ...checkbox,
            isChecked: filter.checkboxList[key],
            title: initValueStrings.checkboxListParam[checkbox.title],
          }))}
        />
      </details>
    </>
  );
};

export default ExpandableCheckbox;
