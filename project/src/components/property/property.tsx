import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import HeaderNav from '../header-nav/header-nav';
import Map from '../map/map';
import ReviewsList from '../reviews-list/reviews-list';
import Logo from '../logo/logo';
import NotFound from '../not-found/not-found';
import PlaceCard from '../place-card/place-card';

import { NUMBER_DISPLAYED_NEARBY_OFFERS } from '../../const';
import { PropertyProps } from './types';
import { PlaceCardMode } from '../../const';
import { toggleFavorite } from '../../store/action';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchOffersNearbyAction } from '../../store/api-actions';
import { getOffer, getOffersNearby } from '../../store/property/selectors';
import { getFavorites } from '../../store/user/selectors';

function Property({onOfferItemHover}: PropertyProps): JSX.Element {


  const offer = useSelector(getOffer);
  const favorites = useSelector(getFavorites);
  const offersNearby = useSelector(getOffersNearby);

  const dispatch = useDispatch();

  const onFavoritesClick = (offerId: number) => {
    dispatch(toggleFavorite(offerId));
  };

  const {id} = useParams<{id: string}>();

  useEffect(() => {
    dispatch(fetchCurrentOfferAction(id));
    dispatch(fetchCommentsAction(id));
    dispatch(fetchOffersNearbyAction(id));
  }, [id, dispatch]);

  if (!offer) {
    return <NotFound />;
  }

  const isFavorite = favorites.includes(offer.id);
  const displayedOffersNearby = offersNearby.slice(0, NUMBER_DISPLAYED_NEARBY_OFFERS);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="Studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button onClick={() => onFavoritesClick(offer.id)}
                  className={`property__bookmark-button ${isFavorite && 'property__bookmark-button--active'} button`} type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Math.floor(offer.rating)*20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((advantage) => (
                    <li key={advantage} className="property__inside-item">
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro &&
                  <span className="property__user-status">
                    Pro
                  </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <ReviewsList offerId={id}/>
            </div>
          </div>
          <section className="property__map map">
            <Map offers={displayedOffersNearby}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                displayedOffersNearby
                  .map((nearOffer) => (
                    <PlaceCard
                      isFavorite={favorites.includes(offer.id)}
                      offer={nearOffer}
                      onMouseOver={onOfferItemHover}
                      onFavoritesClick={onFavoritesClick}
                      key={nearOffer.id}
                      mode={PlaceCardMode.NearPlaces}
                    />
                  ))
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
