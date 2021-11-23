import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import { AppRoute, AuthorizationStatus } from '../../const';
import { PrivateRouteProps } from './types';
import { getAuthorizationStatus } from '../../store/user/selectors';

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {exact, path, render} = props;
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route exact={exact} path={path}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render(routeProps)
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export default PrivateRoute;
