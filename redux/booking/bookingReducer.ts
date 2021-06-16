import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { CustomError } from 'services/helpers';
import ActionType from 'redux/booking/bookingActionsTypes';

import { BookingActions } from 'redux/booking/bookingActions';

interface IBookingReducerState extends DefaultRootState {
  error: CustomError | null;
}

const bookingReducer: Reducer<IBookingReducerState, BookingActions> = (
  state = { error: null },
  action,
) => {
  switch (action.type) {
    case ActionType.UPDATE_BOOKING:
      return { ...state, error: null };
    case ActionType.BOOKING_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export type { IBookingReducerState };
export default bookingReducer;
