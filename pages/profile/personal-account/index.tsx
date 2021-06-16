import LocalizedStrings from 'react-localization';
import profileLocale from 'public/locales/pages/profile/personal-account/personal-account';
import personalTabsLocale from 'public/locales/components/personalTabs/personalTabs';
import { useRouter } from 'next/router';

import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth';
import wrapper, { SagaStore } from 'redux/store';
import { setLogin, IContextExtendedWithAuth } from 'redux/auth/authActions';
import { END } from 'redux-saga';

import MainLayout from 'layouts/MainLayout';
import Container from 'components/Container/Container';
import Tabs from 'components/Tabs/Tabs';
import Tab from 'components/Tabs/components/Tab/Tab';
import PersonalCard from 'components/PersonalCard/PersonalCard';
import PasswordCard from 'components/PasswordCard/PasswordCard';
import Typography from 'components/Typography/Typography';

import TransitionAlerts from 'components/TransitionAlerts/TransitionAlerts';
import { useSelector } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';
import classes from './personalAccount.module.scss';

const strings = new LocalizedStrings(profileLocale);
const personalStrings = new LocalizedStrings(personalTabsLocale);

const PersonalAccount = () => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);
  personalStrings.setLanguage(locale);
  const { loginError } = useSelector((state: State) => state.auth);

  return (
    <MainLayout
      title={strings.title}
      description={strings.title}
      withFooterBorder
    >
         <TransitionAlerts errorCode={loginError?.code || loginError?.message} />
      <div className={classes.main}>
        <Container>
          <div className={classes.wrap}>
            <div className={classes.titleWrap}>
              <Typography variant="h1">{strings.title}</Typography>
            </div>
            <Tabs>
              <Tab title={personalStrings.data}>
                <PersonalCard />
              </Tab>
              <Tab title={personalStrings.security}>
                <PasswordCard />
              </Tab>
            </Tabs>
          </div>
        </Container>
      </div>
    </MainLayout>
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
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(PersonalAccount);
