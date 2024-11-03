import { useState, useEffect } from "react";
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
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Historical Data",
        color: "turquoise",
        data: [],
      },
      {
        label: "Predictions",
        color: "violet",
        data: [],
        spanGaps: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const predictions = await getPredictions();
        const historicalData = predictions.historicalValues;
        const historicalDates = predictions.historicalDates;
        const futureData = predictions.futurePredictions;
        const futureDates = predictions.futureDates;

        const nullsForFutureData = new Array(historicalDates.length - 1).fill(null);
        const futureDataWithNulls = [...nullsForFutureData, ...futureData];
        const allLabels = [...historicalDates, ...futureDates];

        // Update chartData with structured data
        setChartData({
          labels: allLabels,
          datasets: [
            {
              label: "Historical Data",
              color: "turquoise",
              data: historicalData,
            },
            {
              label: "Predictions",
              color: "violet",
              data: futureDataWithNulls,
              spanGaps: true,
            },
          ],
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
        <DefaultNavbar routes={routes} />
      </MKBox>
      <MKBox component="section" py={6} mt={10}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SoftBox position="relative">
                {chartData.labels.length > 0 ? (
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
                    chart={chartData} // Use structured chartData
                  />
                ) : (
                  <div style={{ height: "20.25rem" }} /> // Placeholder for loading
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
