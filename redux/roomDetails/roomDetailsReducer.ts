import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { IRoomsProps, CustomError } from 'services/helpers';
import { GetRoomDetailsAction } from './roomDetailsActions';
import ActionType from './roomDetailsActionTypes';

interface IRoomDetailsState extends DefaultRootState {
  room: IRoomsProps | null;
  error: CustomError | null;
  isFetching: boolean;
}

const roomDetailsReducer: Reducer<IRoomDetailsState, GetRoomDetailsAction> = (
  state = { isFetching: false, room: null, error: null },
  action,
) => {
  switch (action.type) {
    case ActionType.GET_ROOM_DETAILS_START:
      return { ...state, isFetching: true, error: null };
    case ActionType.GET_ROOM_DETAILS_SUCCESS:
      return {
        ...state,
        error: null,
        room: action.payload,
        isFetching: false,
      };
    case ActionType.GET_ROOM_DETAILS_ERROR:
      return {
        ...state,
        error: action.payload,
        room: null,
        isFetching: false,
      };
    default:
      return state;
  }
};

export type { IRoomDetailsState };
export default roomDetailsReducer;
