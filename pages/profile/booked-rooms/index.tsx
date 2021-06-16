import LocalizedStrings from 'react-localization';
import bookedRoomsLocale from 'public/locales/pages/profile/booked-rooms-page/booked-rooms-page';
import { useRouter } from 'next/router';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';
import wrapper, { SagaStore } from 'redux/store';
import { setLogin, IContextExtendedWithAuth } from 'redux/auth/authActions';
import { END } from 'redux-saga';

import { State } from 'redux/rootReducer/rootReducer';
import { getUserRooms, removeUserRooms, IRemoveRequest } from 'redux/userRooms/userRoomsActions';

import MainLayout from 'layouts/MainLayout';

import Typography from 'components/Typography/Typography';
import Container from 'components/Container/Container';
import BookedRoomsList from 'components/BookedRoomsList/BookedRoomsList';

import TransitionAlerts from 'components/TransitionAlerts/TransitionAlerts';
import classes from './bookedRooms.module.scss';

const strings = new LocalizedStrings(bookedRoomsLocale);

const Index = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: State) => state.auth);
  const { userRooms, error } = useSelector((state: State) => state.userRooms);

  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const onLoad = () => {
    if (uid && !userRooms) {
      dispatch(getUserRooms(uid));
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onRemoveRoom = (removeReq: IRemoveRequest) => () => {
    if (uid) {
      dispatch(removeUserRooms(removeReq));
    }
  };

  return (
    <MainLayout title={strings.title} description={strings.title} withFooterBorder={true}>
      <TransitionAlerts errorCode={error?.code || error?.message} />
      <Container>
        <section className={classes.bookedRoomsPage}>
          <div className={classes.title}>
            <Typography variant="h1">{strings.title}</Typography>
          </div>
          {uid && userRooms && userRooms.length ? (
            <BookedRoomsList
              bookedRoomsListParam={{
                bookedRoomsList: userRooms,
                onRemoveRoom,
                uid,
              }}
            />
          ) : (
            strings.errorNeverBooked
          )}
        </section>
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  wrapper.getServerSideProps((store) => async (ctx: IContextExtendedWithAuth) => {
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

        const currentState = store.getState();
        if (!currentState.userRooms.userRooms) {
          store.dispatch(getUserRooms(id));
        }
      }
    }

    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();
    return {
      props: {},
    };
  }),
);

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
