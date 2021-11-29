import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { APIRoute, PlaceCardMode } from '../../const';
import { postFavoriteAction } from '../../store/api-actions';
import { PlaceCardProps } from './types';
import { getAuthorizationStatus } from '../../store/user/selectors';

function PlaceCard({offer, onMouseOver, mode}: PlaceCardProps): JSX.Element {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const onFavoritesClick = React.useCallback(
    () => {
      dispatch(postFavoriteAction(offer, authorizationStatus));
    },
    [offer, dispatch, authorizationStatus],
  );
  return (
    <article onMouseOver={() => onMouseOver && onMouseOver(offer.id)}
      className={`${mode === PlaceCardMode.Cities
        ? 'cities__place-card' : 'near-places__card'} place-card`}
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${mode}__image-wrapper place-card__image-wrapper`}>
        <Link to="/">
          <img className="place-card__image" src={offer.previewImage}
            width="260" height="200" alt="Place"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={() => onFavoritesClick()}
            className={`place-card__bookmark-button ${offer.isFavorite && 'place-card__bookmark-button--active'} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.floor(offer.rating)*20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${APIRoute.Offer}${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
