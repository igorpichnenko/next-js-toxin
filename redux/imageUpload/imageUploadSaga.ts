import fb from 'services/firebaseApi';

import { call, put, takeLatest } from '@redux-saga/core/effects';

import { getImage, IUploadImage, uploadImageError } from './imageUploadActions';
import ActionType from './imageUploadActionType';

function* imageUploadWorker({ payload, blobFile }: IUploadImage): Generator<any, void, any> {
  try {
    yield fb.uploadFile(`${payload.lastModified}`, blobFile);
    const url = yield call(fb.getDownloadURL(), `${payload.lastModified}`);
    yield put(getImage(url));
  } catch (e) {
    yield put(uploadImageError({ code: e.code || null, message: e.message || null }));
  }
}

function* saveImageWorker({ payload, uid }: IUploadImage): Generator<any, void, any> {
  try {
    const url = yield call(fb.getDownloadURL(), `${payload.lastModified}`);
    yield call(fb.patchDB(), `users/${uid}`, { image: url });
    yield put(getImage(url));
  } catch (e) {
    yield put(uploadImageError({ code: e.code || null, message: e.message || null }));
  }
}

function* watchSaveImage() {
  yield takeLatest(ActionType.SAVE_IMAGE, saveImageWorker);
}

function* watchImageUpload() {
  yield takeLatest(ActionType.UPLOAD_IMAGE, imageUploadWorker);
}

export { watchImageUpload, watchSaveImage };
