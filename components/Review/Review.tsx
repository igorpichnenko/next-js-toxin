import LocalizedStrings from 'react-localization';
import reviewLocale, {
  personCommentLocale,
} from 'public/locales/components/review/review';
import { useRouter } from 'next/router';

import LikeButton, { ILikeItem } from 'components/LikeButton/LikeButton';
import countDateFromNow from './countDateFromNow';

import classes from './review.module.scss';

interface IReviewItem {
  image: string;
  name: string | null;
  date: string;
  msg: string;
  like: {
    active: boolean;
    amount: number;
  };
  userId: string | null;
  surname: string | null;
}

interface IReviewProps {
  reviewParam: IReviewItem;
  onChange: (item: ILikeItem) => void;
  handleReviewClick: (reviewParam: IReviewItem) => void
}

const strings = new LocalizedStrings(reviewLocale);
const personComment = new LocalizedStrings(personCommentLocale);

const Review = (props: IReviewProps) => {
  const { reviewParam, onChange, handleReviewClick } = props;

  const { image, name, date, msg, like, surname, userId } = reviewParam;
  const { locale = 'ru' } = useRouter();

  strings.setLanguage(locale);
  personComment.setLanguage(locale);

  const { personName, removeButton } = personComment;

  const handleButtonClick = () => {
    handleReviewClick(reviewParam);
  };

  return (
    <article className={classes.review}>
        <div className={classes.removeButtonContainer}>
        <button className={classes.removeButton} onClick={handleButtonClick}>{removeButton}</button>
      </div>
      <div className={classes.row}>
        <div className={classes.leftCol}>
          <div className={classes.imageCont}>
            <img className={classes.avatar} src={image} />
          </div>
        </div>
        <div className={classes.rightCol}>
          <div className={classes.name}>
            {userId ? `${name} ${surname || ''}` : personName}
          </div>
          <div className={classes.text}>{countDateFromNow(date, strings)}</div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.leftCol}>
          <div className={classes.likeCont}>
            <LikeButton likeButtonParam={like} onChange={onChange} />
          </div>
        </div>
        <div className={classes.rightCol}>
          <div className={classes.text}>{msg}</div>
        </div>
      </div>
    </article>
  );
};

export default Review;
export type { IReviewProps, IReviewItem, ILikeItem };
