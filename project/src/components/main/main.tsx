import ConnectedCitiesList from '../cities-list/cities-list';
import ConnectedHeaderNav from '../header-nav/header-nav';
import ConnectedPlacesList from '../places-list/places-list';
import ConnectedMap from '../map/map';
import Logo from '../logo/logo';

import { PlaceCardMode } from '../../const';
import { MainProps } from './types';

function Main(props: MainProps): JSX.Element {
  const {
    onFavoritesClick,
    onOfferItemHover,
  } = props;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <ConnectedHeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <ConnectedCitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <ConnectedPlacesList
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
