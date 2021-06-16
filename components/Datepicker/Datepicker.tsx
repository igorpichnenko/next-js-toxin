import LocalizedStrings from 'react-localization';
import buttonListLocale from 'public/locales/components/buttonList/buttonList';
import datePickerLocale from 'public/locales/components/datePicker/datePicker';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ru from 'date-fns/locale/ru';
import uk from 'date-fns/locale/uk';
import en from 'date-fns/locale/en-US';
import 'react-datepicker/dist/react-datepicker.css';

import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';
import { formattedValueSingle } from 'utils/helpers';
import InputDatepicker from './components/InputDatepicker/inputDatepicker';
import DatepickerWrapper from './components/DatepickerWrapper/DatepickerWrapper';

import classes from './datepicker.module.scss';

type Lang = 'ru' | 'en' | 'ua';

interface IDatepickerPropsTypes {
  variant?: string;
  start?: Date | null;
  end?: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
}

const dayLocales = {
  en: { value: en, shortcut: 'en-US' },
  ru: { value: ru, shortcut: 'ru' },
  ua: { value: uk, shortcut: 'uk' },
};

const buttonStrings = new LocalizedStrings(buttonListLocale);
const strings = new LocalizedStrings(datePickerLocale);

function Datepicker({
  variant = 'double',
  onChange,
  start = null,
  end = null,
}: IDatepickerPropsTypes) {
  const [startDate, setStartDate] = useState<Date | null>(start);
  const [endDate, setEndDate] = useState<Date | null>(end);
  const [selectionComplete, toggleSelectionComplete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClickOutSide, setClickOutSide] = useState(false);

  const { locale = 'ru' } = useRouter();
  const typeLocale = locale as Lang;
  buttonStrings.setLanguage(locale);
  strings.setLanguage(locale);

  useEffect(() => {
    if (startDate && endDate) toggleSelectionComplete(true);
  }, [selectionComplete]);
  const isAllDatesSelected = () => selectionComplete && startDate && endDate;

  const handleDateChange = (date: Date) => {
    if (!selectionComplete && !startDate) {
      // on first date selection, set the start date
      onChange(date, null);
      setStartDate(date);
      return;
    }
    if (!selectionComplete && startDate && !endDate) {
      // on second date selection, set the end date
      setEndDate(date);
      if (startDate.getTime() > date.getTime()) {
        setEndDate(startDate);
        setStartDate(date);
        toggleSelectionComplete(true);
        onChange(date, endDate);
        return;
      }
      toggleSelectionComplete(true);
      // do stuff with date range
      onChange(startDate, date);
      return;
    }

    if (isAllDatesSelected()) {
      // on third date selection, begin selection of a new date range
      // reset the start date and clear the end date.
      setStartDate(date);
      setEndDate(null);
      toggleSelectionComplete(false);
    }
  };

  const showCalendar = () => {
    if (isClickOutSide) return;
    setIsOpen(true);
    onChange(startDate, endDate);
  };

  const hideCalendar = () => {
    onChange(startDate, endDate);
  };

  const handlerClickOutside = () => {
    if (!isOpen) {
      setClickOutSide(false);
      return;
    }
    setClickOutSide(true);
    setIsOpen(false);
    onChange(startDate, endDate);
  };

  const handlerClearClick = () => {
    setStartDate(null);
    setEndDate(null);
    toggleSelectionComplete(false);
    onChange(null, null);
  };

  const handlerAccessClick = () => {
    setIsOpen(false);
    onChange(startDate, endDate);
  };

  const renderCalendar = () => (
    <DatepickerWrapper isOpen={isOpen}>
      <DatePicker
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
        }: {
          date: Date;
          decreaseMonth: () => void;
          increaseMonth: () => void;
        }) => {
          const month = moment(date)
            .locale(dayLocales[typeLocale].shortcut)
            .startOf('month')
            .format('MMMM');
          const year = moment(date)
            .locale(dayLocales[typeLocale].shortcut)
            .startOf('year')
            .format('YYYY');
          return (
            <div className={classes.headerItem}>
              <div
                className="react-datepicker__arrow react-datepicker__arrow_left"
                onClick={decreaseMonth}
              ></div>
              <span className={classes.month}>
                {month.charAt(0).toLocaleUpperCase() + month.slice(1)}
              </span>
              &nbsp;
              <span className={classes.year}>{year}</span>
              <div className="react-datepicker__arrow" onClick={increaseMonth}></div>
            </div>
          );
        }}
        selected={startDate}
        locale={dayLocales[typeLocale].value}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date(Date.now())}
        onClickOutside={handlerClickOutside}
        inline
      >
        <div className={classes.buttonsWrapper}>
          <Button
            value={buttonStrings.clear}
            variant="noBg"
            element="button"
            onClick={handlerClearClick}
          />
          <Button
            value={buttonStrings.apply}
            variant="noBg"
            element="button"
            onClick={handlerAccessClick}
          />
        </div>
      </DatePicker>
    </DatepickerWrapper>
  );

  const renderDatepickerDouble = () => (
    <div className={classes.datepicker}>
      <div className={classes.inputsWrapper}>
        <div className={classes.inputItem}>
          <div className={classes.titleWrap}>
            <Typography variant="h3">{strings.checkIn}</Typography>
          </div>
          <InputDatepicker
            value={startDate ? moment(startDate).format('DD.MM.YYYY') : strings.datePlaceholder}
            showCalendar={showCalendar}
            hideCalendar={hideCalendar}
          />
        </div>
        <div className={classes.inputItem}>
          <div className={classes.titleWrap}>
            <Typography variant="h3">{strings.checkOut}</Typography>
          </div>
          <InputDatepicker
            value={endDate ? moment(endDate).format('DD.MM.YYYY') : strings.datePlaceholder}
            showCalendar={showCalendar}
            hideCalendar={hideCalendar}
          />
        </div>
      </div>
      {renderCalendar()}
    </div>
  );

  const renderDatepickerSingle = () => (
    <div className={classes.datepicker}>
      <InputDatepicker
        variant="single"
        value={formattedValueSingle(startDate, endDate, {
          from: strings.from,
          to: strings.to,
          lang: dayLocales[typeLocale].shortcut,
        })}
        showCalendar={showCalendar}
        hideCalendar={hideCalendar}
      />
      {renderCalendar()}
    </div>
  );

  return variant === 'double' ? renderDatepickerDouble() : renderDatepickerSingle();
}

export default Datepicker;
