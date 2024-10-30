import urlWebServices from "./webServices";

export const getEnvioEspecifico = async (envio, pesoKG) => {
  // Convertir pesoKG a float con un decimal
  const pesoKGFormatted = parseFloat(pesoKG).toFixed(1);
  console.log("Se lo estoy pasando al back desde el front como:");
  console.log(pesoKGFormatted);
  
  // Construir la URL con los parámetros de consulta sin incluir `tipo`
  let url = `${urlWebServices.getEnvio}?envio=${encodeURIComponent(envio)}&pesoKG=${encodeURIComponent(pesoKGFormatted)}`;

  try {
    let response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    let rdo = response.status;
    let data = await response.json();
    console.log("Datos recibidos del backend:", data);

    switch (rdo) {
      case 200:
        return data; // Si la respuesta es exitosa, retorna los datos

      case 404:
        return { rdo: 1, mensaje: "No se encontró el envío con los parámetros especificados." };

      case 400:
        return { rdo: 1, mensaje: "Error en la solicitud. Verifica los parámetros." };

      default:
        throw new Error("Error al obtener el envío específico desde la BDD");
    }
  } catch (error) {
    console.error('Error al obtener el envío específico:', error);
    throw error;
  }
};
