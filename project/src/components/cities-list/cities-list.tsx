import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { cities } from '../../const';
import { City } from '../../types/cities';
import { changeCity } from '../../store/action';
import { getCity } from '../../store/offers/selectors';

function CitiesList(): JSX.Element {
  const city = useSelector(getCity);
  const dispatch = useDispatch();
  const setActiveCity = (activeCity: City) => {
    dispatch(changeCity(activeCity));
  };

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

export default CitiesList;
