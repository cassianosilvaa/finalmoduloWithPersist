import { Paper } from '@mui/material';
import React, { useCallback } from 'react';
import ResponsiveAppBar from '../components/NavBar/components/ResponsiveAppBar/ResponsiveAppBar';
import NoteForm from '../components/NoteForm';
import ItemNote from '../components/NoteList/components/ItemNote/ItemNote';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addNote, selectNotes } from '../store/modules/NoteSlice';
import { NoteType } from '../types';

const Notes: React.FC = () => {
    const dispatch = useAppDispatch();
    const NoteListRedux = useAppSelector(selectNotes);
    console.log(NoteListRedux);

    const handleAddNote = useCallback((note: NoteType) => {
        dispatch(addNote(note));
    }, []);

    return (
        <React.Fragment>
            <ResponsiveAppBar />
            <NoteForm action={handleAddNote} />
            <Paper elevation={2} sx={{ padding: '5px' }}>
                {NoteListRedux.map(item => {
                    return <ItemNote key={item.id} notesType={item} />;
                })}
            </Paper>
        </React.Fragment>
    );
};

export default Notes;
