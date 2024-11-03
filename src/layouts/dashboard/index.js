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
    labels: Array(10).fill("00-0000"), // Default placeholder labels
    datasets: [
      {
        label: "Historical Data",
        color: "turquoise",
        data: Array(10).fill(null), // Default placeholder data
      },
      {
        label: "Predictions",
        color: "violet",
        data: Array(10).fill(null), // Default placeholder data
        spanGaps: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching predictions...");
        const predictions = await getPredictions();
        console.log("Predictions received:", predictions);

        const historicalData = predictions.historicalValues;
        const historicalDates = predictions.historicalDates;
        const futureData = predictions.futurePredictions;
        const futureDates = predictions.futureDates;

        console.log("Historical Data:", historicalData);
        console.log("Historical Dates:", historicalDates);
        console.log("Future Data:", futureData);
        console.log("Future Dates:", futureDates);

        const nullsForFutureData = new Array(historicalDates.length - 1).fill(null);
        const futureDataWithNulls = [...nullsForFutureData, ...futureData];
        console.log("Future Data with Nulls:", futureDataWithNulls);

        const allLabels = [...historicalDates, ...futureDates];
        console.log("All Labels Combined:", allLabels);

        // Update chartData with structured data
        const updatedChartData = {
          labels: allLabels || Array(10).fill("00-0000"),  // Fallback to default labels if labels are undefined
          datasets: [
            {
              label: "Historical Data",
              color: "turquoise",
              data: historicalData || Array(10).fill(null),  // Fallback to default data if undefined
            },
            {
              label: "Predictions",
              color: "violet",
              data: futureDataWithNulls || Array(10).fill(null),  // Fallback to default data if undefined
              spanGaps: true,
            },
          ],
        };
        
        console.log("Updated Chart Data:", updatedChartData);

        setChartData(updatedChartData);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchData();
  }, [showSecondLine]);

  const handleToggleLine = () => {
    console.log("Toggling second line visibility...");
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
                {/* Check if chartData is defined and has labels */}
                {chartData && chartData.labels.length > 0 ? (
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
                    chart={{
                      labels: chartData.labels,
                      datasets: chartData.datasets,
                    }}
                  />
                ) : (
                  <div style={{ height: "20.25rem", textAlign: "center" }}>
                    Loading chart data...
                  </div>
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
