import { Button, Checkbox, FormControlLabel, Grid, Link, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserType from '../../../../types/UserType';

const FormUser: React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserType>({
        userName: '',
        password: ''
    });

    return (
        <React.Fragment>
            <Grid container padding={4}>
                <Grid item xs={12}>
                    <Stack direction="column" justifyContent="center" alignItems="center" mb={3} spacing={3}>
                        <Typography variant="h2" gutterBottom>
                            Entrar!
                        </Typography>
                    </Stack>
                    <TextField
                        required
                        id="iptUserName"
                        fullWidth={true}
                        type="text"
                        label="Nome de usuário"
                        variant="outlined"
                        value={user.userName}
                        onChange={ev => setUser({ userName: ev.target.value, password: user.password })}
                    />
                </Grid>
                <Grid item xs={12} marginTop={2}>
                    <TextField
                        required
                        id="iptPassword"
                        fullWidth={true}
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                        value={user.password}
                        onChange={ev => setUser({ userName: user.userName, password: ev.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Manter conectado" />
                    <Stack direction="column" spacing={3}>
                        <Button size="large" fullWidth={true} color="primary" variant="contained">
                            ENTRAR
                        </Button>
                        <Link onClick={() => navigate('/register')}>Não tem uma conta? Crie aqui! </Link>
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default FormUser;
