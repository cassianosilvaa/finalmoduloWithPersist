import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { NoteType } from '../../types';

const adapter = createEntityAdapter<NoteType>({
    selectId: item => item.id
});

export const { selectAll: selectNotes, selectById: selectNotesById } = adapter.getSelectors(
    (state: RootState) => state.notes
);

const NoteSlice = createSlice({
    name: 'notes',
    initialState: adapter.getInitialState(),
    reducers: {
        addNote: adapter.addOne,
        removeNote: adapter.removeOne,
        updateNote: adapter.updateOne
    }
});

export const { addNote, removeNote, updateNote } = NoteSlice.actions;
export default NoteSlice.reducer;
