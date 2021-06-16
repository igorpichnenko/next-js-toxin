import classes from './socialButtons.module.scss';

const SocialButtons = () => (
  <div className={classes.socialButtons}>
    <div className={classes.wrap}>
      <ul className={classes.list}>
        <li className={classes.item}>
          <a
            className={classes.link}
            href="https://twitter.com/?lang=ru"
            target="_blank"
            rel="noopener noreferrer"
            title="Мы в твиттере"
          >
            <svg width="22" height="22" className={classes.icon}>
              <use xlinkHref="#twitter"></use>
            </svg>
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.link}
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Мы в фейсбук"
          >
            <svg width="22" height="22" className={classes.icon}>
              <use xlinkHref="#facebook"></use>
            </svg>
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classes.link}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Мы в инстаграм"
          >
            <svg width="22" height="22" className={classes.icon}>
              <use xlinkHref="#inst"></use>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default SocialButtons;
