import urlWebServices from "./webServices";  

export const getComputerById = async (id) => {
  let url = `${urlWebServices.getComputerById}?id_computer=${id}`;  
  console.log("La uRL es: ", url)
  console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
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
        return data;  

      case 400:
        return { rdo: 1, mensaje: "Error al obtener la computadora por ID." };

      default:
        throw new Error("Error al obtener la computadora por ID desde la base de datos.");
    }
  } catch (error) {
    console.error('Error al obtener la computadora:', error);
    throw error;  // Lanzar un error si algo falla
  }
};
