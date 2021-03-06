import React from 'react';
import { Link } from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <Link className="header__logo-link" to="/">
      <img
        className="header__logo" src="img/logo.svg"
        alt="Логотип 6 городов"
        width="81" height="41"
      />
    </Link>
  );
}

export default React.memo(Logo);
