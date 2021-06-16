import LocalizedStrings from 'react-localization';
import roomsFilterLocale from 'public/locales/pages/rooms-filter/rooms-filter';

import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { setLogin, IContextExtendedWithAuth } from 'redux/auth/authActions';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';
import { END } from 'redux-saga';

import MainLayout from 'layouts/MainLayout';
import Pagination from 'components/Pagination/Pagination';
import FilterRoom, { IFilterState } from 'components/FilterRoom/FilterRoom';
import Typography from 'components/Typography/Typography';
import Cards from 'components/Cards/Cards';
import Container from 'components/Container/Container';
import wrapper, { SagaStore } from 'redux/store';
import { changeForm } from 'redux/filter/filterActions';

import parseQuery from 'components/FilterRoom/helpers';
import TransitionAlerts from 'components/TransitionAlerts/TransitionAlerts';
import classes from './roomsFilter.module.scss';

const strings = new LocalizedStrings(roomsFilterLocale);

const Index = () => {
  const rooms = useSelector((state: State) => state.filter.rooms);
  const { filter, error } = useSelector((state: State) => state.filter);
  const router = useRouter();
  const id: number = Number(router.query.id);
  const [page, setPage] = useState(id);
  const startCard = (id - 1) * 12;
  const endCard = id * 12;
  const isRoomsExist = rooms && rooms?.length > 12;
  const currentCards = rooms ? rooms.slice(startCard, endCard) : [];

  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const changeUrl = (currentPage?: number) => (queryFilter: IFilterState) => {
    router.push(
      {
        pathname: `/rooms-filter/${currentPage || page}`,
        query: {
          ...queryFilter,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const handlerChangePagination = (e: React.ChangeEvent<unknown>, currentPage: number) => {
    e.preventDefault();
    setPage(currentPage);
    changeUrl(currentPage)(filter);
  };
  return (
    <MainLayout title={strings.title} description={strings.title} withFooterBorder>
      <Container>
        <TransitionAlerts errorCode={error?.code || error?.message} />
        <section className={classes.roomsFilter}>
          <div className={classes.filter}>
            <FilterRoom changeUrl={changeUrl()} />
          </div>

          <div className={classes.content}>
            <div className={classes.title}>
              <Typography variant="h1">{strings.foundForYou}</Typography>
            </div>

            <Cards rooms={currentCards} />

            <div className={classes.pagination}>
              {isRoomsExist ? (
                <Pagination
                  key={`pagination-page-${page}`}
                  defaultPage={page}
                  count={rooms ? Math.ceil(rooms.length / 12) : 12}
                  onChange={handlerChangePagination}
                />
              ) : null}
            </div>
          </div>
        </section>
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  wrapper.getServerSideProps((store: SagaStore) => async (ctx: IContextExtendedWithAuth) => {
    const { query } = ctx;
    if (ctx.AuthUser) {
      const { id = '', email = '' } = ctx.AuthUser;
      if (id) {
        store.dispatch(
          setLogin({
            password: '',
            email,
            uid: id,
          }),
        );
      }
    }

    const init = parseQuery(query);
    store.dispatch(changeForm(init));
    store.dispatch(END);

    store.dispatch(END);
    await store.sagaTask?.toPromise();
    return {
      props: {},
    };
  }),
);

export default withAuthUser()(Index);
