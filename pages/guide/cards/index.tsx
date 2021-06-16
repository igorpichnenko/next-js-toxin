import React from 'react';

import CardRoom from 'components/CardRoom/CardRoom';
import SvgSprite from 'components/SvgSprite/SvgSprite';

import classes from './cards.module.scss';

const Cards = () => (
  <>
    <div className={classes.cards}>
      <CardRoom
        cardKey={0}
        onClick={(number) => console.log(number)}
        rate={4}
        id={343}
        imagesSrc={['/image.jpg', '/image.jpg', '/image.jpg', '/image.jpg']}
        number={'888'}
        type="luxury"
        price={9990}
        reviews={145}
      />
      <SvgSprite />
    </div>
  </>
);

export default Cards;
