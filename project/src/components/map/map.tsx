import { connect, ConnectedProps } from 'react-redux';
import leaflet from 'leaflet';
import { useEffect, useRef } from 'react';
import useMap from './use-map';

import { State } from '../../types/state';
import { MapProps } from './types';

const mapStateToProps = ({city, offers, activeOffer}: State) => ({
  city,
  offers,
  activeOffer,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MapProps;


function Map({city, offers, activeOffer}: ConnectedComponentProps): JSX.Element {
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
    />
  );
}

export {Map};
export default connector(Map);
