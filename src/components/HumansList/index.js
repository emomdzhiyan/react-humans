import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import './style.scss';
import { getHuman, setNewHuman } from '../../store/actions';

function getFilteredHumans(humans, value) {
  const filteredArr = humans.filter(({ name, notes }) => (
    name.toLowerCase().includes(value.toLowerCase()) || notes.toLowerCase().includes(value.toLowerCase())));
  return filteredArr;
}

const HumansList = memo((
  {
    humans,
    id,
    getHuman: chooseHuman,
    setNewHuman: cancelSelection,
  },
) => {
  const [searchValue, setSearchValue] = useState('');
  const [renderedArr, setArr] = useState(humans);
  const onHumanClick = (humanId) => {
    chooseHuman(humanId);
  };
  const onNewHumanClick = () => {
    cancelSelection();
  };
  const onSearch = (e) => {
    const { value } = e.target;
    if (value) {
      const filteredArr = getFilteredHumans(humans, value);
      setSearchValue(value);
      setArr(filteredArr);
    } else {
      setSearchValue(value);
      setArr(humans);
    }
  };
  const clearSearch = () => {
    setSearchValue('');
    setArr(humans);
  };
  useEffect(() => {
    setArr(humans);
  }, [humans]);
  return (
    <div className="d-block col-3">
      <div className="humans-list-column">
        <div className="input-group p-3">
          <form>
            <input placeholder="Search" type="text" className="form-control" value={searchValue} onChange={onSearch} />
            <button type="button" className="close close-button" aria-label="Close" onClick={clearSearch}>
              <span aria-hidden="true">&times;</span>
            </button>
          </form>
        </div>
        <div className="px-3">
          <button
            type="button"
            className="btn btn-sm btn-info btn-block mt-3"
            onClick={onNewHumanClick}
          >
            New Human
          </button>
        </div>
        <ul className="humans-list list-group ">
          {renderedArr.length
            ? renderedArr.map(human => (
              <li
                key={human.id}

                className={cn('list-element list-group-item-action', {
                  'bg-white': human.id === id,
                })}
              >
                <div
                  onKeyPress={() => {
                  }}
                  onClick={() => onHumanClick(human.id)}
                  role="button"
                  tabIndex={-1}
                >
                  <span>{human.name}</span>
                </div>
              </li>
            ))
            : <li className="list-element">No humans</li>
          }
        </ul>
      </div>
    </div>
  );
});

HumansList.propTypes = {
  humans: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getHuman: PropTypes.func.isRequired,
  setNewHuman: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  humans: state.humansReducer.humans,
  id: state.humansReducer.id,
});

const mapDispatchToProps = {
  getHuman,
  setNewHuman,
};

export default connect(mapStateToProps, mapDispatchToProps)(HumansList);
