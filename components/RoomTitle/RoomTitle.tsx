import LocalizedStrings from 'react-localization';
import roomTitleLocale from 'public/locales/components/roomTitle/roomTitle';
import { useRouter } from 'next/router';

import { prettifySum } from 'utils/helpers';
import classes from './RoomTitle.module.scss';

type RoomType = 'luxury';

interface IRoomTitlePropsType {
  number: string;
  type?: RoomType;
  price: number;
}

const strings = new LocalizedStrings(roomTitleLocale);

const RoomTitle = ({ number, type, price }: IRoomTitlePropsType) => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  return (
    <h3 className={classes.roomTitle}>
      <span>
        <span className={classes.numSymbol}>№</span>&nbsp;
        <span className={classes.num}>{number}</span>
        {type && <span className={classes.type}>{strings[type]}</span>}
      </span>

      <span className={classes.price}>
        {prettifySum(price)}&#8381;&nbsp;
        <span className={classes.day}>{strings.perDay}</span>
      </span>
    </h3>
  );
};

export type { RoomType };
export default RoomTitle;
