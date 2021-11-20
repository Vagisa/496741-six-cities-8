import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 20% auto;
  width: 170px;
`;

function LoadingScreen(): JSX.Element {
  return (
    <BeatLoader
      color="#4481c3"
      loading
      css={override}
      size={50}
    />
  );
}

export default LoadingScreen;
