import { createAction } from 'redux-actions';

import {
  ADD_HUMAN,
  DELETE_HUMAN,
  EDIT_HUMAN,
  GET_HUMAN,
  SET_NEW_HUMAN,
} from '../constants';

export const addHuman = createAction(ADD_HUMAN);
export const deleteHuman = createAction(DELETE_HUMAN);
export const editHuman = createAction(EDIT_HUMAN);
export const getHuman = createAction(GET_HUMAN);
export const setNewHuman = createAction(SET_NEW_HUMAN);
