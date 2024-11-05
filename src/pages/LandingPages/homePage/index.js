import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import bgImage from "assets/images/actualburbujamasabajo.jpg";
import routes from "routes";


import TabsSimple from "layouts/sections/navigation/nav-tabs/components/TabsSimple";

function HomePage() {
  return (
    <>
        <DefaultNavbar
          routes={routes}

        />
      <MKBox
        minHeight="100vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Card
          sx={{
            p: 2,
            width: { xs: '80%', sm: '60%', lg: '30%' },
            mx: "auto",
            mt: 70, 
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
            position: 'absolute', 
            top: '10%', 
            left: '50%',
            transform: 'translateX(-50%)', 
            zIndex: 1,
          }}
        >
            <TabsSimple
              sx={{
                width: '100%',   
                height: '100%',  
              }}
            />
        </Card>
      </MKBox>
    </>
  );
}

export default HomePage;
