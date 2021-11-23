import { useSelector} from 'react-redux';

import CommentForm from '../comment-form/comment-form';
import Comment from '../comment/comment';

import { AuthorizationStatus, NUMBER_DISPLAYED_COMMENTS } from '../../const';
import { ReviewsListProps } from './types';
import { Review } from '../../types/review';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getComments } from '../../store/property/selectors';

function ReviewsList({offerId}: ReviewsListProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const comments = useSelector(getComments);

  const sortedComments = comments.slice().sort((first: Review, second: Review) => second.date > first.date ? 1 : -1);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {comments.length}
        </span>
      </h2>
      <ul className="reviews__list">
        {sortedComments.slice(0, NUMBER_DISPLAYED_COMMENTS).map((comment) => (
          <Comment
            review={comment}
            key={comment.id}
          />
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth &&
        <CommentForm offerId={offerId} />}
    </section>
  );
}

export default ReviewsList;
