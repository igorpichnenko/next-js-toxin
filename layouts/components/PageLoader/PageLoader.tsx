import Loader from 'react-spinners/RiseLoader';

import classes from './pageLoader.module.scss';

const PageLoader = () => (
  <div className={classes.wrapper}>
    <Loader size={40} color="#6fcf97" />
  </div>
);
export default PageLoader;
