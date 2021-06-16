import { CustomError } from 'services/helpers';
import { IBookedRoom } from 'components/BookedRoomsList/BookedRoom/BookedRoom';
import ActionType from './userRoomsActionTypes';

interface IRemoveRequest {
  roomdID: number;
  dbID: string;
  roomKey: number;
  uid: string;
  bookingStart: string;
  bookingEnd: string;
}

interface IGetUserRoomsActionSuccess {
  type: ActionType.GET_USER_ROOMS_SUCCESS;
  payload: IBookedRoom[];
}

interface IGetUserRoomsActionStart {
  type: ActionType.GET_USER_ROOMS_START;
  payload: string;
}

interface IGetUserRoomsError {
  type: ActionType.GET_USER_ROOMS_ERROR;
  payload: CustomError;
}

interface IRemoveUserRoomsAction {
  type: ActionType.REMOVE_USER_ROOMS;
  payload: IRemoveRequest;
}

const getUserRooms = (payload: string): IGetUserRoomsActionStart => ({
  type: ActionType.GET_USER_ROOMS_START,
  payload,
});

const setUserRoomsSuccess = (payload: IBookedRoom[]): IGetUserRoomsActionSuccess => ({
  type: ActionType.GET_USER_ROOMS_SUCCESS,
  payload,
});

const setUserRoomsError = (payload: CustomError): IGetUserRoomsError => ({
  type: ActionType.GET_USER_ROOMS_ERROR,
  payload,
});

const removeUserRooms = (payload: IRemoveRequest): IRemoveUserRoomsAction => ({
  type: ActionType.REMOVE_USER_ROOMS,
  payload,
});

export type GetUserRoomsAction =
  | IGetUserRoomsActionSuccess
  | IGetUserRoomsActionStart
  | IGetUserRoomsError
  | IRemoveUserRoomsAction;

export type { IGetUserRoomsActionStart, IRemoveUserRoomsAction, IRemoveRequest };

export { getUserRooms, setUserRoomsSuccess, setUserRoomsError, removeUserRooms };
