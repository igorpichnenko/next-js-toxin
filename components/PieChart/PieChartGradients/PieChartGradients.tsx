import classes from './pieChartGradient.module.scss';

const PieChartGradients = () => (
  <>
    <linearGradient id="good" x1=".5" x2=".5" y2="1">
      <stop className={classes.goodStart} />
      <stop offset="1" className={classes.goodEnd} />
    </linearGradient>
    <linearGradient id="excellent" x1=".5" x2=".5" y2="1">
      <stop className={classes.excellentStart} />
      <stop offset="1" className={classes.excellentEnd} />
    </linearGradient>
    <linearGradient id="poor" x1=".5" x2=".5" y2="1">
      <stop className={classes.poorStart} />
      <stop offset="1" className={classes.poorEnd} />
    </linearGradient>
    <linearGradient id="ok" x1=".5" x2=".5" y2="1">
      <stop className={classes.okStart} />
      <stop offset="1" className={classes.okEnd} />
    </linearGradient>
  </>
);

export default PieChartGradients;
