import LocalizedStrings from 'react-localization';
import personalCardLocale from 'public/locales/components/personalCard/personalCard';
import validationLocale from 'public/locales/utils/validation';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';
import errors from 'services/errors';

import { profileUpdate } from 'redux/profileUpdate/profileUpdateActions';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'redux/rootReducer/rootReducer';
import { validateEmail } from 'utils/validation';

import ImageUpload, { IImage } from 'components/ImageUpload/ImageUpload';
import { saveImage, uploadImage } from 'redux/imageUpload/imageUploadActions';
import classes from './personalCard.module.scss';

const strings = new LocalizedStrings(personalCardLocale);
const validationStrings = new LocalizedStrings(validationLocale);

const PersonalCard = () => {
  interface IImageState{
    file:IImage
    blobFile: Blob
  }

  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);
  validationStrings.setLanguage(locale);

  const dispatch = useDispatch();
  const { name, surname, email, uid } = useSelector((state: State) => state.auth);

  const [userName, setUserName] = useState<string>(name || '');
  const [userSurname, setSurname] = useState<string>(surname || '');
  const [userEmail, setEmail] = useState<string>(email || '');

  const loginError = useSelector((state: State) => state.auth.loginError);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [authError, setAuthError] = useState<string[]>([]);

  const [imageState, setImageState] = useState<IImageState>();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const { emailAlreadyUse, recentLogin } = errors.auth;

    switch (true) {
      case loginError && loginError.code === emailAlreadyUse:
        setAuthError([strings.errorAlreadyInUse]);
        break;
      case loginError && loginError.code === recentLogin:
        setAuthError([strings.errorLogAgain]);
        break;
      default:
        setAuthError([]);
        break;
    }
  }, [loginError]);

  const handleUserNameInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setUserName(value);
    setIsDisabled(false);
  };

  const handleSurnameInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setSurname(value);
    setIsDisabled(false);
  };

  const handleEmailInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setEmailErrors([]);
    setEmail(value);
    setIsDisabled(false);
  };

  const handleSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (imageState) dispatch(saveImage(imageState.file, uid));

    if (validateEmail(userEmail).isValid) {
      setAuthError([]);
      setEmailErrors([]);

      dispatch(
        profileUpdate({
          name: userName,
          surname: userSurname,
          email: userEmail,
        }),
      );
    } else {
      setEmailErrors(validateEmail(userEmail).errorMessages.map((msg) => validationStrings[msg]));
    }
  };

  const handleImageChange = (file:IImage, blobFile: Blob) => {
    setImageState({ file, blobFile });
    dispatch(uploadImage(file, uid, blobFile));
    setIsDisabled(false);
  };

  return (
    <form className={classes.personalCard} onSubmit={handleSubmitForm}>
      <ImageUpload onChange={handleImageChange}/>
      <div className={classes.wrap}>
        <fieldset className={classes.fieldset}>
          <div className={classes.row}>
            <Typography variant="label">
              <span className={classes.labelSpan}>{strings.yourName}</span>
              <div className={classes.inputWrap}>
                <Input
                  type="text"
                  name="email"
                  placeholder={strings.name}
                  value={userName}
                  onChange={handleUserNameInput}
                  required
                />
              </div>
            </Typography>
            <Typography variant="label">
              <span className={classes.labelSpan}>{strings.yourSurname}</span>
              <Input
                type="text"
                name="email"
                placeholder={strings.surname}
                value={userSurname}
                onChange={handleSurnameInput}
                required
              />
            </Typography>
          </div>
          <Typography variant="label">
            <span className={classes.labelSpan}>{strings.yourEmail}</span>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={userEmail}
              errorMessages={[...authError, ...emailErrors]}
              onChange={handleEmailInput}
              required
            />
          </Typography>
        </fieldset>
        <Button disabled={isDisabled} value={strings.save} type="submit" element="button" variant="big" icon />
      </div>
    </form>
  );
};

export default PersonalCard;
