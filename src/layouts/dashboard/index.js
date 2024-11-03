import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { Container } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { getPredictions } from "controllers/getPredictions";
import { getDolar } from "controllers/getDolar"; // Importar función para obtener el precio del dólar
import "chart.js/auto";
import Card from "@mui/material/Card";

function Dashboard() {
  const [showPredictions, setShowPredictions] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [dolarOficial, setDolarOficial] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de predicciones y dólar
        const predictions = await getPredictions();
        const dolarData = await getDolar();

        const historicalData = predictions.historicalValues;
        const historicalDates = predictions.historicalDates;
        const futureData = predictions.futurePredictions;
        const futureDates = predictions.futureDates;
        
        setDolarOficial(dolarData.data.dolarOficial || 0); // Guardar el valor del dólar

        const nullsForFutureData = new Array(historicalDates.length - 1).fill(null);
        const futureDataWithNulls = [...nullsForFutureData, ...futureData];
        const allLabels = [...historicalDates, ...futureDates];

        const historicalDataset = {
          label: "Historical Data",
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          data: historicalData,
        };

        const futureDataset = {
          label: "Predictions",
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          data: futureDataWithNulls,
        };

        setChartData({
          labels: allLabels,
          datasets: showPredictions ? [historicalDataset, futureDataset] : [historicalDataset],
        });
      } catch (error) {
        console.error("Error fetching predictions or dolar data:", error);
      }
    };

    fetchData();
  }, [showPredictions]);

  const handleTogglePredictions = () => {
    setShowPredictions(!showPredictions);
  };

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={10}>
        <DefaultNavbar routes={routes} />
      </MKBox>
      <MKBox component="section" py={6} mt={10}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SoftBox position="relative">
              <SoftBox mb={3}>
                <SoftTypography variant="h5" fontWeight="medium" mb={1}>
                  Importación de Celulares y Computadoras
                </SoftTypography>
                <SoftTypography variant="body2" color="text">
                  (En millones de USD).
                  <br />
                </SoftTypography>

                <SoftTypography variant="body2" color="text">
                  Argentina 2017 - 2024.
                  <br />
                </SoftTypography>
              </SoftBox>

                {/* Mostrar el gráfico solo cuando los datos estén disponibles */}
                {chartData ? (
                  <Card sx={{ p: 1, borderRadius: "lg", boxShadow: "lg", backgroundColor: "white", height: "100%" }}>

                    <Line data={chartData} options={{ responsive: true }} style={{ maxHeight: "550px" }} />
                  </Card>
                ) : (
                  <div style={{ height: "20.25rem" }} /> // Espacio vacío con la misma altura del gráfico
                )}
                <SoftBox
                  position="absolute"
                  top="1rem"
                  right="1rem"
                  display="flex"
                  alignItems="center"
                  gap={2} // Espacio entre el Card y el Button
                  mt={-2.5} // Margen superior negativo para acercarlo más a la barra superior
                >
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: "lg",
                      boxShadow: "lg",
                      backgroundColor: "white",
                      height: "100%",
                      width: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SoftTypography variant="body2" color="text">
                      Precio Dólar Hoy:{" "}
                      <span style={{ fontWeight: "bold", color: "rgba(75,192,192,1)" }}>
                        ${dolarOficial}
                      </span>
                    </SoftTypography>
                  </Card>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTogglePredictions}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    {showPredictions ? "Hide predictions" : "Show predictions"}
                  </Button>
                </SoftBox>

                
              </SoftBox>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}

export default Dashboard;
