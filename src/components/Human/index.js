import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import uid from 'uuid';
import { addHuman, deleteHuman, editHuman } from '../../store/actions';

const Human = memo((props) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const handleName = (e) => {
    const trimedText = e.target.value.trim();
    const text = trimedText ? e.target.value : trimedText;
    setName(text);
  };
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };
  const onSaveClick = () => {
    const id = uid();
    props.addHuman({ name, notes, id });
    setName('');
    setNotes('');
  };
  const onDelete = () => {
    props.deleteHuman(props.id);
    setName('');
    setNotes('');
  }
  const onEdit = () => {
    const payload = {
      name,
      notes,
      id: props.id,
    };
    props.editHuman(payload);
    setName('');
    setNotes('');
  }
  useEffect(() => {
    if (props.selected) {
      setName(props.name);
      setNotes(props.notes);
    } else {
      setName('');
      setNotes('');
    }
  }, [props.id]);
  return (
    <div className="col-6">
      <form className="mt-3">
        <div className="form-group">
          <input type="text" placeholder="Name" className="form-control" value={name} onChange={handleName} />
          <textarea placeholder="Notes" rows="12" className="form-control mt-3" value={notes} onChange={handleNotes} />
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
