import { Link } from 'react-router-dom';

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
