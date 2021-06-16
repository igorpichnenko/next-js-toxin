import LocalizedStrings from 'react-localization';
import featuresLocale from 'public/locales/components/features/features';
import { useRouter } from 'next/router';

import Feature from './Feature/Feature';
import initValues from './initValues';
import classes from './features.module.scss';

interface IRoomFeatures {
  isComfort: boolean;
  isConvenience: boolean;
  isCosiness: boolean;
}

interface IFeaturesProps {
  featuresParam: IRoomFeatures;
}

const strings = new LocalizedStrings(featuresLocale);

const Features = ({ featuresParam }: IFeaturesProps) => {
  const { isComfort, isConvenience, isCosiness } = featuresParam;
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  return (
    <ul className={classes.list}>
      {isComfort && (
        <Feature
          featureParam={{
            ...initValues.comfort,
            title: strings[initValues.comfort.title],
            description: strings[initValues.comfort.description],
          }}
        />
      )}
      {isConvenience && (
        <Feature
          featureParam={{
            ...initValues.convenience,
            title: strings[initValues.convenience.title],
            description: strings[initValues.convenience.description],
          }}
        />
      )}
      {isCosiness && (
        <Feature
          featureParam={{
            ...initValues.cozy,
            title: strings[initValues.cozy.title],
            description: strings[initValues.cozy.description],
          }}
        />
      )}
    </ul>
  );
};

export default Features;
export type { IRoomFeatures };
