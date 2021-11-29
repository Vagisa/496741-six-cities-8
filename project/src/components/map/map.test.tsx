import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { random } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { makeFakeOffer, makeFakeOffers } from '../../utils/mocks';
import Map from './map';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Map', () => {
  const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];
  const fakeOffer = random.arrayElement(fakeOffers);
  const store = mockStore({
    OFFERS: {city: fakeOffer.city, activeOffer: fakeOffer},
  });
  it('should render correctly Map', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Map offers={fakeOffers} />
        </Router>
      </Provider>);
    expect(screen.getByTestId('Map')).toBeInTheDocument();
  });
});
