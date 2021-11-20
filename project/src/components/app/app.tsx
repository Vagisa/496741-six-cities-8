import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';

import Favorites from '../favorites/favorites';
import LoadingScreen from '../loading-screen/loading-screen';
import Login from '../login/login';
import Main from '../main/main';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Property from '../property/property';

import { Actions } from '../../types/action';
import { AppProps } from './types';
import { AppRoute } from '../../const';
import browserHistory from '../../brouser-history';
import { changeActiveOffer, toggleFavorite } from '../../store/action';
import { isCheckedAuth } from '../../six-sities';
import { Offer } from '../../types/offers';
import { State } from '../../types/state';

const mapStateToProps = ({activeOffer, offers, favorites, authorizationStatus, isDataLoaded}: State) => ({
  activeOffer,
  offers,
  favorites,
  authorizationStatus,
  isDataLoaded,
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
    activeOffer,
    offers,
    setActiveOffer,
    favorites,
    onFavoritesClick,
    reviews,
    authorizationStatus,
    isDataLoaded,
  } = props;

  const onOfferItemHover = (offerItemId: number) => {
    const currentPoint = offers.find((offer) =>
      offer.id === offerItemId,
    );
    setActiveOffer(currentPoint);
  };

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main
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
