import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectUser, updateUser } from '../../../../store/modules/UserSlice';
import UserType from '../../../../types/UserType';

const FormUser: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userRedux = useAppSelector(selectUser);

    const [user, setUser] = useState<UserType>({
        userName: '',
        password: '',
        logged: false
    });

    useEffect(() => {
        const userLogin = userRedux.findIndex(item => item.logged);
        if (userLogin !== -1) {
            navigate('notes');
        }
    }, [userRedux, navigate]);

    const handleLogin = () => {
        if (user.userName.length < 6 || user.password.length < 6) {
            alert('Os campos não foram preenchidos corretamente!');
        } else {
            const haveUser = userRedux.findIndex(item => item.userName === user.userName);
            if (haveUser === -1) {
                alert('Usuário ou senha incorreto!');
                return;
            }
            const havePassword = userRedux[haveUser].password === user.password;
            if (havePassword === false) {
                alert('Usuário ou senha incorreto!');
                return;
            }
            dispatch(
                updateUser({
                    id: user.userName,
                    changes: { logged: true }
                })
            );
        }
    };

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
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Senha"
                            value={user.password}
                            onChange={ev => setUser({ userName: user.userName, password: ev.target.value })}
                        />
                    </FormControl>
                    {/* <TextField
                        required
                        id="iptPassword"
                        fullWidth={true}
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                        value={user.password}
                        onChange={ev => setUser({ userName: user.userName, password: ev.target.value })}
                    /> */}
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="column" spacing={3}>
                        <Button
                            sx={{
                                marginTop: '10px'
                            }}
                            size="large"
                            fullWidth={true}
                            color="primary"
                            variant="contained"
                            onClick={() => handleLogin()}
                        >
                            ENTRAR
                        </Button>
                        <Link style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
                            Não tem uma conta? Crie aqui!
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default FormUser;
