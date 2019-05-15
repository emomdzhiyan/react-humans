import {
  ADD_HUMAN,
  DELETE_HUMAN,
  EDIT_HUMAN,
  GET_HUMAN,
  NEW_HUMAN,
} from '../constants';

const initialState = {
  humans: [],
  id: '',
  name: '',
  notes: '',
  selected: false,
};

function humans(state = initialState, action) {
  switch (action.type) {
    case ADD_HUMAN: {
      return {
        ...state,
        humans: [...state.humans, action.payload],
        id: '',
        name: '',
        notes: '',
        selected: false,
      };
    }
    case DELETE_HUMAN: {
      const filteredHumans = state.humans.filter(human => human.id !== action.payload);
      return {
        ...state,
        humans: filteredHumans,
        id: '',
        name: '',
        notes: '',
        selected: false,
      };
    }
    case EDIT_HUMAN: {
      const editedHumans = [...state.humans];
      const changedHuman = editedHumans.find( human => human.id === action.payload.id);
      changedHuman.name = action.payload.name;
      changedHuman.notes = action.payload.notes;
      return {
        ...state,
        humans: editedHumans,
        id: '',
        name: '',
        notes: '',
        selected: false,
      };
    }
    case GET_HUMAN: {
      const selectedHuman = state.humans.find(human => human.id === action.payload);
      return {
        ...state,
        name: selectedHuman.name,
        notes: selectedHuman.notes,
        id: action.payload,
        selected: true,
      };
    }
    case NEW_HUMAN: {
      return {
        ...state,
        name: '',
        notes: '',
        id: '',
        selected: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default humans;
