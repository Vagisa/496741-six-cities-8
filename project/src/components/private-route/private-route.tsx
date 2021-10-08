import { Route, Redirect } from 'react-router';

import { AppRoute, AuthorizationStatus } from '../../const';
import { PrivateRouteProps } from './types';

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {exact, path, render, authorizationStatus} = props;

  return (
    <Route exact={exact} path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export default PrivateRoute;
