import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getAuthInfo, getAuthorizationStatus } from '../../store/user/selectors';


function HeaderNav(): JSX.Element {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const authInfo = useSelector(getAuthInfo);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutAction());
  };

  return (
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
  );
}

export default React.memo(HeaderNav);
