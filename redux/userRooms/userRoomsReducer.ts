import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { CustomError } from 'services/helpers';
import { IBookedRoom } from 'components/BookedRoomsList/BookedRoom/BookedRoom';
import { GetUserRoomsAction } from './userRoomsActions';
import ActionType from './userRoomsActionTypes';

interface IUserRoomsState extends DefaultRootState {
  userRooms: IBookedRoom[] | null;
  error: CustomError | null;
}

const userRoomsReducer: Reducer<IUserRoomsState, GetUserRoomsAction> = (
  state = { userRooms: null, error: null },
  action,
) => {
  switch (action.type) {
    case ActionType.GET_USER_ROOMS_START:
      return { ...state, error: null };
    case ActionType.GET_USER_ROOMS_SUCCESS:
      return { ...state, userRooms: action.payload, error: null };
    case ActionType.REMOVE_USER_ROOMS:
      if (state.userRooms) {
        const userRooms = [...state.userRooms];
        userRooms.splice(action.payload.roomKey, 1);
        return { ...state, userRooms, error: null };
      }
      return state;
    case ActionType.GET_USER_ROOMS_ERROR:
      return { ...state, error: action.payload, userRooms: null };

    default:
      return state;
  }
};

export type { IUserRoomsState };

export default userRoomsReducer;
