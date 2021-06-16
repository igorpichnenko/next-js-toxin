import Header from 'components/Header/Header';
import SvgSprite from 'components/SvgSprite/SvgSprite';
import React from 'react';
import classes from './headerAndFooter.module.scss';

const HeaderAndFooter = () => (
  <>
    <div className={classes.item}>
      <Header />
      <SvgSprite />
    </div>
  </>
);

export default HeaderAndFooter;
