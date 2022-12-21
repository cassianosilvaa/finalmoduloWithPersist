import { combineReducers } from '@reduxjs/toolkit';
import notes from './NoteSlice';
import users from './UserSlice';
export default combineReducers({ notes, users });
