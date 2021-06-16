import LocalizedStrings from 'react-localization';
import createExpressionGuests from 'public/locales/utils/createExpressionGuest';
import createExpressionRoomLocale from 'public/locales/utils/createExpressionRooms';
import filterRoomLocale from 'public/locales/components/filterRoom/filterRoom';
import initValuesLocale from 'public/locales/components/filterRoom/initValues';
import { useRouter } from 'next/router';
import { State } from 'redux/rootReducer/rootReducer';

import Datepicker from 'components/Datepicker/Datepicker';
import DropdownList, { IDropdownListItem } from 'components/DropdownList/DropdownList';
import formatGuests from 'components/DropdownList/createExpression/formatGuests';
import sumWords from 'components/DropdownList/createExpression/sumWords';
import CheckboxGroup, { IItemType } from 'components/CheckboxGroup/CheckboxGroup';
import ExpandableCheckboxGroup from 'components/ExpandableCheckboxGroup/ExpandableCheckboxGroup';
import {
  checkboxParam,
  checkboxRichParam,
  dropdownParam,
  dropdownRoomParam,
  initState,
  rangeSliderParam,
} from 'components/FilterRoom/initValues';
import RangeSlider from 'components/RangeSlider/RangeSlider';
import Typography from 'components/Typography/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { changeForm } from 'redux/filter/filterActions';
import classes from './filterRoom.module.scss';

interface IFilterState {
  dropdownGuest: number[];
  dropdownRoom: number[];
  datepicker: string[];
  checkboxRule: boolean[];
  checkboxRich: boolean[];
  checkboxList: boolean[];
  rangeSlider: number[];
}

const guestStrings = new LocalizedStrings(createExpressionGuests);
const strings = new LocalizedStrings(filterRoomLocale);
const initValueStrings = new LocalizedStrings(initValuesLocale);
const roomStrings = new LocalizedStrings(createExpressionRoomLocale);

interface IFilterRooms {
  changeUrl: (state: IFilterState) => void;
}

