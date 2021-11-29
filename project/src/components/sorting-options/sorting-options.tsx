import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { changeSortType } from '../../store/action';
import { SortTypeOptions } from '../../const';
import { getSortOption } from '../../store/offers/selectors';

function SortingOptions(): JSX.Element {
  const sortOption = useSelector(getSortOption);
  const dispatch = useDispatch();
  const onSortTypeChange = (newSortOption: SortTypeOptions) => {
    dispatch(changeSortType(newSortOption));
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={() => {setIsOpen(true);}}
        className="places__sorting-type" tabIndex={0}
      >
        {sortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {Object.values(SortTypeOptions).map((sort) => (
            <li key={sort}
              className={`places__option ${sort === sortOption ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => {setIsOpen(false); onSortTypeChange(sort);}}
              data-testid="Sort"
            >
              {sort}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default React.memo(SortingOptions);
