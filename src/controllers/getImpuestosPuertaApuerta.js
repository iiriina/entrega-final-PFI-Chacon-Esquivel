import urlWebServices from "./webServices";

export const getPuertaAPuerta = async () => {
  let url = urlWebServices.getPuertaAPuerta;  // Asegúrate de que esta URL apunte a tu servicio de puerta a puerta

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

      case 400:
        return { rdo: 1, mensaje: "Error al obtener los datos de puerta a puerta." };

      default:
        throw new Error("Error al obtener los datos de puerta a puerta desde la BDD");
    }
  } catch (error) {
    console.error('Error al obtener los datos de puerta a puerta:', error);
    throw error;
  }
};
