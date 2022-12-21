import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, ListItem, ListItemText, TableCell } from '@mui/material';
import React from 'react';
import { NoteType } from '../../../../types';

interface ItemNoteProps {
    notesType?: NoteType;
}

const ItemNote: React.FC<ItemNoteProps> = ({ notesType }) => {
    return (
        <>
            <ListItem
                secondaryAction={
                    <>
                        <IconButton edge="end" aria-label="edit" sx={{ paddingRight: '20px' }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" sx={{ paddingRight: '20px' }}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                }
            >
                <TableCell align="right">ID:</TableCell>
                <ListItemText primary={notesType?.id} />
                <TableCell align="right">Descrição:</TableCell>
                <ListItemText primary={notesType?.description} />
                <TableCell align="right">Detalhe:</TableCell>
                <ListItemText primary={notesType?.detail} />
            </ListItem>
        </>
    );
};

export default ItemNote;
