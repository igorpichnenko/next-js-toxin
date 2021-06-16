import React, { FC, useEffect } from 'react';

import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import requestErrorsLocale from 'public/locales/utils/requestErrors';
import LocalizedStrings from 'react-localization';
import { useRouter } from 'next/router';
import { defineError } from 'services/helpers';

import IconButton from '@material-ui/core/IconButton';

import classes from './transitionAlerts.module.scss';

interface ITransitionAlertsProps {
  errorCode?: string | null;
}

const strings = new LocalizedStrings(requestErrorsLocale);

const TransitionAlerts: FC<ITransitionAlertsProps> = ({ errorCode }) => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (errorCode) setOpen(true);
  }, [errorCode]);

  const clickHandler = () => {
    setOpen(false);
  };

  return (
    <>
      {errorCode && (
        <div className={classes.root}>
          <Collapse in={open}>
            <Alert
              classes={{ root: classes.alert }}
              variant="outlined"
              severity="error"
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={clickHandler}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {strings[defineError(errorCode)]}
            </Alert>
          </Collapse>
        </div>
      )}
    </>
  );
};

export default TransitionAlerts;
