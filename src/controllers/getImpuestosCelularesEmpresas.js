import urlWebServices from "./webServices";

export const getEmpresasCelulares = async () => {
  let url = urlWebServices.getEmpresasCelulares;  // Asegúrate de que esta URL apunte a tu servicio de empresas de celulares

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
    console.log("Datos recibidos del backend de empresas de celulares:", data);

    switch (rdo) {
      case 200:
        return data; // Si la respuesta es exitosa, retorna los datos

      case 400:
        return { rdo: 1, mensaje: "Error al obtener los datos de empresas de celulares." };

      default:
        throw new Error("Error al obtener los datos de empresas de celulares desde la BDD");
    }
  } catch (error) {
    console.error('Error al obtener los datos de empresas de celulares:', error);
    throw error;
  }
};
