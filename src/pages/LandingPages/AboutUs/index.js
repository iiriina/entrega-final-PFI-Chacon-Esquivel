// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// About Us page sections
import Information from "pages/LandingPages/AboutUs/sections/Information";
import Team from "pages/LandingPages/AboutUs/sections/Team";
import Featuring from "pages/LandingPages/AboutUs/sections/Featuring";
import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";
import SoftBox from "components/SoftBox";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
const samsungImageUrl = "https://i.imgur.com/skPMqsT.jpeg"; // URL de la imagen

function AboutUs() {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "default",
        }}
        transparent
        light
      />
      <MKBox
        minHeight="100vh"
        width="100%"
        sx={{
          backgroundImage: `url(${require('assets/images/doodad.png')})`, // Aquí se coloca la URL de la imagen de fondo
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <SoftBox mt={6} mb={3}>
            <Grid container spacing={3}>
              {/* Columna para la imagen */}
              <Grid item xs={12} md={6} xl={4}>
                <Card
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                    borderRadius: "16px",
                    boxShadow: ({ boxShadows: { xxl } }) => xxl,
                  }}
                >
                  <img
                    src={samsungImageUrl}
                    alt="Samsung Galaxy S23"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "16px",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </Grid>

              {/* Columna para la Card transparente */}
              <Grid item xs={12} md={6} xl={8}>
                <Card
                  sx={{
                    backdropFilter: "saturate(200%) blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.6)", // Fondo semi-transparente
                    boxShadow: ({ boxShadows: { xxl } }) => xxl,
                    borderRadius: "16px",
                    p: 3,
                    mt: { xs: 2, md: 0 }, // Añade margen superior en pantallas pequeñas
                    height: "100%", // Para que la tarjeta tenga la misma altura que la imagen
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "left",
                  }}
                >
                  <MKTypography variant="h3" color="dark" mb={1}>
                    Samsung Galaxy S23
                  </MKTypography>
                  <MKTypography variant="body1" color="text">
                    El MacBook Air de 15 pulgadas con chip M3 ofrece un rendimiento excepcional y una batería de larga duración en un diseño delgado y ligero. Equipado con una pantalla Liquid Retina de 15,3 pulgadas y un procesador Apple M3 con CPU de 8 núcleos y GPU de 10 núcleos, es ideal para realizar tareas exigentes y disfrutar de gráficos avanzados. Además, cuenta con una cámara FaceTime HD de 1080p y una duración de batería de hasta 18 horas
                  </MKTypography>
                </Card>
              </Grid>
            </Grid>
          </SoftBox>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Information />
        <Team />
        <Featuring />
        <Newsletter />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default AboutUs;
