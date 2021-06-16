import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { ActionLoading } from './toxinAppAction';
import ActionTypeToxinApp from './toxinAppActionTypes';

interface IToxinAppState extends DefaultRootState {
  pageLoading: boolean;
  pageHydrated: boolean;
}

const toxinAppReducer: Reducer<IToxinAppState, ActionLoading> = (
  state = { pageLoading: false, pageHydrated: false },
  action,
) => {
  switch (action.type) {
    case ActionTypeToxinApp.SET_PAGE_LOADER:
      return { ...state, pageLoading: action.payload };
    case ActionTypeToxinApp.SET_PAGE_HYDRATION:
      return { ...state, pageHydrated: action.payload };
    default:
      return state;
  }
};

export type { IToxinAppState };

export default toxinAppReducer;
