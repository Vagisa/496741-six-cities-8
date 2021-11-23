import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Main from '../main/main';
import Property from '../property/property';
import Favorites from '../favorites/favorites';
import LoadingScreen from '../loading-screen/loading-screen';
import Login from '../login/login';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';

import { AppRoute } from '../../const';
import browserHistory from '../../brouser-history';
import { changeActiveOffer, toggleFavorite } from '../../store/action';
import { isCheckedAuth } from '../../six-sities';
import { Offer } from '../../types/offers';
import { getOffers } from '../../store/offers/selectors';
import { getAuthorizationStatus, getFavorites, getLoadedDataStatus } from '../../store/user/selectors';

function App(): JSX.Element {
  const offers = useSelector(getOffers);
  const favorites = useSelector(getFavorites);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getLoadedDataStatus);

  const dispatch = useDispatch();

  const setActiveOffer = (offer: Offer | undefined) => {
    dispatch(changeActiveOffer(offer));
  };

  const onFavoritesClick = (offerId: number) => {
    dispatch(toggleFavorite(offerId));
  };

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

export default App;
