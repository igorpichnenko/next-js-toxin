import LocalizedStrings from 'react-localization';
import loginLocale from 'public/locales/pages/auth/login/login';
import { useRouter } from 'next/router';

import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth';
import wrapper, { SagaStore } from 'redux/store';
import { setLogin, IContextExtendedWithAuth } from 'redux/auth/authActions';
import { END } from 'redux-saga';

import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import AuthCard from 'components/AuthCard/AuthCard';
import classes from './logIn.module.scss';

const strings = new LocalizedStrings(loginLocale);

const UserAuth = () => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  return (
    <AuthLayout
      title={strings.authorization}
      description={strings.userAuthorization}
    >
      <div className={classes.wrap}>

        <AuthCard />
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
})(UserAuth);
