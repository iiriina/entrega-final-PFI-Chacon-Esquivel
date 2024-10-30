import urlWebServices from "./webServices";

export const registrarUsuario = async function (datosUsuario) {
  // URL de los servicios web
  let url = urlWebServices.registrarUsuario;
  
  // Crear un objeto URLSearchParams para los datos del formulario
  const formData = new URLSearchParams();
  formData.append('nombre', datosUsuario.nombre);
  formData.append('email', datosUsuario.email);
  formData.append('contrasenia', datosUsuario.contrasenia);
  formData.append('tipoConsumidor', datosUsuario.tipoConsumidor); // Agregar el tipoConsumidor

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
    case 201:
        return { rdo: 0, mensaje: data.message }; // correcto

    case 400:
        return { rdo: 1, mensaje: data.message };
    
    case 401:
        return { rdo: 1, mensaje: data.message };
        
    case 402:
        return { rdo: 1, mensaje: data.message };

      default:
        return { rdo: 1, mensaje: data.message };
    }
  } catch (error) {
    console.error('Error en la solicitud de crear usuario:', error);
    // Puedes lanzar una excepción o devolver un objeto de error
    return { rdo: 1, mensaje: "error" };
  }
};
