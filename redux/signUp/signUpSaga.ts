import defaultAva from 'components/ImageUpload/helpers';
import { put, takeEvery, call } from 'redux-saga/effects';
import { loginSuccess } from 'redux/auth/authActions';
import fb from 'services/firebaseApi';
import { signUpSuccess, signUpError, ISignUpActionStart } from './signUpActions';
import ActionType from './signUpActionTypes';

type UserData = {
  user: {
    uid: string;
  };
};

function* signUpStartWorker(data: ISignUpActionStart): Generator {
  try {
    const { payload } = data;
    const { email, password, name, surname, gender, birthday, offer } = payload;

    const userData = yield call(fb.signUp(), email, password);
    const typedData = userData as UserData;

    yield call(fb.updateDB(), `users/${typedData.user.uid}/`, {
      email,
      name,
      surname,
      gender,
      birthday,
      offer,
      image: defaultAva,
    });

    yield put(signUpSuccess());
    yield put(loginSuccess({ name, surname, email, uid: typedData.user.uid }));
  } catch (e) {
    yield put(signUpError({ code: e.code || null, message: e.message || null }));
  }
}

function* watchSignUpStart() {
  yield takeEvery(ActionType.SIGN_UP_START, signUpStartWorker);
}

export default watchSignUpStart;
