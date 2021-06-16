import { CustomError } from 'services/helpers';
import ActionType from 'redux/booking/bookingActionsTypes';

interface IBooking {
  bookingDates: { bookingStart: string; bookingEnd: string; uid: string };
  bookingGuestsList: { title: string; value: number; id: number }[];
  roomId: number;
}

interface IBookingAction {
  type: ActionType.UPDATE_BOOKING;
  payload: IBooking;
}

interface IBookingError {
  type: ActionType.BOOKING_ERROR;
  payload: CustomError;
}

const updateBooking = (value: IBooking): IBookingAction => ({
  type: ActionType.UPDATE_BOOKING,
  payload: value,
});

const bookingError = (payload: CustomError): IBookingError => ({
  type: ActionType.BOOKING_ERROR,
  payload,
});

export type BookingActions = IBookingAction | IBookingError;
export type { IBooking, IBookingAction, IBookingError };
export { updateBooking, bookingError };
