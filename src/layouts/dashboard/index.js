import { useState, useEffect } from "react"; // Importar useEffect
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { Container } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import { getPredictions } from "controllers/getPredictions";
 
function Dashboard() {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [chartData, setChartData] = useState(null); // Estado para los datos del gráfico
 
  // Función para cargar los datos de predicciones
  useEffect(() => {
    const fetchData = async () => {
      try {
        const predictions = await getPredictions();
        const historicalData = predictions.historicalValues;
        const historicalDates = predictions.historicalDates;
        const futureData = predictions.futurePredictions;
        const futureDates = predictions.futureDates;
 
        // Crear un array de 'null' para todas las fechas históricas menos la última
        const nullsForFutureData = new Array(historicalDates.length - 1).fill(null);
 
        // Concatenar los 'null' con los datos de predicción
        const futureDataWithNulls = [...nullsForFutureData, ...futureData];
 
        // Combinar etiquetas de fechas
        const allLabels = [...historicalDates, ...futureDates];
 
        // Crear dataset para los datos históricos
        const historicalDataset = {
          label: "Historical Data",
          color: "turquoise",
          data: historicalData,
        };
 
        // Crear dataset para las predicciones
        const futureDataset = {
          label: "Predictions",
          color: "violet",
          data: futureDataWithNulls, // Usar los datos de predicción con 'null' antes
          spanGaps: true, // Esto asegura que las líneas se dibujen correctamente, ignorando los nulls
        };
 
        setChartData({
          labels: allLabels,
          datasets: showSecondLine
            ? [historicalDataset, futureDataset]
            : [historicalDataset],
        });
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };
 
    fetchData();
  }, [showSecondLine]);
       
  const handleToggleLine = () => {
    setShowSecondLine(!showSecondLine);
  };
 
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={10}>
        <DefaultNavbar
          routes={routes}
        />
      </MKBox>
      <MKBox component="section" py={6} mt={10}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SoftBox position="relative">
                {/* Mostrar el gráfico solo cuando los datos estén disponibles */}
                {chartData ? (
                  <GradientLineChart
                    title="Importación de Celulares y Computadoras"
                    description={
                      <SoftBox display="flex" alignItems="center">
                        <SoftTypography variant="button" color="text" fontWeight="medium">
                          Argentina{" "}
                          <SoftTypography variant="button" color="text" fontWeight="regular">
                            2017 - 2024
                          </SoftTypography>
                        </SoftTypography>
                      </SoftBox>
                    }
                    height="20.25rem"
                    chart={chartData} // Usamos los datos cargados
                  />
                ) : (
                  <div style={{ height: "20.25rem" }} /> // Espacio vacío con la misma altura del gráfico
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleToggleLine}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  {showSecondLine ? "Hide predictions" : "Show predictions"}
                </Button>
              </SoftBox>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}

export default Dashboard;