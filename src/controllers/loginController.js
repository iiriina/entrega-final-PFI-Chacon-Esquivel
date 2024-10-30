import urlWebServices from "./webServices";

export const login = async function (login) {
  // URL de los servicios web
  let url = urlWebServices.login;
  
  // Crear un objeto URLSearchParams para los datos del formulario
  const formData = new URLSearchParams();
  formData.append('email', login.email);
  formData.append('contrasenia', login.password);

  try {
    let response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData,
      // credentials: 'include' // Considera activar esto si manejas autenticación con cookies
    });

    let rdo = response.status;
    let data = await response.json();

    // Manejo de respuestas
    switch (rdo) {
      case 201: {
        let user = data.loginUser.user;
        localStorage.setItem("id", user._id);
        localStorage.setItem("email", user.email);
        localStorage.setItem("token", data.loginUser.token);
        localStorage.setItem("tipoConsumidor", user.tipoConsumidor);

        return { rdo: 0, mensaje: "Ok" }; // correcto
      }
      case 202: {
        return { rdo: 1, mensaje: "El mail ingresado no existe en nuestra base." };
      }
      case 203: {
        return { rdo: 1, mensaje: "La contraseña no es correcta." };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.error('Error en la solicitud de inicio de sesión:', error);
    // Puedes lanzar una excepción o devolver un objeto de error
    return { rdo: 1, mensaje: "Ha ocurrido un error" };
  }
};
