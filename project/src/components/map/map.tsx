import leaflet from 'leaflet';
import { useEffect, useRef } from 'react';

import { MapProps } from './types';
import useMap from './use-map';

function Map({city, offers, activeOffer}: MapProps): JSX.Element {
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
    <section className="cities__map map">
      <div
        style={{height: '100%'}}
        ref={mapRef}
      />
    </section>
  );
}

export default Map;
