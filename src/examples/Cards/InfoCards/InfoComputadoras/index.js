import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function InfoComputadoras({ title, description, info }) {
  const labels = [];
  const values = [];

  Object.keys(info).forEach((el) => {
    if (el !== "Descripción") {  
      if (el.match(/[A-Z\s]+/)) {
        const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
        const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);
        labels.push(newElement);
      } else {
        labels.push(el);
      }
    }
  });

  // Agregar los valores correspondientes a cada clave (excluyendo "Descripción")
  Object.values(info).forEach((el, index) => {
    if (Object.keys(info)[index] !== "Descripción") {  
      values.push(el);
    }
  });

// Renderizar los elementos de info (excepto la descripción)
const renderItems = labels.map((label, key) => (
  <SoftBox key={label} display="flex" py={1} pr={2}>
    <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize" sx={{ minWidth: "150px", fontSize: "1.05rem" }}>
      {label}: 
    </SoftTypography>
    <SoftTypography 
      variant="button" 
      fontWeight="regular" 
      color="text"
      sx={{ display: "block", marginLeft: "10px", fontSize: "0.95rem"  }} 
    >
      {values[key]}
    </SoftTypography>
  </SoftBox>
));


  return (
    <Card sx={{ height: "auto" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h5" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        {/* Mostrar la descripción directamente */}
        <SoftBox mb={1} lineHeight={1} >
          <SoftTypography variant="button" color="text" fontWeight="regular" sx={{ fontSize: "0.95rem" }}>
            {Array.isArray(description) ? description.join(" ") : description}
          </SoftTypography>
        </SoftBox>

        <SoftBox >
          {renderItems}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the InfoComputadoras
InfoComputadoras.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,  // Aceptar descripción como string o array de strings
  info: PropTypes.objectOf(PropTypes.string).isRequired
};

export default InfoComputadoras;
