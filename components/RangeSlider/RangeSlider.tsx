import React, { useEffect, useRef, useState } from 'react';
import ReactSlider from 'react-slider';
import classes from './rangeSlider.module.scss';

interface IParamType {
  valueFrom: number;
  valueTo: number;
  max: number;
  min: number;
  separate: string;
  postfix: string;
  title: string;
}

interface IRangeSliderProps {
  param: IParamType;
  onChange: (newItems: number[]) => void;
}

const RangeSlider = ({ param, onChange }: IRangeSliderProps) => {
  const inputEl = useRef<HTMLInputElement>(null);

  const { separate, postfix, min, max, title, valueFrom, valueTo } = param;
  const [correctValue, setCorrectValue] = useState([valueFrom, valueTo]);
  const [position, setPosition] = useState(0);
  const [inputValue, setInputValue] = useState([valueFrom, valueTo]);
  const [inputState, setInputState] = useState([valueFrom, valueTo]);

  const [fromVal, toVal] = inputState;
  const newCursorPosition = position;

  const validateValue = () => {
    let [from, to] = inputValue;

    if (from > to) from = to;
    if (to > max) to = max;
    if (from > max) from = max;

    const newValue = [from, to];
    setCorrectValue(newValue);
    setInputState(newValue);
    onChange(newValue);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') validateValue();
  };

  const saveCursor = (value: string, selectionEnd: number | null) => {
    let rightPosition = 0;
    if (!selectionEnd) rightPosition = value.length;
    if (selectionEnd) rightPosition = value.length - selectionEnd;
    const newPosition = value.length - rightPosition;
    setPosition(newPosition);
  };
  useEffect(() => {
    inputEl.current?.setSelectionRange(newCursorPosition, newCursorPosition);
  }, [newCursorPosition]);

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionEnd } = event.target;
    saveCursor(value, selectionEnd);

    const inputRgx = /[ ₽]/g;
    const val = value.replace(inputRgx, '').split('-');
    const isOutRange = val.length > 2 || val.length <= 1;
    if (isOutRange) return;
    const [from, to] = val.map((el: string) => Number(el));
    if (Number.isNaN(from)) return;
    if (Number.isNaN(to)) return;

    const newValue = [from, to];
    setInputValue(newValue);
    setInputState(newValue);
  };

  const handlerSliderChange = (newValue: number[]) => {
    setCorrectValue(newValue);
    setInputState(newValue);
    onChange(newValue);
  };

  const reSeparate = /\B(?=(\d{3})+(?!\d))/g;

  const valFrom = `${String(fromVal).replace(reSeparate, separate)}${postfix}`;
  const valTo = `${String(toVal).replace(reSeparate, separate)}${postfix}`;

  return (
    <>
      <div className={classes.container}>
        <h3 className={classes.title}>{title}</h3>
        <label>
          <input
            type="text"
            ref={inputEl}
            className={classes.input}
            value={`${valFrom} - ${valTo}`}
            onChange={handleInputOnChange}
            onBlur={validateValue}
            onKeyPress={handleInputKeyPress}
          />
        </label>
      </div>
      <ReactSlider
        value={correctValue}
        min={min}
        max={max}
        onChange={handlerSliderChange}
        className={classes.slider}
        thumbClassName={classes.thumb}
        trackClassName={classes.track}
      />
    </>
  );
};

export default RangeSlider;
export type { IParamType };
