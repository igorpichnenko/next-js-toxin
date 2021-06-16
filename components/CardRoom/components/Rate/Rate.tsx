import classes from './rate.module.scss';

interface IRate {
  rate: number;
}

const Rate = ({ rate }: IRate) => {
  const helpArr = [1, 2, 3, 4, 5];

  return (
    <div className={classes.rate}>
      {helpArr.map((item) => {
        if (item <= rate) {
          return (
            <svg key={item} className={classes.star}>
              <use xlinkHref="#star"></use>
            </svg>
          );
        }
        return (
          <svg key={item} className={classes.star}>
            <use xlinkHref="#star-border"></use>
          </svg>
        );
      })}
    </div>
  );
};

export default Rate;
