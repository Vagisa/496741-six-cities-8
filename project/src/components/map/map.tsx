import leaflet from 'leaflet';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import useMap from './use-map';

import { MapProps } from './types';
import { getActiveOffer, getCity } from '../../store/offers/selectors';


function Map({offers}: MapProps): JSX.Element {
  const city = useSelector(getCity);
  const activeOffer = useSelector(getActiveOffer);
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: '/img/pin-active.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: (activeOffer !== undefined && offer.id === activeOffer.id)
            ? currentCustomIcon
            : defaultCustomIcon,
        }).addTo(map);
      });
    }
  }, [
    map,
    offers,
    city,
    activeOffer,
    currentCustomIcon,
    defaultCustomIcon,
  ]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
      data-testid="Map"
    />
  );
}

export default Map;
