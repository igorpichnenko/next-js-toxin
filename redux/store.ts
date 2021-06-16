import { createStore, applyMiddleware, Store } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createReduxSagaMiddleware, { Task } from 'redux-saga';
import rootSaga from './rootSaga/rootSaga';
import rootReducer, { State } from './rootReducer/rootReducer';

const environment = process.env.NODE_ENV;
const isDev = environment === 'development';

interface SagaStore extends Store {
  sagaTask?: Task;
}

const makeStore: MakeStore<Store<State>> = () => {
  const sagaMiddleware = createReduxSagaMiddleware();
  const store: SagaStore = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
const wrapper = createWrapper<Store<State>>(makeStore, { debug: isDev });

export type { SagaStore };

export default wrapper;
