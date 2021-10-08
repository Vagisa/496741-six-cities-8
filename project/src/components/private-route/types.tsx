import { RouteProps } from 'react-router';

import { AuthorizationStatus } from '../../const';

export type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}
