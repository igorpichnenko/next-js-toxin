import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { initState } from 'components/FilterRoom/initValues';
import { IFilterState } from 'components/FilterRoom/FilterRoom';
import { IRoomsProps, CustomError } from 'services/helpers';
import { FilterActions } from './filterActions';
import ActionType from './filterActionTypes';

interface IFilterReducerState extends DefaultRootState {
  filter: IFilterState;
  rooms?: IRoomsProps[];
  error: CustomError | null;
}

const filterReducer: Reducer<IFilterReducerState, FilterActions> = (
  state = { filter: initState, error: null },
  action,
) => {
  switch (action.type) {
    case ActionType.CHANGE_FORM:
      return { ...state, filter: { ...state.filter, ...action.payload }, error: null };
    case ActionType.SET_ROOMS:
      return { ...state, rooms: action.payload, error: null };
    case ActionType.FILTER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export type { IFilterReducerState };
export default filterReducer;
