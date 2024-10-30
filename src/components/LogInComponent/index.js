// LogInComponent.jsx
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import { Link as LinkReact } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { login as loginController } from 'controllers/loginController';
import { loginSuccess } from '../../redux/store';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './index.css';

function LogInComponent() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Obtén la función de navegación desde el hook useNavigate

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
          dispatch(loginSuccess()); // Despacha la acción de inicio de sesión exitoso
          navigate('/homePage'); // Navega a la ruta deseada
        } else if (getLogin.rdo === 1) {
          alert('El usuario no es válido');
        }
      } catch (error) {
        console.error('Error al validar el inicio de sesión:', error);
      }
    } else {
      alert('Debe completar usuario y contraseña');
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email !== '' && password !== '') {
      loginUser();
    } else {
      alert('Debe completar usuario y contraseña');
    }
  };

  const defaultTheme = createTheme();

  return (
    <div className="container_general_loginn">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" className="form-container">
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
                autoFocus
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
                    <LinkReact to="/signUp" style={{ textDecoration: 'none', color: '#1672d5', fontSize: '14px' }}>
                    ¿No tenés una cuenta? Crear una.
                    </LinkReact>

                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default LogInComponent;
