import urlWebServices from "./webServices";

export const getCelulares = async (filters) => {
  let url = urlWebServices.getCelulares;

  try {
    // Crear una instancia de URLSearchParams
    const queryParams = new URLSearchParams();
    console.log('queryParams front',queryParams);
    // Añadir cada filtro a los parámetros de la URL si está definido
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    console.log("Query params:", queryParams.toString());

    let response = await fetch(`${url}?${queryParams.toString()}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    let rdo = response.status;
    let data = await response.json();
    console.log("Le llega al front:", data);

    switch (rdo) {
      case 200:
        return data;

      case 400:
        return { rdo: 1, mensaje: "No se encontraron celulares." };
    
      default:
        throw new Error("Error al mostrar celulares desde la BDD");
    }
  } catch (error) {
    console.error('Error al mostrar celulares:', error);
    throw error;
  }
};
