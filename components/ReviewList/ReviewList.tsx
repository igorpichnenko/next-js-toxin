import LocalizedStrings from 'react-localization';
import reviewListLocale from 'public/locales/components/reviewList/reviewList';
import { useRouter } from 'next/router';

import Typography from 'components/Typography/Typography';
import Review, { IReviewItem, ILikeItem } from 'components/Review/Review';
import classes from './reviewList.module.scss';

const strings = new LocalizedStrings(reviewListLocale);

interface IReviewListProps {
  reviewListParam: {
    title: string;
    items: IReviewItem[];
  };
  onChange: (item: ILikeItem) => void;
  onReviewRemove: (reviewParam: IReviewItem) => void
}

const ReviewList = (props: IReviewListProps) => {
  const { reviewListParam, onChange, onReviewRemove } = props;
  const { title, items } = reviewListParam;
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  return (
    <div className={classes.list}>
      <div className={classes.titleWrap}>
        <div className={classes.title}>
          <Typography variant="h2">{title}</Typography>
        </div>
        <span className={classes.amount}>{`${items.length} ${strings.review}`}</span>
      </div>
      {items.map((reviewItem, key) => (
        <div key={`review-item-${key}`} className={classes.item}>
          <Review handleReviewClick={onReviewRemove} reviewParam={reviewItem} onChange={onChange} />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
export type { IReviewListProps, IReviewItem };
