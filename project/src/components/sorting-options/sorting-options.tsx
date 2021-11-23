import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import { Actions } from '../../types/action';
import { changeSortType } from '../../store/action';
import { SortingOptionsProps } from './types';
import { State } from '../../types/state';
import { SortTypeOptions } from '../../const';
import { getSortOption } from '../../store/offers/selectors';

const mapStateToProps = (state: State) => ({
  sortOption: getSortOption(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSortTypeChange(sortOption: SortTypeOptions) {
    dispatch(changeSortType(sortOption));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & SortingOptionsProps;

function SortingOptions({sortOption, onSortTypeChange}: ConnectedComponentProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={() => {setIsOpen(true);}} className="places__sorting-type" tabIndex={0}>
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
            >
              {sort}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export {SortingOptions};
export default connector(SortingOptions);
