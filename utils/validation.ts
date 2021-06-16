interface IValidation {
  isValid: boolean;
  errorMessages: ValidationErrors[];
}

enum ValidationErrors {
  errorEnterEmail = 'errorEnterEmail',
  errorIncorrectEmail = 'errorIncorrectEmail',
  errorEnterPassword = 'errorEnterPassword',
  errorPasswordLetters = 'errorPasswordLetters',
  errorPasswordNumbers = 'errorPasswordNumbers',
  errorIncorrectDate = 'errorIncorrectDate',
  errorAge18 = 'errorAge18',
  errorEnterBirthDate = 'errorEnterBirthDate',
  errorPasswordMinLength = 'errorPasswordMinLength',
  errorPasswordMaxLength = 'errorPasswordMaxLength',

  incorrectMonth = 'incorrectMonth',
  enterCorrectMonth = 'enterCorrectMonth',
}

const validateEmail = (email: string) => {
  if (!email) {
    return { isValid: false, errorMessages: [ValidationErrors.errorEnterEmail] };
  }

  const validation: IValidation = { isValid: true, errorMessages: [] };
  const expression = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/;

  if (!expression.test(email.toLowerCase())) {
    validation.isValid = false;
    validation.errorMessages.push(ValidationErrors.errorIncorrectEmail);
  }
  return validation;
};

const validatePassword = (password: string) => {
  if (!password) {
    return { isValid: false, errorMessages: [ValidationErrors.errorEnterPassword] };
  }

  const validation: IValidation = { isValid: true, errorMessages: [] };
  const passwordRange = { min: 8, max: 32 };
  const expressions = {
    number: /(?=.*[0-9])/g,
    latin: /(?=.*[a-zA-Z])/g,
  };

  if (password.length < passwordRange.min) {
    validation.isValid = false;
    validation.errorMessages.push(ValidationErrors.errorPasswordMinLength);
  }

  if (password.length > passwordRange.max) {
    validation.isValid = false;
    validation.errorMessages.push(ValidationErrors.errorPasswordMaxLength);
  }

  if (!expressions.latin.test(password.trim())) {
    validation.isValid = false;
    validation.errorMessages.push(ValidationErrors.errorPasswordLetters);
  }

  if (!expressions.number.test(password.trim())) {
    validation.isValid = false;
    validation.errorMessages.push(ValidationErrors.errorPasswordNumbers);
  }

  return validation;
};

const validateBirthday = (birthday: string) => {
  const minDate = new Date(1920, 1, 1);
  const todayYear = new Date(Date.now()).getFullYear();
  const todayDay = new Date(Date.now()).getDate();
  const todayMonth = new Date(Date.now()).getMonth();
  const maxDate = new Date(todayYear - 18, todayMonth, todayDay);
  const birthdayArr = birthday.split('.');

  const day = Number(birthdayArr[0]);
  const month = Number(birthdayArr[1]);
  const year = Number(birthdayArr[2]);

  const currentBirthday = new Date(year, month - 1, day);
  const dayMax = new Date(year, month + 1, 0).getDate();
  const dayMin = 1;
  const monthMax = 12;
  const monthMin = 1;
  const validation: IValidation = { isValid: false, errorMessages: [] };

  const isDayCorrect = day <= dayMax && day >= dayMin;
  const isMonthCorrect = month <= monthMax && month >= monthMin;
  if (!isDayCorrect) validation.errorMessages.push(ValidationErrors.incorrectMonth);
  else if (!isMonthCorrect) validation.errorMessages.push(ValidationErrors.enterCorrectMonth);
  if (currentBirthday < minDate) validation.errorMessages.push(ValidationErrors.errorIncorrectDate);
  if (currentBirthday > maxDate) validation.errorMessages.push(ValidationErrors.errorAge18);
  if (!birthday) validation.errorMessages.push(ValidationErrors.errorEnterBirthDate);

  if (validation.errorMessages.length === 0) validation.isValid = true;
  return validation;
};

export { validateBirthday, validateEmail, validatePassword, ValidationErrors };
