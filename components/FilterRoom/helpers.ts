import { IFilterState } from './FilterRoom';

interface IQueryType {
  dropdownGuest?: string[];
  dropdownRoom?: string[];
  checkboxRule?: string[];
  checkboxRich?: string[];
  checkboxList?: string[];
  rangeSlider?: string[];
  datepicker?: string[];
  id?: string;
}

function parseQuery(data: IQueryType): IFilterState {
  const {
    dropdownGuest = ['0', '0', '0'],
    dropdownRoom = ['0', '0', '0'],
    checkboxRule = ['false', 'false', 'false'],
    checkboxRich = ['false', 'false'],
    checkboxList = ['false', 'false', 'false', 'false', 'false', 'false'],
    rangeSlider = ['0', '1500'],
    datepicker = ['2021-05-14', '2021-05-19'],
  } = data;

  function parseValue(param: Function, value: string[] = ['']) {
    const arr = [value?.toString()];
    return JSON.parse(`[${arr[0]}]`).map(param);
  }

  return {
    dropdownGuest: parseValue(Number, dropdownGuest),
    dropdownRoom: parseValue(Number, dropdownRoom),
    datepicker,
    checkboxRule: parseValue(Boolean, checkboxRule),
    checkboxRich: parseValue(Boolean, checkboxRich),
    checkboxList: parseValue(Boolean, checkboxList),
    rangeSlider: parseValue(Number, rangeSlider),
  };
}

export default parseQuery;
