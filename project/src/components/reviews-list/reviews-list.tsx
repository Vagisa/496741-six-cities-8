import { connect, ConnectedProps } from 'react-redux';

import CommentForm from '../comment-form/comment-form';
import Comment from '../comment/comment';

import { NUMBER_DISPLAYED_COMMENTS } from '../../const';
import { ReviewsListProps } from './types';
import { State } from '../../types/state';
import { Review } from '../../types/review';

const mapStateToProps = ({comments}: State) => ({
  comments,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & ReviewsListProps;

function ReviewsList({comments}: ConnectedComponentProps): JSX.Element {

  const sortedComments = comments.sort((first: Review, second: Review) => second.date > first.date ? 1 : -1);

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
      <CommentForm />
    </section>
  );
}

export {ReviewsList};
export default connector(ReviewsList);
