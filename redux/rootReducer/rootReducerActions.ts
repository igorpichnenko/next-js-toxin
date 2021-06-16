import { DefaultRootState } from 'react-redux';

import { ISignUpState } from 'redux/signUp/signUpReducer';
import { IAuthState } from 'redux/auth/authReducer';
import { IFilterReducerState } from 'redux/filter/filterReducer';
import { IRoomDetailsState } from 'redux/roomDetails/roomDetailsReducer';
import { IUploadReducer } from 'redux/imageUpload/imageUploadReducer';
import { IUserRoomsState } from 'redux/userRooms/userRoomsReducer';
import { IBookingReducerState } from 'redux/booking/bookingReducer';
import { AddCommentAction } from 'redux/comment/commentActions';

import { IToxinAppState } from 'redux/toxinApp/toxinAppReducer';

import { SignUpAction } from 'redux/signUp/signUpActions';
import { AuthAction } from 'redux/auth/authActions';
import { FilterActions } from 'redux/filter/filterActions';
import { GetRoomDetailsAction } from 'redux/roomDetails/roomDetailsActions';
import { ImageUpload } from 'redux/imageUpload/imageUploadActions';
import { GetUserRoomsAction } from 'redux/userRooms/userRoomsActions';
import { BookingActions } from 'redux/booking/bookingActions';
import { IAddCommentReducerState } from 'redux/comment/commentReducer';

import ActionType from './rootReducerActionTypes';

interface IState extends DefaultRootState {
  auth: IAuthState;
  signUp: ISignUpState;
  filter: IFilterReducerState;
  roomDetails: IRoomDetailsState;
  toxinApp: IToxinAppState;
  userRooms: IUserRoomsState;
  avatarImage: IUploadReducer;
  booking: IBookingReducerState;
  addComment: IAddCommentReducerState;
}

interface IRootHydration {
  type: ActionType.ROOT_HYDRATION;
  payload: IState;
}

export type RootReducerAction =
  | FilterActions
  | AuthAction
  | GetUserRoomsAction
  | GetRoomDetailsAction
  | IRootHydration
  | BookingActions
  | ImageUpload
  | SignUpAction
  | AddCommentAction;

export type { IState };
