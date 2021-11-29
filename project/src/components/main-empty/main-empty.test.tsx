import { render, screen } from '@testing-library/react';
import { makeFakeCity } from '../../utils/mocks';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correctly MainEmpty', () => {
    const fakeCity = makeFakeCity();
    render(<MainEmpty city={fakeCity} />);
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${fakeCity.name}`, 'i'))).toBeInTheDocument();
  });
});