const FilterRoom = ({ changeUrl }: IFilterRooms) => {
  const { locale = 'ru' } = useRouter();
  guestStrings.setLanguage(locale);
  strings.setLanguage(locale);
  initValueStrings.setLanguage(locale);
  roomStrings.setLanguage(locale);

  const { filter } = useSelector((state: State) => state.filter);

  const dispatch = useDispatch();

  const onChangeDateInfo = (start: Date | null, end: Date | null) => {
    const [defaultStart, defaultEnd] = initState.datepicker;

    const dateStart = start ? start.toISOString().split('T')[0] : defaultStart;
    const dateEnd = end ? end.toISOString().split('T')[0] : defaultEnd;
    const correctData = [dateStart, dateEnd];
    dispatch(changeForm({ ...filter, datepicker: correctData }));
    changeUrl({ ...filter, datepicker: correctData });
  };
  const handleDropdownChange = (value: IDropdownListItem[]) => {
    const arr = Object.values(value);
    const newData = Object.fromEntries(arr.map((n) => [n.title, n.value]));
    const correctData = Object.values(newData);
    dispatch(changeForm({ ...filter, dropdownGuest: correctData }));
    changeUrl({ ...filter, dropdownGuest: correctData });
  };
  const handleDropdownRoomChange = (value: IDropdownListItem[]) => {
    const arr = Object.values(value);
    const newData = Object.fromEntries(arr.map((n) => [n.title, n.value]));
    const correctData = Object.values(newData);
    dispatch(changeForm({ ...filter, dropdownRoom: correctData }));
    changeUrl({ ...filter, dropdownRoom: correctData });
  };
  const handleCheckboxRuleChange = (value: IItemType[]) => {
    const arr = Object.values(value);
    const newData = Object.fromEntries(arr.map((n) => [n.title, n.isChecked]));
    const correctData = Object.values(newData);
    dispatch(changeForm({ ...filter, checkboxRule: correctData }));
    changeUrl({ ...filter, checkboxRule: correctData });
  };
  const handleCheckboxRichChange = (value: IItemType[]) => {
    const arr = Object.values(value);
    const newData = Object.fromEntries(arr.map((n) => [n.title, n.isChecked]));
    const correctData = Object.values(newData);
    dispatch(changeForm({ ...filter, checkboxRich: correctData }));
    changeUrl({ ...filter, checkboxRich: correctData });
  };
  const handleCheckboxListChange = (value: IItemType[]) => {
    const arr = Object.values(value);
    const newData = Object.fromEntries(arr.map((n) => [n.title, n.isChecked]));
    const correctData = Object.values(newData);
    dispatch(changeForm({ ...filter, checkboxList: correctData }));
    changeUrl({ ...filter, checkboxList: correctData });
  };
  const handleSliderChange = (value: number[]) => {
    const correctData = value;
    dispatch(changeForm({ ...filter, rangeSlider: correctData }));
    changeUrl({ ...filter, rangeSlider: correctData });
  };

  return (
    <form className={classes.filter}>
      <Typography variant="label">{strings.staying}</Typography>

      <div className={classes.datepicker}>
        <Datepicker
          start={new Date(filter.datepicker[0])}
          end={new Date(filter.datepicker[1])}
          variant="single"
          onChange={onChangeDateInfo}
        />
      </div>

      <DropdownList
        title={strings.guests}
        expression={strings.howManyGuests}
        itemList={dropdownParam.map((item, key) => ({
          ...item,
          value: filter.dropdownGuest[key],
          title: initValueStrings.dropdownParam[item.title],
        }))}
        createExpression={(itemList) => formatGuests({ itemList, locale: guestStrings.dropdown })}
        isButtons
        onChange={(itemList) => handleDropdownChange(itemList)}
      />

      <div className={classes.slider}>
        <RangeSlider
          onChange={(newItems) => handleSliderChange(newItems)}
          param={{
            ...rangeSliderParam,
            valueFrom: filter.rangeSlider[0],
            valueTo: filter.rangeSlider[1],
            title: initValueStrings.rangeSliderParam[rangeSliderParam.title],
          }}
        />
        <p className={classes.text}>{strings.priceDay}</p>
      </div>

      <div className={classes.checkboxTitle}>
        <Typography variant="h3">{strings.rules}</Typography>
      </div>

      <CheckboxGroup
        onChange={(newItems) => handleCheckboxRuleChange(newItems)}
        checkboxParam={checkboxParam.map((checkbox, key) => ({
          ...checkbox,
          isChecked: filter.checkboxRule[key],
          title: initValueStrings.checkboxParam[checkbox.title],
        }))}
      />

      <div className={classes.checkboxRichTitle}>
        <Typography variant="h3">{strings.accessability}</Typography>
      </div>

      <CheckboxGroup
        onChange={(newItems) => handleCheckboxRichChange(newItems)}
        checkboxParam={checkboxRichParam.map((checkboxRich, key) => ({
          ...checkboxRich,
          isChecked: filter.checkboxRich[key],
          title: initValueStrings.checkboxRichParam[checkboxRich.title],
          text: initValueStrings.checkboxRichParam[checkboxRich.text],
        }))}
      />

      <div className={classes.dropdown}>
        <DropdownList
          title={strings.convenience}
          expression={strings.bed}
          itemList={dropdownRoomParam.map((room, key) => ({
            ...room,
            value: filter.dropdownRoom[key],
            title: initValueStrings.dropdownRoomParam[room.title],
          }))}
          createExpression={(itemList) => sumWords({ itemList, locale: roomStrings.dropdown })}
          isButtons={false}
          onChange={(itemList) => handleDropdownRoomChange(itemList)}
        />
      </div>

      <ExpandableCheckboxGroup
        title={strings.additionalConvenience}
        onChange={(newItems) => handleCheckboxListChange(newItems)}
      />
    </form>
  );
};

export default FilterRoom;
export type { IFilterState };
