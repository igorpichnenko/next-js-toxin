import fb from 'services/firebaseApi';

import { takeLatest, put } from '@redux-saga/core/effects';

import ActionType from './commentActionTypes';
import { IAddComment, addCommentError } from './commentActions';

function* addCommentWorker(data: IAddComment): Generator<any, void, any> {
  const { payload, dbID } = data;
  try {
    yield fb.addComment(dbID, payload);
  } catch (e) {
    yield put(addCommentError({ code: e.code || null, message: e.message || null }));
  }
}

function* removeCommentWorker(data: IAddComment): Generator<any, void, any> {
  const { payload, dbID } = data;
  try {
    yield fb.removeComment(dbID, payload);
  } catch (e) {
    yield put(addCommentError({ code: e.code || null, message: e.message || null }));
  }
}

function* watchAddComment() {
  yield takeLatest(ActionType.ADD_COMMENT, addCommentWorker);
}

function* watchRemoveComment() {
  yield takeLatest(ActionType.REMOVE_COMMENT, removeCommentWorker);
}

export { watchAddComment, watchRemoveComment };
