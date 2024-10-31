const urlApi = "https://7v1i3rv75m.execute-api.us-east-1.amazonaws.com/dev";
console.log("url",urlApi);

const urlWebServices = {
    //login:urlApi +"api/users/login",
    getComputadoras:urlApi + "api/computer-prediction/computer-prediction",
    getPredictions:urlApi + "api/prediction/prediction",
    getCelulares:urlApi + "api/cellphone_recommendations/cellphone-recommendations",
    getDolar: urlApi + "api/dolar/precio",
    //agregar impuestos puerta a puerta.
    getPuertaAPuerta: urlApi + "api/puertaAPuerta/puertaAPuerta",
    getCelularById: urlApi + "api/cellphone_recommendations/cellphonePorId", // nuevo endpoint
    getComputerById: urlApi + "api/computer-prediction/computerPorId", // nuevo endpoint

    //login
    login:urlApi +"api/users/login",
    registrarUsuario:urlApi + "api/users/registration",

    // Endpoint para obtener un envío específico
    getEnvio: urlApi + "api/envios/envio",

}

export default urlWebServices;