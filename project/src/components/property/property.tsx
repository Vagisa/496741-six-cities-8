import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import Logo from '../logo/logo';
import ConnectedMap from '../map/map';
import NotFound from '../not-found/not-found';
import PlaceCard from '../place-card/place-card';
import ReviewsList from '../reviews-list/reviews-list';

import { PropertyProps } from './types';
import { PlaceCardMode } from '../../const';

function Property({offers, reviews, favorites, onFavoritesClick, onOfferItemHover}: PropertyProps): JSX.Element {
  const {id} = useParams<{id: string}>();
  const offer = offers.find((item) => item.id.toString() === id);
  if (!offer) {
    return <NotFound />;
  }
  const isFavorite = favorites.includes(offer.id);
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.gallery.map((image) => (
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
                  {offer.heading}
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
                  {offer.bedroomsCount} Bedrooms
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
                  {offer.advantages.map((advantage) => (
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
                  {offer.description.map((paragraph) => (
                    <p key={paragraph} className="property__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <ReviewsList reviews={reviews} />
            </div>
          </div>
          <section className="property__map map">
            <ConnectedMap />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                offers
                  .filter((elem) => (elem.id !== offer.id))
                  .slice(0, 3)
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
