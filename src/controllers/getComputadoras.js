import urlWebServices from "./webServices";

//Pre paginacion de computadoras
{/* export const getComputadoras = async (filters) => {
  let url = urlWebServices.getComputadoras;

  try {
    // Crear una instancia de URLSearchParams
    const queryParams = new URLSearchParams();

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
        return { rdo: 1, mensaje: "No se encontraron computadoras." };
    
      default:
        throw new Error("Error al mostrar computadoras desde la BDD");
    }
  } catch (error) {
    console.error('Error al mostrar computadoras:', error);
    throw error;
  }
};

*/}


export const getComputadoras = async (filters) => {
  let url = urlWebServices.getComputadoras;

  try {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

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

    switch (rdo) {
      case 200:
        return data;
      case 400:
        return { rdo: 1, mensaje: "No se encontraron computadoras." };
      default:
        throw new Error("Error al mostrar computadoras desde la BDD");
    }
  } catch (error) {
    console.error('Error al mostrar computadoras:', error);
    throw error;
  }
};
