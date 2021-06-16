import LocalizedStrings from 'react-localization';
import indexPageLocale from 'public/locales/pages/index/index';
import { useRouter } from 'next/router';

import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import wrapper, { SagaStore } from 'redux/store';
import { setLogin, IContextExtendedWithAuth } from 'redux/auth/authActions';
import { END } from 'redux-saga';

import MainLayout from 'layouts/MainLayout';
import Container from 'components/Container/Container';
import WishesCard from 'components/WishesCard/WishesCard';
import TransitionAlerts from 'components/TransitionAlerts/TransitionAlerts';
import { useSelector } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';
import classes from './index.module.scss';

const strings = new LocalizedStrings(indexPageLocale);

const Index = () => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);
  const { loginError } = useSelector((state: State) => state.auth);
  return (
    <MainLayout title={strings.title} description={strings.description}>
       <TransitionAlerts errorCode={loginError?.code || loginError?.message} />
      <div className={classes.indexBlock}>
        <Container>
          <div className={classes.wrap}>
            <WishesCard />
          </div>
          <div className={classes.slogan}>
            <p>{strings.slogan}</p>
          </div>
        </Container>
      </div>
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
      }
    }

    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();
    return {
      props: {},
    };
  }),
);

export default withAuthUser()(Index);
