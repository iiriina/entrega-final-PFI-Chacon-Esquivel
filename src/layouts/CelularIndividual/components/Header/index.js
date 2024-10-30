import { useState, useEffect } from "react";
import PropTypes from 'prop-types'; // Import PropTypes

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import image from "assets/images/waveproducto3.jpg";

function Header({ title }) { // Receiving title as prop
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    // The event listener that's calling the handleTabsOrientation function when resizing the window.
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <SoftBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      minHeight="25.75rem"
      borderRadius="xl"
      sx={{
        backgroundImage: `url(${image})`,  // Solo la imagen de fondo
        backgroundSize: "cover",
        backgroundPosition: "50%",
        overflow: "hidden",
        "::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50px", // Ajusta la altura del gradiente si es necesario
        },
      }}
    >
      <SoftTypography
        variant="h2"
        color="white"
        fontWeight="bold"
        sx={{ fontFamily: "Roboto, sans-serif" }}
      >
        {title} {/* Título dinámico */}
      </SoftTypography>
    </SoftBox>


  );
}

// Define PropTypes for the Header component
Header.propTypes = {
  title: PropTypes.string.isRequired, // 'title' should be passed as a string and is required
};

export default Header;
