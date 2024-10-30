import urlWebServices from "./webServices";

export const getPredictions = async () => {
  let url = urlWebServices.getPredictions;

  try {
    console.log("Fetching all historical and future prediction data");

    let response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    let rdo = response.status;
    let responseData = await response.json();
    console.log("Datos recibidos desde el front:", responseData);

    switch (rdo) {
      case 200: {
        // Aquí accederemos a `data` que está anidado dentro de `responseData`
        const data = responseData.data || {};
        return {
          historicalValues: data.historicalValues || [],
          historicalDates: data.historicalDates || [],
          futurePredictions: data.futurePredictions || [],
          futureDates: data.futureDates || [],
        };
      }

      case 400: {
        return { rdo: 1, mensaje: "No se encontraron datos de predicciones." };
      }
    
      default: {
        throw new Error("Error al obtener las predicciones desde la API");
      }
    }
  } catch (error) {
    console.error('Error al obtener las predicciones:', error);
    throw error;
  }
};
