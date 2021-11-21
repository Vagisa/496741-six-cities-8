import { History } from 'history';
import { RouteProps } from 'react-router';

import { AuthorizationStatus } from '../../const';

type RenderFuncProps = {
  history: History<unknown>;
}

export type PrivateRouteProps = RouteProps & {
  render: (props: RenderFuncProps) => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}
