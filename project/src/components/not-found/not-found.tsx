import { Link } from 'react-router-dom';

import Logo from '../logo/logo';
import ConnectedHeaderNav from '../header-nav/header-nav';

function NotFound (): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <ConnectedHeaderNav />
          </div>
        </div>
      </header>
      <main className="page__main page__main--index" style={{margin: 'auto'}}>
        <h1>
          404.
          <br />
          <small>Page not found</small>
        </h1>
        <Link to="/">Go to main page</Link>
      </main>
    </div>
  );
}

export default NotFound;
