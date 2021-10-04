import Main from '../main/main';

type AppProps = {
  placeCount: number;
}

function App({placeCount}: AppProps): JSX.Element {
  return <Main placeCount={placeCount} />;
}

export default App;
