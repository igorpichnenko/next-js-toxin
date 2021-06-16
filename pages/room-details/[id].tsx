import LocalizedStrings from 'react-localization';
import roomDetailsLocale from 'public/locales/pages/room-details/room-details';

import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { setLogin, IContextExtendedWithAuth } from 'redux/auth/authActions';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { State } from 'redux/rootReducer/rootReducer';
import { END } from 'redux-saga';
import wrapper, { SagaStore } from 'redux/store';
import { getRoomDetailsStart } from 'redux/roomDetails/roomDetailsActions';

import MainLayout from 'layouts/MainLayout';
import Container from 'components/Container/Container';
import RoomPhotos from 'components/RoomPhotos/RoomPhotos';
import Impressions from 'components/Impressions/Impressions';
import Booking from 'components/Booking/Booking';
import ReviewList, { IReviewItem } from 'components/ReviewList/ReviewList';
import Rules from 'components/Rules/Rules';
import Cancel from 'components/Cancel/Cancel';
import Features from 'components/Features/Features';
import AddComment from 'components/AddComment/AddComment';
import TransitionAlerts from 'components/TransitionAlerts/TransitionAlerts';
import { removeComment } from 'redux/comment/commentActions';
import classes from './roomDetails.module.scss';

const strings = new LocalizedStrings(roomDetailsLocale);

const Index = () => {
  const dispatch = useDispatch();
  const { room, error } = useSelector((state: State) => state.roomDetails);
  const auth = useSelector((state: State) => state.auth);
  const { query, locale = 'ru' } = useRouter();
  const { id } = query;

  strings.setLanguage(locale);

  const onLoad = () => {
    if (room) return;
    dispatch(getRoomDetailsStart(Number(id)));
  };

  let init: IReviewItem[] = [];
  if (room) {
    init = room.reviews;
  }

  const [state, setState] = useState(init);

  useEffect(() => {
    onLoad();
  }, []);

  const onReviewRemove = (value: IReviewItem) => {
    if (value.userId === auth.uid) {
      if (room) dispatch(removeComment(value, room.dbID));

      const newState = state.filter((val) => val.userId !== value.userId);
      setState(newState);
    }
  };
  return (
    <MainLayout title={strings.title} description={strings.title} withFooterBorder>
      <TransitionAlerts errorCode={error?.code || error?.message} />
      {room && (
        <div className={classes.photosWrapper}>
          <RoomPhotos
            roomPhotosParam={{
              mainImage: room.images[0],
              auxImage: room.images.slice(1, 3),
            }}
          />
        </div>
      )}

      <Container>
        {room && (
          <section className={classes.content}>
            <div className={classes.detailsWrapper}>
              <div className={classes.itemsWrapper}>
                <div className={classes.itemFeatures}>
                  <Features featuresParam={room.roomDetails} />
                </div>

                <div className={classes.item}>
                  <Impressions
                    impressionsParam={{
                      title: strings.impressions,
                      legend: {
                        ok: strings.satisfactorily,
                        excellent: strings.excellent,
                        good: strings.good,
                        poor: strings.disappointed,
                      },
                      diagram: {
                        width: 120,
                        height: 120,
                        innerRadius: 56,
                        outerRadius: 60,

                        items: room.impressionsAboutTheRoom,
                      },
                    }}
                  />
                </div>
              </div>

              <div className={classes.itemsWrapper}>
                <ReviewList
                  onReviewRemove={onReviewRemove}
                  reviewListParam={{
                    title: strings.reviews,
                    items: state,
                  }}
                  onChange={() => console.log()}
                />
                <AddComment
                  onChange={(val) => setState([...state, val])}
                  addCommentsParams={{ dbID: room.dbID }}
                />
              </div>

              <div className={classes.itemsWrapper}>
                <div className={classes.itemRules}>
                  <Rules rules={room.rules} />
                </div>
                <div className={classes.itemCancel}>
                  <Cancel />
                </div>
              </div>
            </div>
            <aside className={classes.cardWrapper}>{<Booking />}</aside>
          </section>
        )}
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  wrapper.getServerSideProps((store: SagaStore) => async (ctx: IContextExtendedWithAuth) => {
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

    const { params } = ctx;

    const currentState = store.getState();
    if (params && !currentState.roomDetails.room) {
      store.dispatch(getRoomDetailsStart(Number(params.id)));
    }

    store.dispatch(END);
    await store.sagaTask?.toPromise();
    return {
      props: {},
    };
  }),
);

export default withAuthUser()(Index);
