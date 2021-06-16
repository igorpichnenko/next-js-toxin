import { put, takeEvery, call, StrictEffect } from 'redux-saga/effects';
import { setPageLoading } from 'redux/toxinApp/toxinAppAction';
import fb from 'services/firebaseApi';
import { loginSuccess, loginError, ILoginStartAction, setLogin } from './authActions';
import ActionType from './authActionTypes';

type UserData = {
  user: {
    uid: string;
    photoURL: string | null;
  };
};

function* loginStartWorker(data: ILoginStartAction): Generator<StrictEffect, void, any> {
  yield put(setPageLoading(true));
  try {
    const { email, password } = data.payload;
    const userData = yield call(fb.authWithEmailAndPassword(), email, password);
    const typedData = userData as UserData;

    if (typedData) {
      yield put(setLogin({ email, password, uid: typedData.user.uid }));
    }
  } catch (e) {
    yield put(loginError({ code: e.code || null, message: e.message || null }));
  }
  yield put(setPageLoading(false));
}

function* watchLoginStart() {
  yield takeEvery(ActionType.LOGIN_START, loginStartWorker);
}

function* setLoginWorker(data: ILoginStartAction): Generator<StrictEffect, void, any> {
  try {
    const { email, uid = '' } = data.payload;
    const { name, surname, image } = yield call(fb.getDateBase(), `users/${uid}`);

    yield put(loginSuccess({ name, surname, email, uid, image }));
  } catch (e) {
    yield put(loginError({ code: e.code || null, message: e.message || null }));
  }
}

function* watchSetLogin() {
  yield takeEvery(ActionType.SET_LOGIN, setLoginWorker);
}

function* logOutWorker(): Generator<StrictEffect, void, any> {
  try {
    yield call(fb.signOut());
  } catch (e) {
    yield put(loginError({ code: e.code || null, message: e.message || null }));
  }
}

function* watchLogOut() {
  yield takeEvery(ActionType.LOG_OUT, logOutWorker);
}

export { watchLoginStart, watchSetLogin, watchLogOut };
