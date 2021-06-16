import { FunctionComponent } from 'react';
import classes from './typography.module.scss';

type TypographyProperties = {
  variant: string;
  htmlFor?: string;
};

const Typography: FunctionComponent<TypographyProperties> = ({ variant, htmlFor, children }) => {
  const renderElement = () => {
    switch (variant) {
      case 'h1':
        return <h1 className={classes.h1}>{children}</h1>;
      case 'h2':
        return <h2 className={classes.h2}>{children}</h2>;
      case 'h3':
        return <h3 className={classes.h3}>{children}</h3>;
      case 'legend':
        return <legend className={classes.legend}>{children}</legend>;
      case 'label':
        return (
          <label htmlFor={htmlFor} className={classes.inputLabel}>
            {children}
          </label>
        );
      case 'body':
        return <p className={classes.body}>{children}</p>;
      default:
        return null;
    }
  };

  return renderElement();
};

export default Typography;
