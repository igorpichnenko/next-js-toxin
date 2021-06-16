import { declOfNum } from 'utils/helpers';
import { IDropdownListItem } from 'components/DropdownList/DropdownList';

interface ISumObject {
  itemList: IDropdownListItem[];
  locale: string[][];
}

const sumWords = ({ itemList, locale }: ISumObject) => itemList
  .reduce((sum: string[], item, key) => {
    if (item.value > 0) {
      sum.push(`${item.value} ${declOfNum(item.value, locale[key])}`);
    }
    return sum;
  }, [])
  .join(', ');

export default sumWords;
export type { ISumObject };
