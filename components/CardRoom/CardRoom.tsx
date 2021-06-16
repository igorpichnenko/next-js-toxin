import LocalizedStrings from 'react-localization';
import cardRoomLocale from 'public/locales/components/cardRoom/cardRoom';
import { useRouter } from 'next/router';

import { useState } from 'react';
import RoomTitle, { RoomType } from 'components/RoomTitle/RoomTitle';
import Link from 'next/link';
import { declOfNum } from 'utils/helpers';
import Carousel from './components/Carousel/Carousel';
import classes from './cardRoom.module.scss';
import Rate from './components/Rate/Rate';

interface ICardRoomPropTypes {
  imagesSrc: string[];
  number: string;
  type?: RoomType;
  price: number;
  reviews: number;
  rate: number;
  id: number;
  cardKey: number;

  onClick: (key: number) => void;
}

const strings = new LocalizedStrings(cardRoomLocale);

const CardRoom = ({
  imagesSrc,
  number,
  type,
  price,
  reviews,
  rate,
  id,
  onClick,
  cardKey,
}: ICardRoomPropTypes) => {
  const [isHover, setIsHover] = useState(false);

  const handlerMouseEnter = () => {
    setIsHover(true);
  };
  const handlerMouseLeave = () => {
    setIsHover(false);
  };

  const handlerClick = () => {
    onClick(cardKey);
  };

  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const declinedReviewStr = () => declOfNum(reviews, strings.review);

  return (
    <Link href={`/room-details/${id}`} shallow={true}>
      <a
        className={classes.cardRoom}
        onMouseEnter={handlerMouseEnter}
        onMouseLeave={handlerMouseLeave}
        onClick={handlerClick}
      >
        <div>
          <Carousel imagesSrc={imagesSrc} isHover={isHover} />
        </div>
        <div className={classes.body}>
          <div className={classes.bodyItem}>
            <RoomTitle number={number} type={type} price={price} />
          </div>
          <div className={classes.bodyItem}>
            <Rate rate={rate} />
            <span className={classes.reviews}>
              {reviews}&nbsp;
              <span className={classes.reviewText}>{declinedReviewStr()}</span>
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CardRoom;
export type { ICardRoomPropTypes };
