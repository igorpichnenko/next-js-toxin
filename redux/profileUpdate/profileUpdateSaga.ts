import { put, takeEvery, call, select } from 'redux-saga/effects';
import { setPageLoading } from 'redux/toxinApp/toxinAppAction';
import { loginSuccess, loginError } from 'redux/auth/authActions';
import fb from 'services/firebaseApi';
import { IProfileUpdate, IPasswordUpdate } from './profileUpdateActions';
import ActionType from './profileUpdateActionTypes';

function* profileUpdateWorker(data: IProfileUpdate) {
  yield put(setPageLoading(true));
  const { auth } = yield select();
  const { uid } = auth;

  try {
    if (uid) {
      const { name, surname, email } = data.payload;
      const { gender, birthday, offer } = yield call(fb.getDateBase(), `users/${uid}`);
      yield call(fb.auth().updateEmail, email);
      yield call(fb.patchDB(), `users/${uid}/`, {
        name,
        surname,
        email,
        gender,
        birthday,
        offer,
      });

      yield put(loginSuccess({ name, surname, email, uid }));
    }
  } catch (e) {
    yield put(loginError({ code: e.code || null, message: e.message || null }));
  }

  yield put(setPageLoading(false));
}

function* watchProfileUpdate() {
  yield takeEvery(ActionType.PROFILE_UPDATE, profileUpdateWorker);
}

function* passwordUpdateWorker(data: IPasswordUpdate) {
  yield put(setPageLoading(true));
  try {
    const { auth } = yield select();
    const { uid } = auth;
    if (uid) {
      const { newPassword, oldPassword } = data.payload;
      const { email } = yield call(fb.getDateBase(), `users/${uid}`);
      try {
        yield call(fb.authWithEmailAndPassword(), email, oldPassword);
        yield call(fb.auth().updatePassword, newPassword);
      } catch (e) {
        yield put(loginError({ code: e.code || null, message: e.message || null }));
      }
    }
  } catch (e) {
    yield put(loginError({ code: e.code || null, message: e.message || null }));
  }

  yield put(setPageLoading(false));
}

function* watchPasswordUpdate() {
  yield takeEvery(ActionType.PASSWORD_UPDATE, passwordUpdateWorker);
}

export { watchProfileUpdate, watchPasswordUpdate };
