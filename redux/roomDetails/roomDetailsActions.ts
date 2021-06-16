import { IRoomsProps, CustomError } from 'services/helpers';
import ActionType from './roomDetailsActionTypes';

interface IGetRoomDetailsActionSuccess {
  type: ActionType.GET_ROOM_DETAILS_SUCCESS;
  payload: IRoomsProps;
}

interface IGetRoomDetailsActionStart {
  type: ActionType.GET_ROOM_DETAILS_START;
  payload: number;
}

interface IGetRoomDetailsActionError {
  type: ActionType.GET_ROOM_DETAILS_ERROR;
  payload: CustomError;
}

const getRoomDetailsStart = (payload: number): IGetRoomDetailsActionStart => ({
  type: ActionType.GET_ROOM_DETAILS_START,
  payload,
});

const getRoomDetailsSuccess = (payload: IRoomsProps): IGetRoomDetailsActionSuccess => ({
  type: ActionType.GET_ROOM_DETAILS_SUCCESS,
  payload,
});

const getRoomDetailsError = (payload: CustomError): IGetRoomDetailsActionError => ({
  type: ActionType.GET_ROOM_DETAILS_ERROR,
  payload,
});

export type GetRoomDetailsAction =
  | IGetRoomDetailsActionSuccess
  | IGetRoomDetailsActionStart
  | IGetRoomDetailsActionError;

export type { IGetRoomDetailsActionStart };

export { getRoomDetailsStart, getRoomDetailsSuccess, getRoomDetailsError };
