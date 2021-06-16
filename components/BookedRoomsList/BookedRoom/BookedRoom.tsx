import LocalizedStrings from 'react-localization';
import CloseButton from 'components/CloseButton/CloseButton';
import bookedRoomLocale from 'public/locales/components/bookedRoom/bookedRoom';
import dateLocale from 'public/locales/utils/date';
import { useRouter } from 'next/router';

import Link from 'next/link';
import Typography from 'components/Typography/Typography';

import classes from './bookedRoom.module.scss';

const strings = new LocalizedStrings(bookedRoomLocale);
const dateStrings = new LocalizedStrings(dateLocale);

type Status = 'finished' | 'canceled' | 'booked';
type Currency = 'rub';
type Cities = 'moscow';

interface IBookedRoom {
  id: number;
  dbID: string;
  image: string;
  bookingStart: string;
  bookingEnd: string;
  place: Cities;
  status: Status;
  cost: number;
  currency: Currency;
}

interface IBookedRoomPropTypes {
  roomParam: IBookedRoom;
  onRemoveRoom: () => void;
}

const BookedRoom = ({ roomParam, onRemoveRoom }: IBookedRoomPropTypes) => {
  const { id, image, bookingStart, bookingEnd, place, status, cost, currency } = roomParam;

  const { locale = 'ru' } = useRouter();

  strings.setLanguage(locale);
  dateStrings.setLanguage(locale);

  const formatDate = (date: Date): string => `${date.getDate()} ${dateStrings.month[date.getMonth()]} ${date.getFullYear()}`;

  return (
    <div className={classes.bookedRoom}>
      <div className={classes.removeButtonContainer}>
        <CloseButton title={strings.remove} onClick={onRemoveRoom} />
      </div>
      <img className={classes.image} src={image} alt="booked-room" />
      <Link href={`/room-details/${id}`} shallow={true}>
        <a className={classes.content}>
          <div className={classes.title}>
            <Typography variant="h2">{`${strings.room} ${id}`}</Typography>
          </div>
          <div className={classes.text}>{strings[place]}</div>
          <div className={classes.text}>{`${formatDate(new Date(bookingStart))}  - ${formatDate(
            new Date(bookingEnd),
          )}`}</div>
          <div className={classes.text}>{strings[status]}</div>
          <div className={classes.text}>{`${cost} ${strings[currency]}`}</div>
        </a>
      </Link>
    </div>
  );
};

export default BookedRoom;
export type { IBookedRoomPropTypes, IBookedRoom, Status };
