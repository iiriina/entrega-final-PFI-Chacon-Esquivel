import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './index.css';
import { registrarUsuario } from 'controllers/registrarUsuarioController';
import { Link as LinkReact } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({
    nombre: '',
    email: '',
    contrasenia: '',
    tipoConsumidor: '', // Campo para el tipo de consumidor
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerUser = async () => {
    try {

      const response = await registrarUsuario(userData);

      if (response.rdo === 0) {
        window.alert('Usuario registrado correctamente, inicie sesión.');
        dispatch(loginSuccess());
        navigate('/login');
      } else {
        window.alert(response.mensaje);
      }
    } catch (error) {
      window.alert('Error inesperado al registrar usuario.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = ['nombre', 'email', 'contrasenia', 'tipoConsumidor'];
    const isValid = requiredFields.every((field) => userData[field]);

    if (!isValid) {
      console.error('Por favor, complete todos los campos obligatorios.');
      return;
    }

    registerUser();
  };

  return (
    <div className="container_general_loginn">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" className="form-container">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrate
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="nombre"
                    name="nombre"
                    required
                    fullWidth
                    id="nombre"
                    label="Usuario"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="contrasenia"
                    label="Contraseña"
                    type="password"
                    id="contrasenia"
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                </Grid>

                {/* Pregunta: Tipo de consumidor */}
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="tipoConsumidor-label">¿Qué información te gustaría ver?</InputLabel>
                    <Select
                      labelId="tipoConsumidor-label"
                      id="tipoConsumidor"
                      name="tipoConsumidor"
                      value={userData.tipoConsumidor}
                      onChange={handleChange}
                      label="¿Qué información te gustaría ver?"
                    >
                      <MenuItem value="comprador">Información de compra para uso personal</MenuItem>
                      <MenuItem value="revendedor">Información de compra empresarial o para reventa</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Crear Cuenta
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <LinkReact to="/login" style={{ textDecoration: 'none', color: '#1672d5', fontSize: '14px' }}>
                    Ya tenés una cuenta? Inicia Sesión.
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
