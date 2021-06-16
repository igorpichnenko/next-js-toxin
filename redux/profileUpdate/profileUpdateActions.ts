import ActionType from './profileUpdateActionTypes';

type UserProfileType = {
  name: string;
  surname: string;
  email: string;
};

interface IProfileUpdate {
  type: ActionType.PROFILE_UPDATE;
  payload: UserProfileType;
}

type PasswordUpdate = {
  newPassword: string;
  oldPassword: string;
};

interface IPasswordUpdate {
  type: ActionType.PASSWORD_UPDATE;
  payload: PasswordUpdate;
}

const profileUpdate = (payload: UserProfileType): IProfileUpdate => ({
  type: ActionType.PROFILE_UPDATE,
  payload,
});

const passwordUpdate = (payload: IPasswordUpdate['payload']): IPasswordUpdate => ({
  type: ActionType.PASSWORD_UPDATE,
  payload,
});

export type ProfileUpdateAction = IProfileUpdate | IPasswordUpdate;

export type { IProfileUpdate, IPasswordUpdate };
export { profileUpdate, passwordUpdate };
