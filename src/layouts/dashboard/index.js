import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Button } from "@mui/material";
import { getPredictions } from "controllers/getPredictions";
import "chart.js/auto"; // Para evitar importar explícitamente cada tipo de gráfico

function Dashboard() {
  const [showPredictions, setShowPredictions] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const predictions = await getPredictions();
        const historicalData = predictions.historicalValues;
        const futureData = predictions.futurePredictions;

        // Crear dataset para datos históricos
        const historicalDataset = {
          label: "Historical Data",
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          data: historicalData,
        };

        // Crear dataset para datos futuros (si se deben mostrar)
        const futureDataset = showPredictions
          ? {
              label: "Predictions",
              borderColor: "rgba(153,102,255,1)",
              backgroundColor: "rgba(153,102,255,0.2)",
              data: futureData,
            }
          : null;

        setChartData({
          labels: new Array(historicalData.length + futureData.length).fill(""), // Opcional: llenar con cadenas vacías si no necesitas etiquetas
          datasets: futureDataset
            ? [historicalDataset, futureDataset]
            : [historicalDataset],
        });
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchData();
  }, [showPredictions]);

  const handleTogglePredictions = () => {
    setShowPredictions(!showPredictions);
  };

  return (
    <div>
      <h2>Importación de Celulares y Computadoras</h2>
      <Line data={chartData} options={{ responsive: true }} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleTogglePredictions}
      >
        {showPredictions ? "Hide predictions" : "Show predictions"}
      </Button>
    </div>
  );
}

export default Dashboard;
