import LocalizedStrings from 'react-localization';
import registrationLocale from 'public/locales/pages/auth/registration/registration';
import { useRouter } from 'next/router';

import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth';
import wrapper, { SagaStore } from 'redux/store';
import { setLogin, IContextExtendedWithAuth } from 'redux/auth/authActions';
import { END } from 'redux-saga';

import CardReg from 'components/CardReg/CardReg';
import AuthLayout from 'layouts/AuthLayout/AuthLayout';

import TransitionAlerts from 'components/TransitionAlerts/TransitionAlerts';
import { useSelector } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';
import classes from './registration.module.scss';

const strings = new LocalizedStrings(registrationLocale);

const Registration = () => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);
  const { loginError } = useSelector((state: State) => state.auth);
  return (
    <AuthLayout title={strings.title} description={strings.userRegistration}>
      <div className={classes.wrapper}>
      <TransitionAlerts errorCode={loginError?.code || loginError?.message} />
        <CardReg />
      </div>
    </AuthLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  wrapper.getServerSideProps(
    (store) => async (ctx: IContextExtendedWithAuth) => {
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
    },
  ),
);

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Registration);
