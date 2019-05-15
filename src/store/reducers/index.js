import { combineReducers } from 'redux';

import humansReducer from './humans';

const allReducers = combineReducers({
  humansReducer,
});

export default allReducers;
