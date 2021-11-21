import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';

import ConnectedCitiesList from '../cities-list/cities-list';
import ConnectedPlacesList from '../places-list/places-list';
import Logo from '../logo/logo';
import ConnectedMap from '../map/map';

import { AppRoute, AuthorizationStatus, PlaceCardMode } from '../../const';
import { MainProps } from './types';
import { State } from '../../types/state';
import { logoutAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';

const mapStateToProps = ({authorizationStatus, authInfo}: State) => ({
  authorizationStatus,
  authInfo,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogout() {
    dispatch(logoutAction());
  },
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainProps;

function Main(props: ConnectedComponentProps): JSX.Element {
  const {
    authorizationStatus,
    authInfo,
    onFavoritesClick,
    onOfferItemHover,
    onLogout,
  } = props;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{authInfo?.email}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link onClick={onLogout} className="header__nav-link" to="/">
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SignIn}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <ConnectedCitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <ConnectedPlacesList
              onFavoritesClick={onFavoritesClick}
              onOfferItemHover={onOfferItemHover}
              mode={PlaceCardMode.Cities}
            />
            <div className="cities__right-section">
              <section className="cities__map map">
                <ConnectedMap />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {Main};
export default connector(Main);
