import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconAppBar from '../../../../assets/onenote-icon.svg';

function ResponsiveAppBar() {
    return (
        <AppBar position="static">
            <Container
                maxWidth="xl"
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Toolbar disableGutters>
                    <img src={IconAppBar} alt="IconAppBar" style={{ paddingRight: '15px' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        Bem-Vindo ao NoteSoftware 3.0
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
