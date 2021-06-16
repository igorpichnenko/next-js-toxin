import { useState, MouseEvent } from 'react';
import Hammer from 'react-hammerjs';
import classes from './carousel.module.scss';

interface ICarouselTypes {
  imagesSrc: string[];
  isHover: boolean;
}

const Carousel = ({ imagesSrc, isHover }: ICarouselTypes) => {
  const [x, setX] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesArr] = useState(Object.keys(imagesSrc));
  const shift = 270;
  const clsArrWrap = [classes.arrowsWrapper, isHover ? classes.arrowsWrapVisible : ''].join(' ');
  const clsSlide = [classes.slide, isHover ? classes.slideShadow : ''].join(' ');

  const isEndSlide = currentSlide >= slidesArr.length - 1;
  const isFirstSlide = currentSlide === 0;

  const moveRight = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isEndSlide) {
      setX(0);
      setCurrentSlide(0);
      return;
    }
    setX(x - shift);
    setCurrentSlide(currentSlide + 1);
  };

  const moveLeft = (e: MouseEvent) => {
    e.preventDefault();
    if (isFirstSlide) {
      setX((slidesArr.length - 1) * -shift);
      setCurrentSlide(slidesArr.length - 1);
      return;
    }
    setX(x + shift);
    setCurrentSlide(currentSlide - 1);
  };

  const renderDots = () => slidesArr.map((key, index) => {
    const handlerDotClick = (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setCurrentSlide(index);
      setX(index * -shift);
    };
    const clsDot = [classes.dot, index === currentSlide ? classes.activeDot : ''].join(' ');
    return <div className={clsDot} key={key} onClick={handlerDotClick}></div>;
  });

  const handlerSwipe = (e: any) => {
    if (e.deltaX > 0) moveLeft(e);
    else moveRight(e);
  };

  const handlerClickDotsWrap = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Hammer onSwipe={handlerSwipe}>
      <div className={classes.carousel}>
        <div className={clsArrWrap}>
          <div className={classes.arrowLeft} onClick={moveLeft}></div>
          <div className={classes.arrowRight} onClick={moveRight}></div>
        </div>
        <div
          className={classes.slidesWrapper}
          style={{ transform: `translateX(${x}px)`, transition: '0.3s' }}
        >
          {imagesSrc.map((src, index) => (
            <div key={index} className={clsSlide}>
              <img src={src} alt="Комната" className={classes.img} />
            </div>
          ))}
        </div>
        <div className={classes.dotsWrapper} onClick={handlerClickDotsWrap}>
          {renderDots()}
        </div>
      </div>
    </Hammer>
  );
};

export default Carousel;
