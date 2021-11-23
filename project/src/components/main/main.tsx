import { useSelector } from 'react-redux';

import CitiesList from '../cities-list/cities-list';
import HeaderNav from '../header-nav/header-nav';
import PlacesList from '../places-list/places-list';
import Map from '../map/map';
import Logo from '../logo/logo';
import MainEmpty from '../main-empty/main-empty';

import { MainProps } from './types';
import { PlaceCardMode } from '../../const';
import { City } from '../../types/cities';
import { Offer } from '../../types/offers';
import { getCity, getOffers } from '../../store/offers/selectors';

function Main(props: MainProps): JSX.Element {
  const {
    onFavoritesClick,
    onOfferItemHover,
  } = props;

  const city= useSelector(getCity);
  const offers = useSelector(getOffers);

  const checksAvailableRooms = (cityToSearch: City, offersList: Offer[]): boolean => {
    const offersFiltered = offersList
      .filter((offer) => offer.city.name === cityToSearch.name);

    return offersFiltered.length === 0;
  };

  const isEmptyOfferList = checksAvailableRooms(city, offers);

  return (
    <div className="page page--gray page--main">
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

      <main
        className={`page__main page__main--index
        ${isEmptyOfferList ? 'page__main--index-empty' : ''}`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          <div
            className={`cities__places-container
            ${isEmptyOfferList ? 'cities__places-container--empty' : ''}
            container`}
          >
            {isEmptyOfferList ? <MainEmpty city={city}/> :
              <>
                <PlacesList
                  onFavoritesClick={onFavoritesClick}
                  onOfferItemHover={onOfferItemHover}
                  mode={PlaceCardMode.Cities}
                />
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map offers={offers} />
                  </section>
                </div>
              </>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
