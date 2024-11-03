import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { Container } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Bar, Pie, Line } from 'react-chartjs-2';
import { getComputersComtrade } from "controllers/getComputadorasComtrade";
import Card from "@mui/material/Card";


function DashboardComputadoras() {
  const [tradeData, setTradeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Trade Value",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [],
      }
    ]
  });

  const [pesoData, setPesoData] = useState({
    labels: [],
    datasets: [
      {
        label: "Peso (KG)",
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(153,102,255,0.6)",
        hoverBorderColor: "rgba(153,102,255,1)",
        data: [],
      }
    ]
  });

  const [topCountriesData, setTopCountriesData] = useState({
    labels: [],
    datasets: [
      {
        label: "Top Importing Countries by Trade Value",
        backgroundColor: [
          "#3b8fc3", "#4a63c6", "#5b3fc8", "#6d1eca", 
          "#7e3fcc", "#8f5cd0", "#a07bd4", "#b19cd9"
        ],
        hoverBackgroundColor: [
          "#3b8fc3", "#4a63c6", "#5b3fc8", "#6d1eca", 
          "#7e3fcc", "#8f5cd0", "#a07bd4", "#b19cd9"
        ],
        data: [],
      }
    ]
  });

  const [usaTradeData, setUsaTradeData] = useState({
    labels: [],
    datasets: [
      {
        label: "USA Trade Value",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointBorderColor: "#fff",
        data: [],
        fill: false,
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getComputersComtrade();
        const data = response.data;

        if (Array.isArray(data)) {
          const tradeValueByMonth = {};
          const pesoKGByMonth = {};
          const countryTradeValue = {};
          const usaTradeByMonth = {};

          data.forEach(item => {
            const periodo = item.periodo;
            const tradeValue = item.tradeValue || 0;
            const pesoKG = item.pesoKG || 0;
            const pais = item.paisExportador;

            if (!tradeValueByMonth[periodo]) tradeValueByMonth[periodo] = 0;
            tradeValueByMonth[periodo] += tradeValue;

            if (!pesoKGByMonth[periodo]) pesoKGByMonth[periodo] = 0;
            pesoKGByMonth[periodo] += pesoKG;

            if (!countryTradeValue[pais]) countryTradeValue[pais] = 0;
            countryTradeValue[pais] += tradeValue;

            // Check for USA data specifically
            if (pais === "USA") {
              if (!usaTradeByMonth[periodo]) usaTradeByMonth[periodo] = 0;
              usaTradeByMonth[periodo] += tradeValue;
            }
          });

          // Data for bar charts
          const labels = Object.keys(tradeValueByMonth);
          const tradeValues = Object.values(tradeValueByMonth);
          const pesosKG = Object.values(pesoKGByMonth);

          setTradeData({
            labels,
            datasets: [
              {
                label: "Trade Value",
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75,192,192,0.6)",
                hoverBorderColor: "rgba(75,192,192,1)",
                data: tradeValues,
              }
            ]
          });

          setPesoData({
            labels,
            datasets: [
              {
                label: "Peso (KG)",
                backgroundColor: "rgba(153,102,255,0.4)",
                borderColor: "rgba(153,102,255,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(153,102,255,0.6)",
                hoverBorderColor: "rgba(153,102,255,1)",
                data: pesosKG,
              }
            ]
          });

          // Data for pie chart (Top 8 countries)
          const sortedCountries = Object.entries(countryTradeValue)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8);

          const topCountriesLabels = sortedCountries.map(([country]) => country);
          const topCountriesValues = sortedCountries.map(([, value]) => value);

          setTopCountriesData({
            labels: topCountriesLabels,
            datasets: [
              {
                label: "Top Importing Countries by Trade Value",
                backgroundColor: [
                  "#7fb9e0", // Lightened blue for USA
                  "#4a63c6", // Blue-violet nearing green
                  "#5b3fc8", // Violet transitioning to blue
                  "#6d1eca", // Darker violet
                  "#7e3fcc", // Deeper violet
                  "#8f5cd0", // Medium violet
                  "#a07bd4", // Slightly darker violet
                  "#b19cd9", // Light violet
                ],
                hoverBackgroundColor: [
                  "#7fb9e0",
                  "#4a63c6",
                  "#5b3fc8",
                  "#6d1eca",
                  "#7e3fcc",
                  "#8f5cd0",
                  "#a07bd4",
                  "#b19cd9",
                ],
                borderColor: [
                  "#659cc3", // Slightly darker blue for USA border
                  "#3a5aa0", // Slightly darker than the background color for each segment
                  "#4c2d9a",
                  "#5b1997",
                  "#6c3aaa",
                  "#7d51b8",
                  "#8f6ec5",
                  "#a48bd0",
                ],
                borderWidth: 1, // Thinner border
                data: topCountriesValues,
              }
            ]
          });
          

          // Data for USA line chart
          const usaLabels = Object.keys(usaTradeByMonth);
          const usaTradeValues = Object.values(usaTradeByMonth);

          setUsaTradeData({
            labels: usaLabels,
            datasets: [
              {
                label: "USA Trade Value",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "rgba(75,192,192,1)",
                pointBorderColor: "#fff",
                data: usaTradeValues,
                fill: false,
              }
            ]
          });
        } else {
          console.error("Error: Data received is not an array.");
        }
      } catch (error) {
        console.error("Error al obtener los datos de computers-comtrade:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={10}>
        <DefaultNavbar routes={routes} />
      </MKBox>
      <MKBox component="section" py={6} mt={6.2}>
        <Container>
          <SoftBox mb={2}>
            <SoftTypography variant="h5" fontWeight="medium">
            Estadísticas de Computadoras.
            </SoftTypography>
          </SoftBox>
          <Grid container spacing={3}>
            {/* Bar charts */}
            <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: "lg", boxShadow: "lg", backgroundColor: "white", height: "100%" }}>

              <div style={{ width: '100%', height: '100%' }}>
                <Bar data={tradeData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Importaciones de Computadoras - Trade Value' }}}}/>
              </div>

              </Card>

            </Grid>


            <Grid item xs={12} md={6}>
            
              <Card sx={{ p: 2, borderRadius: "lg", boxShadow: "lg", backgroundColor: "white", height: "100%" }}>

                <div style={{ width: '100%', height: '100%' }}>
                  <Bar data={pesoData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Importaciones de Computadoras - Peso (KG)' }}}}/>
                </div>

              </Card>

            </Grid>


            {/* Principales paises y barras USA */}
            <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: "lg", boxShadow: "lg", backgroundColor: "white", height: "100%" }}>

            <div style={{ width: '80%', height: '300px', margin: '0 auto' }}> {/* Smaller container */}
                <Pie
                data={topCountriesData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false, // Allows resizing
                    plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Top 8 Países Importadores por Trade Value (2024)',
                    },
                    },
                }}
                />
            </div>
            </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2, borderRadius: "lg", boxShadow: "lg", backgroundColor: "white", height: "100%" }}>

                <div style={{ width: '100%', height: '100%' }}>
                  <Line data={usaTradeData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'USA Trade Value (2024)' }}}}/>
                </div>

              </Card>
            </Grid>


          </Grid>
        </Container>
      </MKBox>
    </>
  );
}

export default DashboardComputadoras;
