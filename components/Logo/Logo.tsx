import Link from 'next/link';
import classes from './logo.module.scss';

function Logo() {
  return (
    <Link href="/" shallow={true}>
      <a>
        <svg className={classes.logo}>
          <use xlinkHref="#logo-colored"></use>
        </svg>
      </a>
    </Link>
  );
}

export default Logo;
