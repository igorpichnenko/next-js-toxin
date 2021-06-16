import LocalizedStrings from 'react-localization';
import wishesCardLocale from 'public/locales/components/wishesCard/wishesCard';
import createExpressionGuests from 'public/locales/utils/createExpressionGuest';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';

import Datepicker from 'components/Datepicker/Datepicker';
import DropdownList, {
  IDropdownListItem,
} from 'components/DropdownList/DropdownList';
import formatGuests from 'components/DropdownList/createExpression/formatGuests';
import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';
import { initState } from 'components/FilterRoom/initValues';
import { changeForm } from 'redux/filter/filterActions';
import classes from './wishesCard.module.scss';

const strings = new LocalizedStrings(wishesCardLocale);
const guestStrings = new LocalizedStrings(createExpressionGuests);

const WishesCard = () => {
  const router = useRouter();
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);
  guestStrings.setLanguage(locale);

  const dispatch = useDispatch();
  const { filter } = useSelector((state: State) => state.filter);

  const onChangeDateInfo = (start: Date | null, end: Date | null) => {
    const [defaultStart, defaultEnd] = initState.datepicker;

    const dateStart = start ? start.toISOString().split('T')[0] : defaultStart;
    const dateEnd = end ? end.toISOString().split('T')[0] : defaultEnd;
    const correctData = [dateStart, dateEnd];
    dispatch(changeForm({ ...filter, datepicker: correctData }));
  };

  const handleDropdownChange = (value: IDropdownListItem[]) => {
    const arr = Object.values(value);
    const newData = Object.fromEntries(arr.map((n) => [n.title, n.value]));
    const correctData = Object.values(newData);
    dispatch(changeForm({ ...filter, dropdownGuest: correctData }));
  };

  const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    router.push(
      {
        pathname: '/rooms-filter/1',
        query: {
          ...filter,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <section className={classes.wishesCard}>
      <div className={classes.wrap}>
        <form onSubmit={onSubmitForm}>
          <fieldset className={classes.fieldset}>
            <legend className={classes.title}>
              <Typography variant="h1">{strings.title}</Typography>
            </legend>
            <div className={classes.group}>
              <Datepicker
                onChange={onChangeDateInfo}
                start={new Date(filter.datepicker[0])}
                end={new Date(filter.datepicker[1])}
              />
            </div>
            <div className={classes.group}>
              <DropdownList
                title={strings.guests}
                expression={strings.guestsAmount}
                itemList={[
                  {
                    title: strings.grownUps,
                    value: filter.dropdownGuest[0],
                    id: 1,
                  },
                  {
                    title: strings.children,
                    value: filter.dropdownGuest[1],
                    id: 2,
                  },
                  {
                    title: strings.babies,
                    value: filter.dropdownGuest[2],
                    id: 3,
                  },
                ]}
                createExpression={(itemList) => formatGuests({
                  itemList,
                  locale: guestStrings.dropdown,
                })
                }
                isButtons
                onChange={handleDropdownChange}
              />
            </div>
          </fieldset>
          <Button
            value={strings.findRoom}
            type="submit"
            element="button"
            variant="big"
            icon
          />
        </form>
      </div>
    </section>
  );
};

export default WishesCard;
