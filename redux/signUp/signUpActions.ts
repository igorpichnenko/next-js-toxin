import { CustomError } from 'services/helpers';
import ActionType from './signUpActionTypes';

interface ISignUpForm {
  name: string;
  surname: string;
  gender: string;
  birthday: string;
  email: string;
  password: string;
  offer: boolean;
}

interface ISignUpActionStart {
  type: ActionType.SIGN_UP_START;
  payload: ISignUpForm;
}

interface ISignUpActionSuccess {
  type: ActionType.SIGN_UP_SUCCESS;
}

interface ISignUpActionError {
  type: ActionType.SIGN_UP_ERROR;
  payload: CustomError;
}

const signUpStart = (payload: ISignUpForm): ISignUpActionStart => ({
  type: ActionType.SIGN_UP_START,
  payload,
});

const signUpSuccess = (): ISignUpActionSuccess => ({
  type: ActionType.SIGN_UP_SUCCESS,
});

const signUpError = (payload: CustomError): ISignUpActionError => ({
  type: ActionType.SIGN_UP_ERROR,
  payload,
});

export type { ISignUpActionStart };
export type SignUpAction = ISignUpActionSuccess | ISignUpActionStart | ISignUpActionError;

export { signUpStart, signUpError, signUpSuccess };
