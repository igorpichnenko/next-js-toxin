import classes from './feature.module.scss';

interface IFeature {
  title: string;
  description: string;
  icon: FeatureIcon;
}

type FeatureIcon = 'smile' | 'house' | 'fire';

interface IFeatureProps {
  featureParam: IFeature;
}

const Feature = ({ featureParam }: IFeatureProps) => {
  const { title, description, icon } = featureParam;
  const iconVariants = { smile: '#insert-emoticon', house: '#location-city', fire: '#whatshot' };

  return (
    <li className={classes.featureItem}>
      <div className={classes.featureIcon}>
        <svg className={classes.icon} width="48" height="48">
          <use xlinkHref={iconVariants[icon]}></use>
        </svg>
      </div>
      <section className={classes.featureContent}>
        <h2 className={classes.featureTitle}>{title}</h2>
        <p className={classes.featureDescription}>{description}</p>
      </section>
    </li>
  );
};

export default Feature;
export type { FeatureIcon };
