import LocalizedStrings from 'react-localization';
import passwordCardLocale from 'public/locales/components/passwordCard/passwordCard';
import validationLocale from 'public/locales/utils/validation';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';
import errors from 'services/errors';

import { passwordUpdate } from 'redux/profileUpdate/profileUpdateActions';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';
import { validatePassword } from 'utils/validation';

import classes from './passwordCard.module.scss';

const strings = new LocalizedStrings(passwordCardLocale);
const validationStrings = new LocalizedStrings(validationLocale);

const PasswordCard = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordErrors, setNewPasswordErrors] = useState<string[]>([]);
  const [newRepeatPassword, setNewRepeatPassword] = useState<string>('');
  const [newRepeatPasswordErrors, setNewRepeatPasswordErrors] = useState<string[]>([]);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [oldPasswordErrors, setOldPasswordErrors] = useState<string[]>([]);

  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);
  validationStrings.setLanguage(locale);

  const loginError = useSelector((state: State) => state.auth.loginError);
  const [isOldPasswordWrong, setIsOldPasswordWrong] = useState<boolean>(false);

  useEffect(() => {
    const { wrongPassword } = errors.auth;

    if (loginError && loginError.code === wrongPassword) {
      setIsOldPasswordWrong(true);
    } else {
      setIsOldPasswordWrong(false);
    }
  }, [loginError]);

  useEffect(() => {
    if (isOldPasswordWrong) {
      setOldPasswordErrors([strings.errorWrongPassword]);
    } else {
      setOldPasswordErrors([]);
    }
  }, [isOldPasswordWrong]);

  const handleNewPasswordInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setNewPasswordErrors([]);
    setNewPassword(value);
  };

  const handleNewRepeatPasswordInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setNewRepeatPasswordErrors([]);
    setNewRepeatPassword(value);
  };

  const handleOldPasswordInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setOldPasswordErrors([]);
    setOldPassword(value);
  };

  const handleSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (newPassword === newRepeatPassword) {
      if (validatePassword(newPassword).isValid) {
        dispatch(passwordUpdate({ newPassword, oldPassword }));
        setIsOldPasswordWrong(false);
      } else {
        setNewPasswordErrors(
          validatePassword(newPassword).errorMessages.map((msg) => validationStrings[msg]),
        );
      }
    } else {
      setNewRepeatPasswordErrors([strings.errorShouldMatch]);
    }
  };

  return (
    <form className={classes.passwordCard} onSubmit={handleSubmitForm}>
      <div className={classes.wrap}>
        <fieldset className={classes.fieldset}>
          <div className={classes.inputWrap}>
            <Typography variant="label">
              <span className={classes.labelSpan}>{strings.oldPassword}</span>
              <Input
                type="password"
                name="email"
                placeholder={strings.oldPassword}
                value={oldPassword}
                errorMessages={oldPasswordErrors}
                onChange={handleOldPasswordInput}
                required
              />
            </Typography>
          </div>
          <div className={classes.inputWrap}>
            <Typography variant="label">
              <span className={classes.labelSpan}>{strings.newPassword}</span>
              <Input
                type="password"
                name="email"
                placeholder={strings.newPassword}
                value={newPassword}
                errorMessages={newPasswordErrors}
                onChange={handleNewPasswordInput}
                required
              />
            </Typography>
          </div>
          <div className={classes.inputWrap}>
            <Typography variant="label">
              <span className={classes.labelSpan}>{strings.repeatPassword}</span>
              <Input
                type="password"
                name="email"
                placeholder={strings.repeatPassword}
                value={newRepeatPassword}
                errorMessages={newRepeatPasswordErrors}
                onChange={handleNewRepeatPasswordInput}
                required
              />
            </Typography>
          </div>
        </fieldset>
        <Button value={strings.save} type="submit" element="button" variant="big" icon />
      </div>
    </form>
  );
};

export default PasswordCard;
