import { Link } from 'react-router-dom';

import ConnectedCitiesList from '../cities-list/cities-list';
import ConnectedPlacesList from '../places-list/places-list';
import Logo from '../logo/logo';
import ConnectedMap from '../map/map';

import { MainProps } from './types';
import { PlaceCardMode } from '../../const';

function Main(props: MainProps): JSX.Element {

  const {
    placeCount,
    onFavoritesClick,
    onOfferItemHover} = props;

  return (
    <div className="page page--gray page--main">
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <ConnectedCitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <ConnectedPlacesList
              placeCount={placeCount}
              onFavoritesClick={onFavoritesClick}
              onOfferItemHover={onOfferItemHover}
              mode={PlaceCardMode.Cities}
            />
            <div className="cities__right-section">
              <section className="cities__map map">
                <ConnectedMap />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
