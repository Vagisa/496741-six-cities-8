import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';

const Setting = {
  PLACE_COUNT: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      placeCount={Setting.PLACE_COUNT}
      offers={offers}
      reviews={reviews}
    />
  </React.StrictMode>,
  document.getElementById('root'));
