import LocalizedStrings from 'react-localization';
import createExpressionGuests from 'public/locales/utils/createExpressionGuest';
import createExpressionRoomLocale from 'public/locales/utils/createExpressionRooms';
import { useRouter } from 'next/router';

import Input from 'components/Input/Input';
import Typography from 'components/Typography/Typography';
import Button from 'components/Button/Button';
import Datepicker from 'components/Datepicker/Datepicker';
import Toggle from 'components/Toggle/Toggle';
import SvgSprite from 'components/SvgSprite/SvgSprite';
import DropdownList from 'components/DropdownList/DropdownList';
import formatGuests from 'components/DropdownList/createExpression/formatGuests';
import sumWords from 'components/DropdownList/createExpression/sumWords';
import RadioGroup from 'components/RadioGroup/RadioGroup';
import CheckboxGroup from 'components/CheckboxGroup/CheckboxGroup';
import Impressions from 'components/Impressions/Impressions';
import RangeSlider from 'components/RangeSlider/RangeSlider';
import {
  checkboxParam,
  checkboxRichParam,
  rangeSliderParam,
} from 'components/FilterRoom/initValues';
import Rules from 'components/Rules/Rules';
import Features from 'components/Features/Features';
import { impressionsParam } from 'components/RoomDetails/mockValues';
import Cancel from 'components/Cancel/Cancel';
import { radioGroupParam } from 'utils/mockData';
import classes from './formElements.module.scss';

const dateMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

const guestStrings = new LocalizedStrings(createExpressionGuests);
const roomStrings = new LocalizedStrings(createExpressionRoomLocale);

const FormElements = () => {
  const { locale = 'ru' } = useRouter();
  guestStrings.setLanguage(locale);
  roomStrings.setLanguage(locale);

  return (
    <div className={classes.wrap}>
      <div className={classes.item}>
        <Typography variant="label">
          Masked text field
          <Input type="text" name="user-text" placeholder="Just text" onChange={() => {}} />
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography variant="label">
          Masked text field
          <Input
            type="text"
            name="user-date"
            placeholder="дд.мм.гг"
            mask={dateMask}
            onChange={() => {}}
          />
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography variant="label">
          Subscribe
          <Input
            type="email"
            name="user-email"
            placeholder="Email"
            withButton={true}
            onChange={() => {}}
          />
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography variant="h1">Найдём номера под ваши пожелания</Typography>
      </div>
      <div className={classes.item}>
        <Button value="Войти" variant="white" href="/sign-in" />
        <Button value="Зарегистрироваться" href="/registration" />
      </div>
      <Button value="Подобрать номер" element="button" variant="big" icon href="/registration" />
      <div className={classes.item}>
        <Button value="Отчистить" element="button" variant="noBg" />
        <Button value="Применить" element="button" variant="noBg" />
      </div>
      <div className={classes.item}>
        <Datepicker variant="single" onChange={(start, end) => console.log(start, end)} />
      </div>
      <div className={classes.item}>
        <Datepicker onChange={(start, end) => console.log(start, end)} />
      </div>

      <DropdownList
        title="гости"
        expression="Сколько гостей"
        itemList={[
          { title: 'Взрослые', value: 0, id: 1 },
          { title: 'Дети', value: 0, id: 2 },
          { title: 'Младенцы', value: 0, id: 3 },
        ]}
        createExpression={(itemList) => formatGuests({ itemList, locale: guestStrings.dropdown })}
        isButtons
        onChange={(itemList) => console.log(itemList)}
      />
      <DropdownList
        title="удобства номера"
        expression="2 спальни, 2 кровати..."
        itemList={[
          { title: 'Спальни', value: 2, id: 1 },
          { title: 'Кровати', value: 2, id: 2 },
          { title: 'Ванные комнаты', value: 0, id: 3 },
        ]}
        createExpression={(itemList) => sumWords({ itemList, locale: roomStrings.dropdown })}
        isButtons={false}
        onChange={(itemList) => console.log(itemList)}
      />

      <CheckboxGroup onChange={(newItems) => console.log(newItems)} checkboxParam={checkboxParam} />
      <CheckboxGroup
        onChange={(newItems) => console.log(newItems)}
        checkboxParam={checkboxRichParam}
      />

      <div className={classes.item}>
        <Toggle
          name="spOffer"
          label="Получать спецпредложения"
          defaultChecked
          onChange={(newItems) => console.log(newItems)}
        />
      </div>
      <div className={classes.item}>
        <Toggle
          name="spOffer"
          label="Получать спецпредложения"
          defaultChecked={false}
          onChange={(newItems) => console.log(newItems)}
        />
      </div>
      <div className={classes.item}>
        <RadioGroup
          radioGroupParam={radioGroupParam}
          onChange={(newSelect) => console.log(newSelect)}
        />
      </div>
      <div className={classes.container}>
        <RangeSlider onChange={(newItems) => console.log(newItems)} param={rangeSliderParam} />
        <p className={classes.text}>Стоимость за сутки пребывания в номере</p>
      </div>
      <div className={classes.item}>
        <Impressions impressionsParam={impressionsParam} />
      </div>

      <Rules
        rules={[
          {
            text: 'Нельзя с питомцами',
            id: 1,
          },
          {
            text: 'Без вечеринок и мероприятий',
            id: 2,
          },
          {
            text: 'Время прибытия — после 13:00, а выезд до 12:00',
            id: 3,
          },
        ]}
      />

      <Cancel />

      <div className={classes.item}>
        <div className={classes.item}>
          <Typography variant="h2">Сведения о номере</Typography>
        </div>
        <Features
          featuresParam={{
            isComfort: true,
            isConvenience: true,
            isCosiness: true,
          }}
        />
      </div>

      <SvgSprite />
    </div>
  );
};

export default FormElements;
