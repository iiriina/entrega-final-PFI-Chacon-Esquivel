// LogInComponent.jsx
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Link as LinkReact } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { login as loginController } from 'controllers/loginController';
import { loginSuccess } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import './index.css';

const defaultTheme = createTheme();

function LogInComponent() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Estados para el Snackbar y Alert
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const loginUser = async () => {
    if (email !== '' && password !== '') {
      try {
        let getLogin = await loginController({ email, password });
        if (getLogin.rdo === 0) {
          dispatch(loginSuccess());
          navigate('/homePage');
        } else if (getLogin.rdo === 1) {
          setAlertMessage('El usuario no es válido');
          setAlertSeverity('error');
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error('Error al validar el inicio de sesión:', error);
        setAlertMessage('Error al validar el inicio de sesión');
        setAlertSeverity('error');
        setOpenSnackbar(true);
      }
    } else {
      setAlertMessage('Debe completar usuario y contraseña');
      setAlertSeverity('warning');
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email !== '' && password !== '') {
      loginUser();
    } else {
      setAlertMessage('Debe completar usuario y contraseña');
      setAlertSeverity('warning');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="container_general_loginn">
      <ThemeProvider theme={defaultTheme}>
        <div className="formLoginContenedor">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleEmail}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                label="Contraseña"
                name="password"
                autoComplete="password"
                onChange={handlePassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
              <Grid container>
                <Grid item>
                  <LinkReact
                    to="/signUp"
                    style={{ textDecoration: 'none', color: '#1672d5', fontSize: '14px' }}
                  >
                    ¿No tenés una cuenta? Crear una.
                  </LinkReact>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </ThemeProvider>

      {/* Snackbar para mostrar mensajes de alerta */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Tiempo en milisegundos antes de que desaparezca
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Posición en la pantalla
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={alertSeverity}
          variant="filled"
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default LogInComponent;
