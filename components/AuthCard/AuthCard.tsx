import LocalizedStrings from 'react-localization';
import authCardLocale from 'public/locales/components/authCard/authCard';
import validationLocale from 'public/locales/utils/validation';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';
import errors from 'services/errors';
import { loginStart } from 'redux/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail, validatePassword } from 'utils/validation';

import { State } from 'redux/rootReducer/rootReducer';
import classes from './authCard.module.scss';

const strings = new LocalizedStrings(authCardLocale);
const validationStrings = new LocalizedStrings(validationLocale);

const AuthCard = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const loginError = useSelector((state: State) => state.auth.loginError);
  const [isLoginNotExist, setIsLoginNotExist] = useState<boolean>(false);
  const [isPasswordUndefined, setIsPasswordUndefined] = useState<boolean>(false);
  const [isTooMuchPasswordTry, setIsTooMuchPasswordTry] = useState<boolean>(false);

  const { locale = 'ru' } = useRouter();

  strings.setLanguage(locale);
  validationStrings.setLanguage(locale);

  useEffect(() => {
    const { wrongPassword, tooManyRequests, userNotFound } = errors.auth;

    if (loginError && loginError.code === wrongPassword) {
      setIsPasswordUndefined(true);
    } else {
      setIsPasswordUndefined(false);
    }

    if (loginError && loginError.code === tooManyRequests) {
      setIsTooMuchPasswordTry(true);
    } else {
      setIsTooMuchPasswordTry(false);
    }

    if (loginError && loginError.code === userNotFound) {
      setIsLoginNotExist(true);
    } else {
      setIsLoginNotExist(false);
    }
  }, [loginError]);

  useEffect(() => {
    if (isLoginNotExist) {
      setEmailErrors([strings.errorUserNotExists]);
    }
  }, [isLoginNotExist]);

  useEffect(() => {
    if (isPasswordUndefined) {
      setPasswordErrors([strings.errorWrongPassword]);
    }
  }, [isPasswordUndefined]);

  useEffect(() => {
    if (isTooMuchPasswordTry) {
      setPasswordErrors([strings.errorTooManyAttempts]);
    }
  }, [isTooMuchPasswordTry]);

  const setErrorMessages = () => {
    setEmailErrors(validateEmail(email).errorMessages.map((msg) => validationStrings[msg]));
    setPasswordErrors(
      validatePassword(password).errorMessages.map((msg) => validationStrings[msg]),
    );
  };

  const validate = () => validateEmail(email).isValid && validatePassword(password).isValid;

  const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (validate()) {
      dispatch(loginStart({ email, password }));
      setIsLoginNotExist(false);
      setIsPasswordUndefined(false);
      setIsTooMuchPasswordTry(false);
    } else {
      setErrorMessages();
    }
  };

  const handlePasswordInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setPassword(value);
    setPasswordErrors([]);
  };

  const handleEmailInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setEmail(value);
    setEmailErrors([]);
  };

  return (
    <section className={classes.authCard}>
      <div className={classes.wrap}>
        <form onSubmit={onSubmitForm}>
          <div className={classes.legendWrap}>
            <Typography variant="legend">{strings.login}</Typography>
          </div>
          <fieldset className={classes.fieldset}>
            <div className={classes.inputWrap}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                errorMessages={emailErrors}
                onChange={handleEmailInput}
              />
            </div>
            <Input
              type="password"
              name="password"
              placeholder={strings.password}
              value={password}
              errorMessages={passwordErrors}
              onChange={handlePasswordInput}
            />
          </fieldset>
          <Button value={strings.login} type="submit" element="button" variant="big" icon />
        </form>
        <div className={classes.accountEnter}>
          <p>{strings.dontHaveAccount}</p>
          <div className="registrationButtonWrap">
            <Button value={strings.create} variant="big white" href="/auth/registration" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthCard;
