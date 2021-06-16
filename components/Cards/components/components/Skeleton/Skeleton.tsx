import React from 'react';
import ContentLoader from 'react-content-loader';
import classes from './skeleton.module.scss';

const Skeleton = () => (
  <ContentLoader
    uniqueKey="products"
    className={classes.skeleton}
    speed={3}
    width={265}
    height={237}
    viewBox="0 0 265 237"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="6" ry="6" width="270" height="155" />
    <rect x="0" y="159" rx="3" ry="3" width="270" height="35" />
    <rect x="0" y="199" rx="3" ry="3" width="270" height="39" />
  </ContentLoader>
);

export default Skeleton;
