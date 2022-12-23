import { Button, Paper } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar/components/ResponsiveAppBar/ResponsiveAppBar';
import NoteForm from '../components/NoteForm';
import ItemNote from '../components/NoteList/components/ItemNote/ItemNote';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addNote, removeNote, selectNotes } from '../store/modules/NoteSlice';
import { selectUser, updateUser } from '../store/modules/UserSlice';
import { NoteType } from '../types';

const Notes: React.FC = () => {
    const dispatch = useAppDispatch();
    const NoteListRedux = useAppSelector(selectNotes);
    const userRedux = useAppSelector(selectUser);
    const userLogged = userRedux.find(item => item.logged);
    const notesUser = NoteListRedux.filter(item => item.userName === userLogged?.userName);
    const loggedIndexOfUser = userRedux.findIndex(item => item.logged);

    const navigate = useNavigate();

    const handleAddNote = useCallback((note: NoteType) => {
        dispatch(addNote(note));
    }, []);

    const handleDeleteNote = (note: NoteType) => {
        if (
            confirm(`Sua nota 'Descrição: "${note.description}" e Detalhe: "${note.detail}"' serão excluidas!`) == true
        ) {
            alert('Notas excluidas!');
            return dispatch(removeNote(note.id));
        } else {
            alert('Cancelado');
        }
    };

    useEffect(() => {
        if (loggedIndexOfUser === -1) {
            navigate('/');
        }
    }, [userRedux]);

    const handleLogOff = () => {
        dispatch(
            updateUser({
                id: userRedux[loggedIndexOfUser].userName,
                changes: { logged: false }
            })
        );
    };

    return (
        <React.Fragment>
            <ResponsiveAppBar />
            <NoteForm action={handleAddNote} />
            <Button onClick={() => handleLogOff()}>LOGOUT</Button>
            <Paper elevation={2} sx={{ padding: '5px' }}>
                {notesUser.map(item => {
                    return <ItemNote actionDelete={() => handleDeleteNote(item)} key={item.id} notesType={item} />;
                })}
            </Paper>
        </React.Fragment>
    );
};

export default Notes;
