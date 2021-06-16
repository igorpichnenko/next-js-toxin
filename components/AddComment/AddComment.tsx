import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import LocalizedStrings from 'react-localization';

import { addComment } from 'redux/comment/commentActions';
import { State } from 'redux/rootReducer/rootReducer';

import { IReviewItem } from 'components/Review/Review';
import Button from 'components/Button/Button';
import addCommentLocale from 'public/locales/components/addComment/addComment';
import defaultAva from 'components/ImageUpload/helpers';
import TransitionAlerts from 'components/TransitionAlerts/TransitionAlerts';
import classes from './addComment.module.scss';

interface IAddCommentProps {
  onChange: (newItems: IReviewItem) => void;
  addCommentsParams: {
    dbID: string;
  };
}

const AddComment = ({ onChange, addCommentsParams }: IAddCommentProps) => {
  const { dbID } = addCommentsParams;
  const auth = useSelector((state: State) => state.auth);
  const { error } = useSelector((state: State) => state.addComment);
  const [state, setState] = useState('');
  const dispatch = useDispatch();

  const date = new Date().toISOString().split('T')[0];
  const likeCount = Math.floor(Math.random() * 10) + 1;
  const active = Math.random() >= 0.5;

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      image: auth.image || defaultAva,
      name: auth.name,
      surname: auth.surname,
      date,
      msg: state,
      like: {
        active,
        amount: likeCount,
      },
      userId: auth.uid,
    };

    if (dbID) {
      dispatch(addComment(data, dbID));
    }
    onChange(data);
    setState('');
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(e.target.value);
  };

  const strings = new LocalizedStrings(addCommentLocale);
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const { textAreaPlaceholder, buttonText } = strings;

  return (
    <form onSubmit={handleSubmit}>
      <TransitionAlerts errorCode={error?.message} />
      <label className={classes.element}>
        <span className={classes.input}>
          <textarea
            className={classes.text}
            name="comment"
            placeholder={textAreaPlaceholder}
            value={state}
            cols={40}
            rows={3}
            onChange={handleTextareaChange}
          ></textarea>
        </span>
        <span className={classes.button}>
          <Button
            value={buttonText}
            type="submit"
            element="button"
            variant="big"
          />
        </span>
      </label>
    </form>
  );
};

export default AddComment;
