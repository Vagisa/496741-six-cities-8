import {AppProps} from './types';
import Main from '../main/main';

function App({placeCount}: AppProps): JSX.Element {
  return <Main placeCount={placeCount} />;
}

export default App;
