import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uid from 'uuid';
import cn from 'classnames';

import { addHuman, deleteHuman, editHuman } from '../../store/actions';

const Human = memo((props) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [nameError, setNameError] = useState(false);
  const handleName = (e) => {
    const trimedText = e.target.value.trim();
    const text = trimedText && e.target.value;
    setName(text);
    setNameError(false);
  };
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };
  const onSaveClick = () => {
    const id = uid();
    if (name) {
      props.addHuman({ name, notes, id });
      setName('');
      setNotes('');
    } else {
      setNameError(true);
    }
  };
  const onDelete = () => {
    props.deleteHuman(props.id);
    setName('');
    setNotes('');
  };
  const onEdit = () => {
    if (name) {
      const payload = {
        name,
        notes,
        id: props.id,
      };
      props.editHuman(payload);
      setName('');
      setNotes('');
    } else {
      setNameError(true);
    }
  };
  useEffect(() => {
    if (props.selected) {
      setName(props.name);
      setNotes(props.notes);
      setNameError(false);
    } else {
      setName('');
      setNotes('');
      setNameError(false);
    }
  }, [props.id]);
  return (
    <div className="col-6">
      <form className="mt-3">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            className={cn('form-control', {
              'is-invalid': nameError,
            })}
            value={name}
            onChange={handleName}
          />
          <div className="invalid-feedback">
            Please type a name.
          </div>
          <textarea
            placeholder="Notes"
            rows="12"
            className="form-control mt-3"
            value={notes}
            onChange={handleNotes}
          />
        </div>
        {props.selected
          ? (
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
              <button type="button" className="btn btn-warning" onClick={onEdit}>Edit</button>
            </div>
          )
          : <button type="button" className="btn btn-success" onClick={onSaveClick}>Save</button>
        }
      </form>
    </div>
  );
});

Human.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  addHuman: PropTypes.func.isRequired,
  deleteHuman: PropTypes.func.isRequired,
  editHuman: PropTypes.func.isRequired,
};

const MapStateToProps = state => ({
  id: state.humansReducer.id,
  name: state.humansReducer.name,
  notes: state.humansReducer.notes,
  selected: state.humansReducer.selected,
});

const mapDispatchToProps = {
  addHuman,
  deleteHuman,
  editHuman,
};

export default connect(MapStateToProps, mapDispatchToProps)(Human);
