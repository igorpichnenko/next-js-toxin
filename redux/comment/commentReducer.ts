import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { CustomError } from 'services/helpers';
import ActionType from './commentActionTypes';
import { AddCommentAction } from './commentActions';

interface IAddCommentReducerState extends DefaultRootState {
  error: CustomError | null;
}

const addCommentReducer: Reducer<IAddCommentReducerState, AddCommentAction> = (
  state = { error: null },
  action,
) => {
  switch (action.type) {
    case ActionType.ADD_COMMENT:
      return { ...state, error: null };
    case ActionType.REMOVE_COMMENT:
      return { ...state, error: null };
    case ActionType.ADD_COMMENT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export type { IAddCommentReducerState };
export default addCommentReducer;
