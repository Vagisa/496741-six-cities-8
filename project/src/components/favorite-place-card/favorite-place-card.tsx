import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FavoritePlaceCardProps } from './types';
import { postFavoriteAction } from '../../store/api-actions';
import { AppRoute } from '../../const';
import { getAuthorizationStatus } from '../../store/user/selectors';

function FavoritePlaceCard({offer}: FavoritePlaceCardProps): JSX.Element {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const onFavoritesClick = React.useCallback(
    () => {
      dispatch(postFavoriteAction(offer, authorizationStatus));
    },
    [offer, dispatch, authorizationStatus],
  );
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to="/">
          <img className="place-card__image" src={offer.previewImage}
            width="150" height="110" alt="Place"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={() => onFavoritesClick()}
            className="place-card__bookmark-button place-card__bookmark-button--active button" type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.floor(offer.rating)*20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room.replace(':id', offer.id.toString())}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default FavoritePlaceCard;
