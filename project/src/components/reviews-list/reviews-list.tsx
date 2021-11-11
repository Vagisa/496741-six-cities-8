import CommentForm from '../comment-form/comment-form';
import Review from '../review/review';

import { ReviewsListProps } from './types';

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review
            review={review}
            key={review.id}
          />
        ))}
      </ul>
      <CommentForm />
    </section>
  );
}

export default ReviewsList;
