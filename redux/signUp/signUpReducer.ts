import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { CustomError } from 'services/helpers';
import { SignUpAction } from './signUpActions';
import ActionType from './signUpActionTypes';

interface ISignUpState extends DefaultRootState {
  signUpError: CustomError | null;
}

const signUpReducer: Reducer<ISignUpState, SignUpAction> = (
  state = { signUpError: null },
  action,
) => {
  switch (action.type) {
    case ActionType.SIGN_UP_START:
      return { ...state, signUpError: null };
    case ActionType.SIGN_UP_SUCCESS:
      return { ...state, signUpError: null };
    case ActionType.SIGN_UP_ERROR:
      return { ...state, signUpError: action.payload };
    default:
      return state;
  }
};

export type { ISignUpState };

export default signUpReducer;
