import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Property from '../property/property';

import { Actions } from '../../types/action';
import { AppProps } from './types';
import { AppRoute, AuthorizationStatus } from '../../const';
import { changeActiveOffer, toggleFavorite } from '../../store/action';
import { Offer } from '../../types/offers';
import { State } from '../../types/state';

const mapStateToProps = ({activeOffer, offers, favorites}: State) => ({
  activeOffer,
  offers,
  favorites,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  setActiveOffer(offer: Offer | undefined) {
    dispatch(changeActiveOffer(offer));
  },
  onFavoritesClick(offerId: number) {
    dispatch(toggleFavorite(offerId));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppProps;

function App(props: ConnectedComponentProps): JSX.Element {
  const {
    placeCount,
    activeOffer,
    offers,
    setActiveOffer,
    favorites,
    onFavoritesClick,
    reviews} = props;

  const onOfferItemHover = (offerItemId: number) => {
    const currentPoint = offers.find((offer) =>
      offer.id === offerItemId,
    );
    setActiveOffer(currentPoint);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main
            placeCount={placeCount}
            favorites={favorites}
            onFavoritesClick={onFavoritesClick}
            onOfferItemHover={onOfferItemHover}
          />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <Login />
        </Route>
        <PrivateRoute exact path={AppRoute.Favorites}
          render={() => (
            <Favorites
              offers={offers}
              favorites={favorites}
              onFavoritesClick={onFavoritesClick}
            />)}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Room}>
          <Property
            offers={offers}
            activeOffer={activeOffer}
            reviews={reviews}
            favorites={favorites}
            onFavoritesClick={onFavoritesClick}
            onOfferItemHover={onOfferItemHover}
          />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
