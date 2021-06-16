import { CombinedState, combineReducers } from 'redux';
import signUpReducer from 'redux/signUp/signUpReducer';
import authReducer from 'redux/auth/authReducer';
import filterReducer from 'redux/filter/filterReducer';
import roomDetailsReducer from 'redux/roomDetails/roomDetailsReducer';
import toxinAppReducer from 'redux/toxinApp/toxinAppReducer';
import userRoomsReducer from 'redux/userRooms/userRoomsReducer';
import uploadImageReducer from 'redux/imageUpload/imageUploadReducer';
import bookingReducer from 'redux/booking/bookingReducer';
import addCommentReducer from 'redux/comment/commentReducer';

import { RootReducerAction, IState as State } from './rootReducerActions';
import ActionType from './rootReducerActionTypes';

const combinedReducer = combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  filter: filterReducer,
  toxinApp: toxinAppReducer,
  userRooms: userRoomsReducer,
  roomDetails: roomDetailsReducer,
  avatarImage: uploadImageReducer,
  booking: bookingReducer,
  addComment: addCommentReducer,
});

const rootReducer = (state = {} as CombinedState<State>, action: RootReducerAction) => {
  switch (action.type) {
    case ActionType.ROOT_HYDRATION: {
      const { toxinApp } = state;
      const isAlreadyHydrated = toxinApp && toxinApp.pageHydrated;
      if (isAlreadyHydrated) {
        return state;
      }
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return combinedReducer(state, action);
  }
};

export type { State };

export default rootReducer;
