import leaflet from 'leaflet';
import { useEffect, useRef } from 'react';

import { MapProps } from './types';
import useMap from './use-map';

function Map({offer, offers}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, offer.city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  // const currentCustomIcon = leaflet.icon({
  //   iconUrl: '/img/pin-active.svg',
  //   iconSize: [27, 39],
  //   iconAnchor: [13.5, 39],
  // });

  useEffect(() => {
    if (map) {
      offers.forEach((item) => {
        leaflet.marker({
          lat: item.location.latitude,
          lng: item.location.longitude,
        }, {
          icon: defaultCustomIcon,
        }).addTo(map);
      });
    }
  }, [map, offers, defaultCustomIcon]);

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
