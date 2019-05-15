import React, { memo } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import { getHuman, newHuman } from '../../store/actions';

const HumansList = memo((props) => {
  const onHumanClick = (id) => {
    props.getHuman(id);
  };
  const onNewHumanClick = () => {
    props.newHuman();
  };
  return (
    <div className="col-3 humans-list-column">
      <button type="button" className="btn btn-sm btn-info mt-3" onClick={onNewHumanClick}>New Human</button>
      <ul className="humans-list">
        {props.humans.map(human => (
          <li key={human.id} onClick={() => onHumanClick(human.id)} className="list-element">
            {human.name}
          </li>
        ))}
      </ul>
    </div>
  );
});

const mapStateToProps = state => ({
  humans: state.humansReducer.humans,
});

const mapDispatchToProps = {
  getHuman,
  newHuman,
};

export default connect(mapStateToProps, mapDispatchToProps)(HumansList);
