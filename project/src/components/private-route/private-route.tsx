import { connect, ConnectedProps } from 'react-redux';
import { Route, Redirect } from 'react-router';

import { AppRoute, AuthorizationStatus } from '../../const';
import { PrivateRouteProps } from './types';
import { State } from '../../types/state';

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
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

export {PrivateRoute};
export default connector(PrivateRoute);
