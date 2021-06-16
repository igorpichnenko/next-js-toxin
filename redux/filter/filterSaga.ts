import { delay, put, takeLatest } from '@redux-saga/core/effects';
import fb from 'services/firebaseApi';
import filterRequest from 'services/helpers';
import ActionType from './filterActionTypes';
import { setRooms, IChangeForm, filterError } from './filterActions';

function* filterWorker({ payload }: IChangeForm): Generator<any, void, any> {
  try {
    yield delay(1000);
    const data = yield fb.getAllRooms(payload);
    const rooms = yield filterRequest(data, payload);
    yield put(setRooms(rooms));
  } catch (e) {
    yield put(filterError({ code: e.code || null, message: e.message || null }));
  }
}

function* watchFilter() {
  yield takeLatest(ActionType.CHANGE_FORM, filterWorker);
}

export default watchFilter;
