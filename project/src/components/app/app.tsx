import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Property from '../property/property';

import { AppProps } from './types';
import { AppRoute, AuthorizationStatus } from '../../const';

function App({placeCount, offers}: AppProps): JSX.Element {
  const [favorites, setFavorites] = useState<number[]>([11, 12, 10, 13]);
  const onFavoritesClick = (offerId: number): void => {
    if(favorites.includes(offerId)) {
      setFavorites(favorites.filter((id) => id !== offerId));
    } else {
      setFavorites([...favorites, offerId]);
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main
            placeCount={placeCount}
            offers={offers}
            favorites={favorites}
            onFavoritesClick={onFavoritesClick}
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
            favorites={favorites}
            onFavoritesClick={onFavoritesClick}
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
