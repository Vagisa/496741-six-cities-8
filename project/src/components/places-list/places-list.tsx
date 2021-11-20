import { connect, ConnectedProps } from 'react-redux';

import PlaceCard from '../place-card/place-card';
import ConnectedSortingOptions from '../sorting-options/sorting-options';

import { PlacesListProps } from './types';
import { State } from '../../types/state';
import { SortTypeOptions, PLACE_COUNT } from '../../const';
import { Offer } from '../../types/offers';

const mapStateToProps = ({city, offers, sortOption, favorites}: State) => ({
  city,
  offers,
  sortOption,
  favorites,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PlacesListProps;

function getSortFunc(sortOption: SortTypeOptions): (first: Offer, second: Offer) => number {
  switch (sortOption) {
    case SortTypeOptions.Popular:
      return (first: Offer, second: Offer) => 0;
    case SortTypeOptions.PriceLowToHigh:
      return (first: Offer, second: Offer) => first.price - second.price;
    case SortTypeOptions.PriceHighToLow:
      return (first: Offer, second: Offer) => second.price - first.price;
    case SortTypeOptions.TopRatedFirst:
      return (first: Offer, second: Offer) => second.rating - first.rating;
  }
}

function PlacesList({
  city,
  offers,
  sortOption,
  favorites,
  onFavoritesClick,
  onOfferItemHover,
  mode,
}: ConnectedComponentProps): JSX.Element {
  const offersFiltered = offers
    .filter((offer) => offer.city.name === city.name)
    .sort(getSortFunc(sortOption));
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersFiltered.length} places to stay in {city.name}</b>
      <ConnectedSortingOptions />
      <div className="cities__places-list places__list tabs__content">
        {
          offersFiltered
            .slice(0, PLACE_COUNT)
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
