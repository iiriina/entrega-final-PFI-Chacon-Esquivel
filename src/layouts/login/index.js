import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import LogInComponent from 'components/LogInComponent';

const Login = ({ onLogin }) => {
  return (
    <> 
      <LogInComponent onLogin={onLogin} />
    </>
  );
};

// Validación de las props
Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // Asegura que onLogin sea una función y que sea requerida
};

export default Login;
