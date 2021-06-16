import React, { useState } from 'react';

import LocalizedStrings from 'react-localization';
import footerLocale from 'public/locales/components/footer/footer';
import { useRouter } from 'next/router';

import { secondaryRoutes } from 'routes/routes';
import Container from 'components/Container/Container';
import Logo from 'components/Logo/Logo';
import Typography from 'components/Typography/Typography';
import NavSecondary from 'components/NavSecondary/NavSecondary';
import Input from 'components/Input/Input';
import Copyright from 'components/Copyright/Copyright';
import SocialButtons from 'components/SocialButtons/SocialButtons';
import classes from './footer.module.scss';

const strings = new LocalizedStrings(footerLocale);

const Footer = ({ withBorderTop = false }) => {
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const [feedbackEmail, setFeedbackEmail] = useState<string>('');

  const { navigationRoutes, aboutRoutes, supportRoutes } = secondaryRoutes;
  const footerClass = withBorderTop
    ? `${classes.footer} ${classes.footerWithBorderTop}`
    : classes.footer;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackEmail(e.target.value);
  };

  return (
    <footer className={footerClass}>
      <Container>
        <div className={classes.wrap}>
          <div className={classes.content}>
            <div className={`${classes.col} ${classes.colLarge}`}>
              <div className={classes.logoWrap}>
                <Logo />
              </div>
              <div className={classes.textContentWrap}>
                <Typography variant="body">{strings.booking}</Typography>
              </div>
            </div>
            <div className={classes.colGroup}>
              <div className={classes.col}>
                <div className={classes.titleNavWrap}>
                  <Typography variant="h3"> {strings.navigation}</Typography>
                </div>
                <NavSecondary routes={navigationRoutes} />
              </div>
              <div className={classes.col}>
                <div className={classes.titleNavWrap}>
                  <Typography variant="h3"> {strings.about}</Typography>
                </div>
                <NavSecondary routes={aboutRoutes} />
              </div>
              <div className={classes.col}>
                <div className={classes.titleNavWrap}>
                  <Typography variant="h3"> {strings.help}</Typography>
                </div>
                <NavSecondary routes={supportRoutes} />
              </div>
              <div className={`${classes.col} ${classes.colLarge}`}>
                <div className={classes.titleWrap}>
                  <Typography variant="h3"> {strings.subscribe}</Typography>
                </div>
                <div className={classes.textContentWrap}>
                  <Typography variant="body">{strings.offers}</Typography>
                </div>
                <form>
                  <Input
                    value={feedbackEmail}
                    type="text"
                    name="email"
                    placeholder="Email"
                    withButton
                    onChange={changeHandler}
                  />
                </form>
              </div>
            </div>
          </div>
          <div className={classes.sideInfo}>
            <div className={classes.copyrightWrap}>
              <Copyright />
            </div>
            <SocialButtons />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
