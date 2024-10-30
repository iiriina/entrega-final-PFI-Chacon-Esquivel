import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook useNavigate

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabsSimple() {
  const [activeTab, setActiveTab] = useState(0); // Inicialmente en "Celulares"
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleTabType = (event, newValue) => {
    setActiveTab(newValue);

    // Redirigir al hacer clic en una pestaña, sin importar si está ya seleccionada
    if (newValue === 0) {
      navigate("/pages/celulares"); // Navegar a /pages/celulares
    } else if (newValue === 1) {
      navigate("/pages/landing-pages/products"); // Navegar a /pages/landing-pages/products
    }
  };

  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        item
        justifyContent="center"
        xs={12}
        sx={{ width: '100%' }}
      >
        <AppBar position="static" sx={{ width: '100%' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabType}
            sx={{ width: '100%' }}
            centered
          >
            <Tab
              label="Celulares"
              sx={{ width: '50%' }}
              onClick={() => navigate("/pages/celulares")} // Navegar incluso si ya está seleccionada
            />
            <Tab
              label="Computadoras"
              sx={{ width: '50%' }}
              onClick={() => navigate("/pages/landing-pages/products")} // Navegar incluso si ya está seleccionada
            />
          </Tabs>
        </AppBar>
      </Grid>
    </Container>
  );
}

export default TabsSimple;
