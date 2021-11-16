import { connect, ConnectedProps } from 'react-redux';
import PlaceCard from '../place-card/place-card';

import { PlacesListProps } from './types';
import { State } from '../../types/state';

const mapStateToProps = ({city, offers}: State) => ({
  city,
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PlacesListProps;

function PlacesList({
  city,
  placeCount,
  offers,
  favorites,
  onFavoritesClick,
  onOfferItemHover,
  mode,
}: ConnectedComponentProps): JSX.Element {

  const offersFiltered = offers.filter((offer) => offer.city.name === city.name);
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersFiltered.length} places to stay in {city.name}</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
          Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={0}>Price: low to high</li>
          <li className="places__option" tabIndex={0}>Price: high to low</li>
          <li className="places__option" tabIndex={0}>Top rated first</li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        {
          offersFiltered
            .slice(0, placeCount)
            .map((offer) => (
              <PlaceCard
                isFavorite={favorites.includes(offer.id)}
                offer={offer}
                onMouseOver={onOfferItemHover}
                onFavoritesClick={onFavoritesClick}
                key={offer.id}
                mode={mode}
              />
            ))
        }
      </div>
    </section>
  );
}

export {PlacesList};
export default connector(PlacesList);
