import { Button, Grid, Link, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { addUser, selectUser } from '../../../../store/modules/UserSlice';
import UserType from '../../../../types/UserType';

const FormUserRegister: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [user, setUser] = useState<UserType>({
        userName: '',
        password: '',
        confirmPassword: '',
        logged: false
    });

    const inputUserName = useRef<HTMLInputElement | undefined>();
    const inputPassword = useRef<HTMLInputElement | undefined>();
    const inputConfirmPassword = useRef<HTMLInputElement | undefined>();
    const userRedux = useAppSelector(selectUser);
    const loggedIndexOfUser = userRedux.findIndex(item => item.logged);

    useEffect(() => {
        if (loggedIndexOfUser !== -1) {
            navigate('/notes');
        }
    }, [userRedux]);

    const handleSubmit = (): void => {
        const haveUser = userRedux.find(item => item.userName);

        if (haveUser) {
            alert('Nome de usuário já está sendo usado!');
            inputUserName.current?.focus();
            return;
        }

        if (user.userName.length < 6) {
            alert('Nome de usuário: Mínimo 6 caractéres!');
            inputUserName.current?.focus();
            return;
        }

        if (user.password.length < 6) {
            alert('Senha: Mínimo 6 caractéres!');
            inputPassword.current?.focus();
            return;
        } else if (user.password != user.confirmPassword) {
            alert('As senhas não coincidem!');
            inputConfirmPassword.current?.focus();
            return;
        }

        const newUser: UserType = {
            userName: user.userName,
            password: user.password,
            logged: false
        };

        dispatch(addUser(newUser));
        alert('Conta criada com sucesso, redirecionando para o login!');
        navigate('/');
    };

    return (
        <React.Fragment>
            <Grid container padding={4}>
                <Grid item xs={12}>
                    <Stack direction="column" justifyContent="center" alignItems="center" mb={3} spacing={3}>
                        <Typography variant="h2" gutterBottom>
                            Criar conta!
                        </Typography>
                    </Stack>
                    <TextField
                        required
                        inputProps={{ maxLength: 35 }}
                        id="iptUserName"
                        fullWidth={true}
                        inputRef={inputUserName}
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
                        inputRef={inputPassword}
                        autoComplete="current-password"
                        value={user.password}
                        onChange={ev =>
                            setUser({
                                userName: user.userName,
                                password: ev.target.value,
                                confirmPassword: user.confirmPassword
                            })
                        }
                    />
                </Grid>
                <Grid item xs={12} marginTop={2}>
                    <TextField
                        required
                        id="iptPassword"
                        fullWidth={true}
                        label="Confirme a sua senha"
                        type="password"
                        inputRef={inputConfirmPassword}
                        autoComplete="current-password"
                        value={user.confirmPassword}
                        onChange={ev =>
                            setUser({
                                userName: user.userName,
                                password: user.password,
                                confirmPassword: ev.target.value
                            })
                        }
                    />
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
                            onClick={handleSubmit}
                        >
                            CADASTRAR
                        </Button>
                        <Link style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                            Já possui uma conta? Voltar.{' '}
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default FormUserRegister;
