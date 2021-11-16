import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import { Actions } from '../../types/action';
import { CitiesListProps } from './types';
import { cities } from '../../const';
import { City } from '../../types/cities';
import { State } from '../../types/state';
import { changeCity } from '../../store/action';


const mapStateToProps = ({city}: State) => ({
  city,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  setActiveCity(activeCity: City) {
    dispatch(changeCity(activeCity));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CitiesListProps;


function CitiesList({city, setActiveCity}: ConnectedComponentProps): JSX.Element {

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((activeCity) => (
            <li key={activeCity.name} onClick={() => setActiveCity(activeCity)} className="locations__item">
              <Link className={`locations__item-link tabs__item
              ${city.name === activeCity.name ? 'tabs__item--active' : ''} `} to="/"
              >
                <span>{activeCity.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export {CitiesList};
export default connector(CitiesList);
