import { IFilterState } from 'components/FilterRoom/FilterRoom';
import { IRoomsProps, CustomError } from 'services/helpers';
import ActionType from './filterActionTypes';

type FilterActions = IChangeForm | ISetRooms | IFilterError;

interface IChangeForm {
  type: ActionType.CHANGE_FORM;
  payload: IFilterState;
}

interface ISetRooms {
  type: ActionType.SET_ROOMS;
  payload?: IRoomsProps[];
}

interface IFilterError {
  type: ActionType.FILTER_ERROR;
  payload: CustomError;
}

const changeForm = (payload: IFilterState): IChangeForm => ({
  type: ActionType.CHANGE_FORM,
  payload,
});

const setRooms = (payload: IRoomsProps[]): ISetRooms => ({
  type: ActionType.SET_ROOMS,
  payload,
});

const filterError = (payload: CustomError): IFilterError => ({
  type: ActionType.FILTER_ERROR,
  payload,
});

export type { IChangeForm, ISetRooms, FilterActions };

export { changeForm, setRooms, filterError };
