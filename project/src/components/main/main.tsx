import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import Logo from '../logo/logo';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';

import { changeCity } from '../../store/action';
import { MainProps } from './types';
import { cities } from '../../mocks/cities';
import { PlaceCardMode } from '../../const';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { City } from '../../types/cities';

const mapStateToProps = ({city}: State) => ({
  city,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  setActiveCity(activeCity: City) {
    dispatch(changeCity(activeCity));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainProps;

function Main(props: ConnectedComponentProps): JSX.Element {

  const {
    city,
    setActiveCity,
    placeCount,
    offers,
    activeOffer,
    favorites,
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
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((activeCity) => (
                <li key={activeCity.name} onClick={() => setActiveCity(activeCity)} className="locations__item">
                  <Link className={`locations__item-link tabs__item
                  ${city.name === activeCity.name ? 'tabs__item--active' : ''} `} to="/"
                  >
                    <span>{activeCity.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <PlacesList
              placeCount={placeCount}
              offers={offers}
              favorites={favorites}
              onFavoritesClick={onFavoritesClick}
              onOfferItemHover={onOfferItemHover}
              mode={PlaceCardMode.Cities}
            />
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={city}
                  offers={offers}
                  activeOffer = {activeOffer}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {Main};
export default connector(Main);
