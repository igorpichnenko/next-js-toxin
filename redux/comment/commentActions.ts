import { IReviewItem } from 'components/Review/Review';
import { CustomError } from 'services/helpers';
import ActionType from './commentActionTypes';

interface IAddComment {
  type: ActionType.ADD_COMMENT;
  payload: IReviewItem;
  dbID: string;
}

interface IAddCommentError {
  type: ActionType.ADD_COMMENT_ERROR;
  payload: CustomError;
}

interface IRemoveComment {
  type: ActionType.REMOVE_COMMENT,
  payload: IReviewItem
  dbID: string;
}

const addComment = (payload: IReviewItem, dbID: string): IAddComment => ({
  type: ActionType.ADD_COMMENT,
  payload,
  dbID,
});

const addCommentError = (payload: CustomError): IAddCommentError => ({
  type: ActionType.ADD_COMMENT_ERROR,
  payload,
});

const removeComment = (payload: IReviewItem, dbID: string): IRemoveComment => ({
  type: ActionType.REMOVE_COMMENT,
  payload,
  dbID,
});

export { addComment, addCommentError, removeComment };
export type AddCommentAction = IAddComment | IAddCommentError | IRemoveComment;
export type { IAddComment };
