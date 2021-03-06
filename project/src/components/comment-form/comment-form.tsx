import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { CommentData } from '../../types/comment-data';
import { MAX_RATING } from '../../const';
import { postCommentAction } from '../../store/api-actions';
import { CommentFormProps } from './types';

function CommentForm({offerId}: CommentFormProps): JSX.Element {

  const dispatch = useDispatch();

  const onSubmitComment = (comment: CommentData, id: string) => {
    dispatch(postCommentAction(id, comment));
  };

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const stars = (new Array(MAX_RATING)).fill(null).map((_, index) => index + 1).reverse();
  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(evt.target.value, 10));
  };
  return(
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        onSubmitComment({ comment, rating }, offerId);
        setComment('');
        setRating(0);
      }}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {stars.map((value) => (
          <div key={value}>
            <input onChange={handleRatingChange} checked={rating === value}
              className="form__rating-input visually-hidden" name="rating"
              value={value} id={`${value}-stars`} type="radio"
              data-testid="CommentForm"
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        minLength={50}
        maxLength={300}
        onChange={(evt) => {setComment(evt.target.value);}}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={(comment.length < 50 || comment.length > 300 || rating === 0)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
