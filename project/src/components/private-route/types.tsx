import { History } from 'history';
import { RouteProps } from 'react-router';

type RenderFuncProps = {
  history: History<unknown>;
}

export type PrivateRouteProps = RouteProps & {
  render: (props: RenderFuncProps) => JSX.Element;
}
