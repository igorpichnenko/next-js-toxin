import wrapper from 'redux/store';
import { useEffect } from 'react';
import initAuth from 'services/initAuth';
import { setPageHydration } from 'redux/toxinApp/toxinAppAction';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';
import PageLoader from 'layouts/components/PageLoader/PageLoader';

import 'styles/main.scss';
import 'node_modules/focus-visible/dist/focus-visible.min.js';
import 'components/Datepicker/reactDatepicker.scss';
import { AppProps } from 'next/dist/next-server/lib/router/router';

initAuth();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();
  const { pageLoading, pageHydrated } = useSelector((state: State) => state.toxinApp);
  useEffect(() => {
    if (!pageHydrated) {
      dispatch(setPageHydration(true));
    }
  }, []);

  return pageLoading ? <PageLoader /> : <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
