import fb from 'services/firebaseApi';
import { takeLatest, put } from 'redux-saga/effects';

import ActionType from 'redux/booking/bookingActionsTypes';
import { IBookingAction, bookingError } from 'redux/booking/bookingActions';

function* bookingWorker({ payload }: IBookingAction): Generator<any, void, any> {
  try {
    const el = yield fb.getRoomDetails(Number(payload.roomId));
    const { id } = el.docs[0];
    yield fb.updateBookingUser(payload.bookingDates, payload.roomId);
    yield fb.updateBookingRoom(payload.bookingDates, payload.bookingGuestsList, id);
    alert('Комната обновлена!');
  } catch (e) {
    yield put(bookingError({ code: e.code || null, message: e.message || null }));
  }
}

function* watchBooking() {
  yield takeLatest(ActionType.UPDATE_BOOKING, bookingWorker);
}

export default watchBooking;
