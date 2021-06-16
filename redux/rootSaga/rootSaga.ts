import { all } from 'redux-saga/effects';

import { watchLoginStart, watchSetLogin, watchLogOut } from 'redux/auth/authSaga';
import { watchProfileUpdate, watchPasswordUpdate } from 'redux/profileUpdate/profileUpdateSaga';
import watchFilter from 'redux/filter/filterSaga';
import watchSignUpStart from 'redux/signUp/signUpSaga';
import { watchGetUserRooms, watchRemoveUserRooms } from 'redux/userRooms/userRoomsSaga';
import watchGetRoomDetailsStart from 'redux/roomDetails/roomDetailsSaga';
import watchBooking from 'redux/booking/bookingSaga';
import { watchImageUpload, watchSaveImage } from 'redux/imageUpload/imageUploadSaga';
import { watchAddComment, watchRemoveComment } from 'redux/comment/commentSaga';

export default function* rootSaga() {
  yield all([
    watchSignUpStart(),
    watchFilter(),
    watchLoginStart(),
    watchProfileUpdate(),
    watchPasswordUpdate(),
    watchGetUserRooms(),
    watchGetRoomDetailsStart(),
    watchSetLogin(),
    watchLogOut(),
    watchBooking(),
    watchImageUpload(),
    watchAddComment(),
    watchRemoveUserRooms(),
    watchSaveImage(),
    watchRemoveComment(),
  ]);
}
