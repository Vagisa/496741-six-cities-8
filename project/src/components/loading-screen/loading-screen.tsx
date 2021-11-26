import { SpinnerCircular } from 'spinners-react';

const spinnerStyle: React.CSSProperties = {
  margin: '200px auto',
  width: '200px',
};

function LoadingScreen(): JSX.Element {
  return (
    <div style={spinnerStyle}>
      <SpinnerCircular size={200} color="#4481c3" />
    </div>
  );
}

export default LoadingScreen;
