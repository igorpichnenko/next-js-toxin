import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { CustomError } from 'services/helpers';
import { ProfileUpdateAction } from 'redux/profileUpdate/profileUpdateActions';
import ActionTypeUpdate from 'redux/profileUpdate/profileUpdateActionTypes';
import { AuthAction } from './authActions';
import ActionType from './authActionTypes';

interface IAuthState extends DefaultRootState {
  isLogin: boolean;
  loginError: CustomError | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  uid: string | null;
  image: null | string;
}

type AuthWithUpdate = AuthAction | ProfileUpdateAction;

const authReducer: Reducer<IAuthState, AuthWithUpdate> = (
  state = {
    isLogin: false,
    loginError: null,
    name: null,
    surname: null,
    email: null,
    uid: null,
    image: null,
  },
  action,
) => {
  switch (action.type) {
    case ActionType.LOGIN_START:
      return { ...state, loginError: null };
    case ActionType.LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isLogin: true,
        loginError: null,
      };
    }
    case ActionType.SET_LOGIN: {
      return { ...state, loginError: null };
    }
    case ActionType.LOG_OUT: {
      return { ...state, loginError: null, isLogin: false };
    }
    case ActionType.LOGIN_ERROR: {
      return { ...state, loginError: action.payload, isLogin: false };
    }
    case ActionTypeUpdate.PROFILE_UPDATE:
      return { ...state, loginError: null };
    case ActionTypeUpdate.PASSWORD_UPDATE:
      return { ...state, loginError: null };
    default:
      return state;
  }
};

export type { IAuthState };

export default authReducer;
