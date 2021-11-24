import { useSelector } from 'react-redux';

import PlaceCard from '../place-card/place-card';
import SortingOptions from '../sorting-options/sorting-options';

import { PlacesListProps } from './types';
import { SortTypeOptions } from '../../const';
import { Offer } from '../../types/offers';
import { getCity, getOffers, getSortOption } from '../../store/offers/selectors';
import { getFavorites } from '../../store/user/selectors';

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
  onFavoritesClick,
  onOfferItemHover,
  mode,
}: PlacesListProps): JSX.Element {
  const city = useSelector(getCity);
  const offers = useSelector(getOffers);
  const sortOption = useSelector(getSortOption);
  const favorites = useSelector(getFavorites);
  const offersFiltered = offers
    .filter((offer) => offer.city.name === city.name)
    .sort(getSortFunc(sortOption));
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersFiltered.length} places to stay in {city.name}</b>
      <SortingOptions />
      <div className="cities__places-list places__list tabs__content">
        {
          offersFiltered
            .slice()
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

export default PlacesList;
