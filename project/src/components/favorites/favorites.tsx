import { Link } from 'react-router-dom';

import HeaderNav from '../header-nav/header-nav';
import FavoritePlaceCard from '../favorite-place-card/favorite-place-card';
import Logo from '../logo/logo';

import { FavoritesProps } from './types';

function Favorites({offers, favorites, onFavoritesClick}: FavoritesProps): JSX.Element {
  const favoriteOffers = offers.filter(({id}) => favorites.includes(id));
  const citiesSet = new Set(favoriteOffers.map((offer) => offer.city.name));
  const cities = [...citiesSet].sort().map((city) => (
    <li key={city} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="/">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {favoriteOffers.filter((offer) => offer.city.name === city).map((offer) => (
          <FavoritePlaceCard key={offer.id} offer={offer}
            onFavoritesClick={onFavoritesClick}
          />
        ))}
      </div>
    </li>
  ));
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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
