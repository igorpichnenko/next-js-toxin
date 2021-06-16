import LocalizedStrings from 'react-localization';
import cardRegLocale from 'public/locales/components/cardReg/cardReg';
import validationLocale from 'public/locales/utils/validation';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';
import RadioGroup from 'components/RadioGroup/RadioGroup';
import Toggle from 'components/Toggle/Toggle';
import { signUpStart } from 'redux/signUp/signUpActions';
import { radioGroupParam } from 'utils/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { validateBirthday, validateEmail, validatePassword } from 'utils/validation';

import { State } from 'redux/rootReducer/rootReducer';
import classes from './cardReg.module.scss';

const strings = new LocalizedStrings(cardRegLocale);
const validationStrings = new LocalizedStrings(validationLocale);

const CardReg = () => {
  const dispatch = useDispatch();
  const dateMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('male');

  const [birthdayErrors, setBirthdayErrors] = useState<string[]>([]);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [offer, setOffer] = useState<boolean>(false);

  const signUpError = useSelector((state: State) => state.signUp.signUpError);
  const [isEmailExist, setIsEmailExist] = useState<boolean>(false);

  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);
  validationStrings.setLanguage(locale);

  useEffect(() => {
    if (signUpError && signUpError.code) {
      setIsEmailExist(true);
    } else {
      setIsEmailExist(false);
    }
  }, [signUpError]);

  useEffect(() => {
    if (isEmailExist) setEmailErrors([strings.userExists]);
  }, [isEmailExist]);

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const changeSurnameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };
  const changeBirthdayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
    setBirthdayErrors([]);
  };
  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailErrors([]);
  };
  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const changeGenderHandler = (genderObj: { name: string; value: string }) => {
    setGender(genderObj.value);
  };
  const changeOfferHandler = (offerObj: { name: string; value: boolean }) => {
    setOffer(offerObj.value);
  };

  const validate = () => validateEmail(email).isValid
    && validateBirthday(birthday).isValid
    && validatePassword(password).isValid;

  const setErrorMessages = () => {
    setBirthdayErrors(
      validateBirthday(birthday).errorMessages.map((msg) => validationStrings[msg]),
    );
    setEmailErrors(validateEmail(email).errorMessages.map((msg) => validationStrings[msg]));
    setPasswordErrors(
      validatePassword(password).errorMessages.map((msg) => validationStrings[msg]),
    );
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (validate()) {
      dispatch(
        signUpStart({
          name,
          surname,
          gender,
          birthday,
          email,
          password,
          offer,
        }),
      );

      setIsEmailExist(false);
    } else {
      setErrorMessages();
    }
  };

  return (
    <section className={classes.regCard}>
      <div className={classes.wrap}>
        <form onSubmit={submitHandler}>
          <div className={classes.legendWrap}>
            <Typography variant="legend">{strings.accountRegistration}</Typography>
          </div>
          <fieldset className={classes.fieldset}>
            <div className={classes.inputWrap}>
              <Input
                type="text"
                name="user-name"
                placeholder={strings.name}
                required
                value={name}
                onChange={changeNameHandler}
              />
            </div>
            <Input
              type="text"
              name="user-surname"
              placeholder={strings.surname}
              required
              value={surname}
              onChange={changeSurnameHandler}
            />
          </fieldset>
          <fieldset className={classes.fieldset}>
            <div className={classes.radioWrap}>
              <RadioGroup
                radioGroupParam={{
                  ...radioGroupParam,
                  items: radioGroupParam.items.map((radioItem) => ({
                    ...radioItem,
                    label: strings[radioItem.label],
                  })),
                }}
                onChange={changeGenderHandler}
              />
            </div>
          </fieldset>
          <fieldset className={classes.fieldset}>
            <Typography variant="label" htmlFor="birthday">
              {strings.birthDate}
            </Typography>
            <Input
              type="text"
              name="birthday"
              mask={dateMask}
              placeholder={strings.datePlaceholder}
              id="birthday"
              value={birthday}
              errorMessages={birthdayErrors}
              onChange={changeBirthdayHandler}
            />
          </fieldset>
          <fieldset className={classes.fieldset}>
            <Typography variant="label" htmlFor="reg-email">
              {strings.loginData}
            </Typography>
            <div className={classes.inputWrap}>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                id="reg-email"
                value={email}
                errorMessages={emailErrors}
                onChange={changeEmailHandler}
              />
            </div>
            <div className={classes.inputWrap}>
              <Input
                type="password"
                name="password"
                placeholder={strings.password}
                errorMessages={passwordErrors}
                value={password}
                onChange={changePasswordHandler}
              />
            </div>

            <Toggle
              name="spOffer"
              defaultChecked={false}
              label={strings.specialOffer}
              onChange={changeOfferHandler}
            />
          </fieldset>
          <Button value={strings.signup} type="submit" element="button" variant="big" icon />
        </form>
        <div className={classes.accountEnter}>
          <p>{strings.alreadyHaveAccount}</p>
          <div className="logInButtonWrap">
            <Button value={strings.login} variant="big white" href="/auth/login" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardReg;
