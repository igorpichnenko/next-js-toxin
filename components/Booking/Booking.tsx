import LocalizedStrings from 'react-localization';
import createExpressionGuests from 'public/locales/utils/createExpressionGuest';
import bookingCardLocale from 'public/locales/components/booking/booking';
import formatGuests from 'components/DropdownList/createExpression/formatGuests';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Datepicker from 'components/Datepicker/Datepicker';
import DropdownList from 'components/DropdownList/DropdownList';
import Button from 'components/Button/Button';

import { updateBooking } from 'redux/booking/bookingActions';
import { State } from 'redux/rootReducer/rootReducer';

import { declOfNum } from 'utils/helpers';
import stringDays from 'public/locales/utils/stringDays';

import TransitionAlerts from 'components/TransitionAlerts/TransitionAlerts';
import classes from './booking.module.scss';

const Booking = () => {
  const { locale = 'ru' } = useRouter();
  const guestStrings = new LocalizedStrings(createExpressionGuests);
  guestStrings.setLanguage(locale);
  const strings = new LocalizedStrings(bookingCardLocale);
  strings.setLanguage(locale);
  const dayString = new LocalizedStrings(stringDays);
  dayString.setLanguage(locale);

  const roomDate = {
    number: '',
    isLuxury: false,
    price: 0,
    discount: 0,
    collection: 0,
  };

  const room = useSelector((state: State) => state.roomDetails.room);
  const { error } = useSelector((state: State) => state.booking);
  if (room) {
    roomDate.number = room.number;
    roomDate.isLuxury = room.isLuxury;
    roomDate.price = room.price;
    roomDate.discount = room.discount;
    roomDate.collection = room.collection;
  }

  const { number, isLuxury, price, discount, collection } = roomDate;

  const { datepicker, dropdownGuest } = useSelector((state: State) => state.filter.filter);

  const uid = useSelector((state: State) => state.auth.uid);

  const dispatch = useDispatch();

  const setSpaceToString = (text: number) => String(text)
    .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1'.concat(' '));

  const millisecondsPerDay = 86400000;

  const luxury = isLuxury ? strings.luxury : null;
  const stringPrice = setSpaceToString(price);
  const stringDiscount = setSpaceToString(discount);
  const stringCollection = setSpaceToString(collection);

  const [dateStart, setDateStart] = useState<Date | null>(new Date(datepicker[0]));
  const [dateEnd, setDateEnd] = useState<Date | null>(new Date(datepicker[1]));
  const [dropdownGuestsList, setDropdownGuestsList] = useState([
    { title: strings.adults, value: dropdownGuest[0], id: 1 },
    { title: strings.children, value: dropdownGuest[1], id: 2 },
    { title: strings.babies, value: dropdownGuest[2], id: 3 },
  ]);
  const [rangeDays, setRangeDays] = useState(0);
  const [stringCostOfStay, setStringCostOfStay] = useState('');
  const [stringTotal, setStringTotal] = useState('');

  useEffect(() => {
    if (dateEnd && dateStart) {
      setRangeDays((Number(new Date(dateEnd)) - Number(new Date(dateStart))) / millisecondsPerDay);
    }
  }, [dateEnd]);

  useEffect(() => {
    setStringCostOfStay(setSpaceToString(rangeDays * price));
    if (rangeDays * price - discount + collection > 0) {
      setStringTotal(setSpaceToString(rangeDays * price - discount + collection));
    } else {
      setStringTotal('0');
    }
  }, [rangeDays]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dateStart && dateEnd && uid) {
      dispatch(updateBooking({
        bookingDates: {
          bookingStart: dateStart.toISOString().substring(0, 10),
          bookingEnd: dateEnd.toISOString().substring(0, 10),
          uid,
        },
        bookingGuestsList: dropdownGuestsList,
        roomId: Number(number),
      }));
    }
  };

  const disabledButton = !uid;
  const days = rangeDays || 0;

  return (
    <form className={classes.booking} onSubmit={handleFormSubmit}>
        <TransitionAlerts errorCode={error?.message} />
      <div className={classes.bookingHeader}>
        <div>
          <span className={classes.symbol}>№ </span>
          <span className={classes.number}>{number}</span>
          <span className={classes.luxury}>{luxury}</span>
        </div>
        <div>
          <span className={classes.priceValue}>{stringPrice}₽ </span>
          <span className={classes.priceText}>{strings.perDay}</span>
        </div>
      </div>
      <div className={classes.containerDatepicker}>
        <Datepicker
          start={dateStart}
          end={dateEnd}
          onChange={(start, end) => {
            setDateStart(start);
            setDateEnd(end);
          }}
        />
      </div>
      <div className={classes.containerDropdownList}>
        <DropdownList
          title={strings.guests}
          expression={strings.howManyGuests}
          itemList={[
            { title: strings.adults, value: dropdownGuest[0], id: 1 },
            { title: strings.children, value: dropdownGuest[1], id: 2 },
            { title: strings.babies, value: dropdownGuest[2], id: 3 },
          ]}
          createExpression={(itemList) => formatGuests({ itemList, locale: guestStrings.dropdown })}
          isButtons={true}
          onChange={(itemList) => setDropdownGuestsList(itemList)}
        />
      </div>
      <ul className={classes.itemList}>
        <li className={classes.item}>
          <span
            className={classes.itemText}>
              {stringPrice}₽ х {days} {declOfNum(days, dayString.days)}
            </span>
          <span className={classes.itemValue}>{stringCostOfStay}₽</span>
        </li>
        <li className={classes.item}>
          <span className={classes.itemText}>
            {strings.strDiscount} {stringDiscount}₽
            <span className={classes.itemIcon}>i</span>
          </span>
          <span className={classes.itemValue}>0₽</span>
        </li>
        <li className={classes.item}>
          <span className={classes.itemText}>
            {strings.strCollection}
            <span className={classes.itemIcon}>i</span>
          </span>
          <span className={classes.itemValue}>{stringCollection}₽</span>
        </li>
      </ul>
      <div className={classes.total}>
        <h2 className={classes.totalTitle}>{strings.total}</h2>
        <div className={classes.totalLine}></div>
        <h2 className={classes.totalValue}>{stringTotal}₽</h2>
      </div>
      <div className={classes.containerButton}>
        <Button
          value={strings.toBook}
          type="submit"
          variant="big"
          element="button"
          icon
          disabled={disabledButton}
        />
      </div>
    </form>
  );
};

export default Booking;
