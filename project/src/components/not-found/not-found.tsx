import { Link } from 'react-router-dom';

import Logo from '../logo/logo';
import HeaderNav from '../header-nav/header-nav';

function NotFound (): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <HeaderNav />
          </div>
        </div>
      </header>
      <main
        className="page__main page__main--index"
        style={{margin: 'auto'}}
      >
        <h1>
          404.
          <br />
          <small>Page not found</small>
        </h1>
        <Link to="/">Go to main page</Link>
        <img src="img/not-faund.jpg" alt="Not-faund" />
      </main>
    </div>
  );
}

export default NotFound;
