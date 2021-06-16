import { put, takeEvery, call } from 'redux-saga/effects';
import fb from 'services/firebaseApi';
import { IBookedRoom } from 'components/BookedRoomsList/BookedRoom/BookedRoom';
import { bookedRoomsRequest } from 'services/helpers';
import {
  setUserRoomsSuccess,
  IGetUserRoomsActionStart,
  IRemoveUserRoomsAction,
  setUserRoomsError,
} from './userRoomsActions';
import ActionType from './userRoomsActionTypes';

interface IUserBookedRoom {
  id: number;
  bookingStart: string;
  bookingEnd: string;
}

function* getUserRoomsWorker(data: IGetUserRoomsActionStart): Generator<any, void, any> {
  try {
    const { payload } = data;

    const bookedRooms = yield call(fb.getDateBase(), `users/${payload}/bookedRooms`);
    const typedBookedRooms = bookedRooms as IUserBookedRoom[];

    if (typedBookedRooms && typedBookedRooms.length) {
      const roomsList = yield fb.getUserRooms(typedBookedRooms.map((value) => value.id));
      const rooms = yield bookedRoomsRequest(roomsList, payload);
      yield put(setUserRoomsSuccess(rooms as IBookedRoom[]));
    }
  } catch (e) {
    yield put(setUserRoomsError({ code: e.code || null, message: e.message || null }));
  }
}

function* watchGetUserRooms() {
  yield takeEvery(ActionType.GET_USER_ROOMS_START, getUserRoomsWorker);
}

function* removeUserRoomsWorker(data: IRemoveUserRoomsAction): Generator<any, void, any> {
  try {
    const { payload } = data;
    const bookedRooms = yield call(fb.getDateBase(), `users/${payload.uid}/bookedRooms`);
    const typedBookedRooms = bookedRooms as IUserBookedRoom[];

    if (typedBookedRooms && typedBookedRooms.length) {
      yield call(fb.patchDB(), `users/${payload.uid}/`, {
        bookedRooms: (typedBookedRooms as IUserBookedRoom[]).filter((value) => {
          const idMatch = payload.roomdID === value.id;
          const startMatch = payload.bookingStart === value.bookingStart;
          const endMatch = payload.bookingEnd === value.bookingEnd;
          return !(idMatch && startMatch && endMatch);
        }),
      });
      yield fb.removeBookedRoom(payload);
    }
  } catch (e) {
    yield put(setUserRoomsError({ code: e.code || null, message: e.message || null }));
  }
}

function* watchRemoveUserRooms() {
  yield takeEvery(ActionType.REMOVE_USER_ROOMS, removeUserRoomsWorker);
}

export type { IUserBookedRoom };
export { watchGetUserRooms, watchRemoveUserRooms };
