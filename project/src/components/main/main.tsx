import { connect, ConnectedProps } from 'react-redux';

import ConnectedCitiesList from '../cities-list/cities-list';
import ConnectedHeaderNav from '../header-nav/header-nav';
import ConnectedPlacesList from '../places-list/places-list';
import ConnectedMap from '../map/map';
import Logo from '../logo/logo';
import MainEmpty from '../main-empty/main-empty';

import { MainProps } from './types';
import { PlaceCardMode } from '../../const';
import { State } from '../../types/state';
import { City } from '../../types/cities';
import { Offer } from '../../types/offers';

const mapStateToProps = ({OFFERS}: State) => ({
  city: OFFERS.city,
  offers: OFFERS.offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainProps;

function Main(props: ConnectedComponentProps): JSX.Element {
  const {
    city,
    offers,
    onFavoritesClick,
    onOfferItemHover,
  } = props;

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
            <ConnectedHeaderNav />
          </div>
        </div>
      </header>

      <main
        className={`page__main page__main--index
        ${isEmptyOfferList ? 'page__main--index-empty' : ''}`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <ConnectedCitiesList />
        <div className="cities">
          <div
            className={`cities__places-container
            ${isEmptyOfferList ? 'cities__places-container--empty' : ''}
            container`}
          >
            {isEmptyOfferList ? <MainEmpty city={city}/> :
              <>
                <ConnectedPlacesList
                  onFavoritesClick={onFavoritesClick}
                  onOfferItemHover={onOfferItemHover}
                  mode={PlaceCardMode.Cities}
                />
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <ConnectedMap offers={offers} />
                  </section>
                </div>
              </>}
          </div>
        </div>
      </main>
    </div>
  );
}

export {Main};
export default connector(Main);
