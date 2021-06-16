import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';

import { getRoomDetailsSuccess } from 'redux/roomDetails/roomDetailsActions';
import CardRoom from 'components/CardRoom/CardRoom';
import { IRoomsProps } from 'services/helpers';
import classes from './cards.module.scss';

interface ICardsProps {
  rooms: IRoomsProps[];
}

const Cards: FC<ICardsProps> = ({ rooms }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: State) => state.filter);

  const extractDateFromFilter = () => {
    if (filter) {
      const { datepicker } = filter;
      return { bookingStart: datepicker[0], bookingEnd: datepicker[1] };
    }
    return { bookingStart: '', bookingEnd: '' };
  };

  const extractGuestsFromFilter = () => {
    if (filter) {
      const { dropdownGuest } = filter;
      return { guestList: dropdownGuest };
    }
    return { guestList: [0, 0, 0] };
  };

  const setDetailedRoom = (key: number) => {
    dispatch(
      getRoomDetailsSuccess({
        ...rooms[key],
        ...extractDateFromFilter(),
        ...extractGuestsFromFilter(),
      }),
    );
  };
  return (
    <div className={classes.cards}>
      {rooms
        ? rooms.map((el, index: number) => (
            <CardRoom
              id={el.id}
              key={index}
              imagesSrc={el.images}
              number={el.number}
              type={el.isLuxury ? 'luxury' : undefined}
              price={el.price}
              reviews={el.numberOfReviews}
              rate={el.numberOfStars}
              onClick={setDetailedRoom}
              cardKey={index}
            />
        ))
        : ''}
    </div>
  );
};

export default Cards;
