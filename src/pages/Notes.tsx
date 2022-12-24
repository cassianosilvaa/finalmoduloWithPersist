import LogoutIcon from '@mui/icons-material/Logout';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    TextField
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar/components/ResponsiveAppBar/ResponsiveAppBar';
import NoteForm from '../components/NoteForm';
import ItemNote from '../components/NoteList/components/ItemNote/ItemNote';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addNote, removeNote, selectNotes, updateNote } from '../store/modules/NoteSlice';
import { selectUser, updateUser } from '../store/modules/UserSlice';
import { NoteType } from '../types';

const Notes: React.FC = () => {
    const dispatch = useAppDispatch();
    const NoteListRedux = useAppSelector(selectNotes);
    const userRedux = useAppSelector(selectUser);
    const userLogged = userRedux.find(item => item.logged);
    const notesUser = NoteListRedux.filter(item => item.userName === userLogged?.userName);
    const loggedIndexOfUser = userRedux.findIndex(item => item.logged);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [editDescription, setEditDescription] = useState<string>('');
    const [editDetail, setEditDetail] = useState<string>('');
    const [id, setId] = useState<number>();
    

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIndexOfUser === -1) {
            navigate('/');
        }
    }, [userRedux]);

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

    const openEditModal = useCallback((note: NoteType) => {
        setEditDescription(note.description);
        setEditDetail(note.detail);
        setId(note.id);
        setOpenEdit(true);
    }, []);

    const handleClose = () => {
        setOpenEdit(false);
    };

    const handSaveEditedNote = () => {
        if (editDescription.length <= 3) {
            alert(`Descrição: "${editDescription}" é inválida, mínimo 4 caractéres.`);
        } else if (editDetail.length <= 3) {
            alert(`Detalhe: "${editDetail}" é inválida, mínimo 4 caractéres.`);
        } else {
            alert('As notas foram editadas com sucesso!');
            handleClose();
            handleClear();
        }
        if (id) {
            dispatch(
                updateNote({
                    id,
                    changes: { description: editDescription, detail: editDetail }
                })
            );
            handleClose();
        }
    };

    const handleLogOff = () => {
        dispatch(
            updateUser({
                id: userRedux[loggedIndexOfUser].userName,
                changes: { logged: false }
            })
        );
    };

    const handleClear = () => {
        setEditDescription('');
        setEditDetail('');
    };

    return (
        <React.Fragment>
            <ResponsiveAppBar />
            <LogoutIcon
                onClick={() => handleLogOff()}
                fontSize="large"
                sx={{ marginLeft: '20px', marginTop: '20px', cursor: 'pointer' }}
            ></LogoutIcon>
            <NoteForm action={handleAddNote} />
                <Paper elevation={2} sx={{ padding: '5px' }}>
                    {notesUser.map(item => {
                        return (
                            <ItemNote
                                actionDelete={() => handleDeleteNote(item)}
                                actionEdit={() => openEditModal(item)}
                                key={item.id}
                                notesType={item}
                            />
                        );
                    })}
                </Paper>
            <Dialog open={openEdit} onClose={handleClose}>
                <DialogTitle>Editar nota!</DialogTitle>
                <DialogContent>
                    <DialogContentText>Campos para novas descrições e novos detalhes!</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nova Descrição"
                        type="text"
                        fullWidth
                        value={editDescription || ''}
                        variant="outlined"
                        onChange={ev => setEditDescription(ev.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Novo Detalhe "
                        type="text"
                        fullWidth
                        value={editDetail || ''}
                        variant="outlined"
                        onChange={ev => setEditDetail(ev.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={() => handSaveEditedNote()}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default Notes;
