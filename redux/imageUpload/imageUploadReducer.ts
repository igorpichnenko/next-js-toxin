import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { CustomError } from 'services/helpers';
import ActionType from './imageUploadActionType';
import { ImageUpload } from './imageUploadActions';

interface IUploadReducer extends DefaultRootState {
  image: string;
  error: CustomError | null;
}

const uploadImageReducer: Reducer<IUploadReducer, ImageUpload> = (
  state = { error: null, image: '' },
  action,
) => {
  switch (action.type) {
    case ActionType.UPLOAD_IMAGE:
      return { ...state, error: null };
    case ActionType.SAVE_IMAGE:
      return { ...state, error: null };
    case ActionType.GET_IMAGE:
      return { ...state, image: action.payload, error: null };
    case ActionType.IMAGE_UPLOAD_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default uploadImageReducer;
export type { IUploadReducer };
