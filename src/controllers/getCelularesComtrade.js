import urlWebServices from "./webServices";

export const getCellphonesComtrade = async () => {
  let url = urlWebServices.getCelularesComtrade; 

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
        return { rdo: 1, mensaje: "Error al obtener los datos de cellphones-comtrade." };

      default:
        throw new Error("Error al obtener los datos de cellphones-comtrade desde la BDD");
    }
  } catch (error) {
    console.error('Error al obtener los datos de cellphones-comtrade:', error);
    throw error;
  }
};
