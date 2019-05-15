import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uid from 'uuid';
import cn from 'classnames';

import { addHuman, deleteHuman, editHuman } from '../../store/actions';

const Human = memo((
  {
    id,
    name: propsName,
    notes: propsNotes,
    selected,
    addHuman: addNewHuman,
    deleteHuman: deleteData,
    editHuman: editData,
  },
) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [nameError, setNameError] = useState(false);
  const handleName = (e) => {
    const trimedText = e.target.value.trim();
    const text = trimedText && e.target.value;
    setName(text);
    setNameError(false);
  };
  const handleNotes = ({ target: { value } }) => {
    setNotes(value);
  };
  const onSaveClick = () => {
    const newUid = uid();
    if (name) {
      const humanName = name.trim();
      const humanNotes = notes.trim();
      addNewHuman({ name: humanName, notes: humanNotes, id: newUid });
      setName('');
      setNotes('');
    } else {
      setNameError(true);
    }
  };
  const onDelete = () => {
    deleteData(id);
    setName('');
    setNotes('');
  };
  const onEdit = () => {
    if (name) {
      const payload = {
        name,
        notes,
        id,
      };
      editData(payload);
      setName('');
      setNotes('');
    } else {
      setNameError(true);
    }
  };
  useEffect(() => {
    if (selected) {
      setName(propsName);
      setNotes(propsNotes);
      setNameError(false);
    } else {
      setName('');
      setNotes('');
      setNameError(false);
    }
  }, [id]);
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
        {selected
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
