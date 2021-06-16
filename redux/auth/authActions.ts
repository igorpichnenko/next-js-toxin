import { GetServerSidePropsContext } from 'next';
import { CustomError } from 'services/helpers';
import ActionType from './authActionTypes';

interface IContextExtendedWithAuth extends GetServerSidePropsContext {
  AuthUser?: {
    id?: string;
    email?: string;
  };
}

type LoginForm = {
  email: string;
  password: string;
  uid?: string;
  image?: string | null;
};

interface ILoginStartAction {
  type: ActionType.LOGIN_START;
  payload: LoginForm;
}

interface ISetLoginAction {
  type: ActionType.SET_LOGIN;
  payload: LoginForm;
}

type LoginDataType = {
  name: string;
  surname: string;
  email: string;
  uid: string;
  image?: string;
};

interface ILoginAction {
  type: ActionType.LOGIN_SUCCESS;
  payload: LoginDataType;
}

interface IAuthError {
  type: ActionType.LOGIN_ERROR;
  payload: CustomError;
}

interface ILogOut {
  type: ActionType.LOG_OUT;
}

const loginStart = (payload: LoginForm): ILoginStartAction => ({
  type: ActionType.LOGIN_START,
  payload,
});

const setLogin = (payload: LoginForm): ISetLoginAction => ({
  type: ActionType.SET_LOGIN,
  payload,
});

const loginSuccess = (loginData: LoginDataType): ILoginAction => ({
  type: ActionType.LOGIN_SUCCESS,
  payload: loginData,
});

const loginError = (payload: CustomError): IAuthError => ({
  type: ActionType.LOGIN_ERROR,
  payload,
});

const logOut = (): ILogOut => ({
  type: ActionType.LOG_OUT,
});

export type AuthAction = ILoginAction | ILoginStartAction | IAuthError | ISetLoginAction | ILogOut;

export type { ILoginStartAction, IAuthError, LoginDataType, IContextExtendedWithAuth };
export { loginStart, loginError, loginSuccess, setLogin, logOut };
