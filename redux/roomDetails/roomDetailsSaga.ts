import { put, takeEvery } from 'redux-saga/effects';
import fb from 'services/firebaseApi';
import { formatRoom } from 'services/helpers';
import {
  IGetRoomDetailsActionStart,
  getRoomDetailsSuccess,
  getRoomDetailsError,
} from './roomDetailsActions';
import ActionType from './roomDetailsActionTypes';

function* getRoomDetailsStartWorker({
  payload,
}: IGetRoomDetailsActionStart): Generator<any, void, any> {
  try {
    const data = yield fb.getRoomDetails(payload);
    if (data) {
      const roomDetails = yield formatRoom(data);
      yield put(getRoomDetailsSuccess(roomDetails));
    }
  } catch (e) {
    yield put(getRoomDetailsError({ code: e.code || null, message: e.message || null }));
  }
}

function* watchGetRoomDetailsStart() {
  yield takeEvery(ActionType.GET_ROOM_DETAILS_START, getRoomDetailsStartWorker);
}

export default watchGetRoomDetailsStart;
