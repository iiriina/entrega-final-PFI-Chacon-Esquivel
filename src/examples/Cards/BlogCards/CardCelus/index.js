import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

function CenteredBlogCard({ image, title, description, action, product }) {
  return (
    <Card sx={{ maxWidth: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "auto" }}>
      <MKBox position="relative" borderRadius="lg" mx={2} mt={2} textAlign="center">
        <MKBox
          component="div"
          sx={{
            width: "100%",
            paddingBottom: "70.25%", // Esto establece una relación de aspecto de 16:9 (altura relativa al ancho)
            position: "relative",
            overflow: "hidden",
            borderRadius: "lg",
          }}
        >
          <MKBox
            component="img"
            src={image}
            alt={title}
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              objectFit: "contain", // Asegura que la imagen se ajuste dentro del área sin recortarse
              objectPosition: "center", // Centra la imagen dentro del contenedor
            }}
          />
        </MKBox>
      </MKBox>
      <MKBox p={3} textAlign="center" flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
        <MKTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="regular" mb={2}>
          {title}
        </MKTypography>
        <MKBox mb={3} flexGrow={1}>
          <MKTypography
            variant="body2"
            component="p"
            color="text"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2, // Limita a 2 líneas
              textOverflow: 'ellipsis',
            }}
          >
            ${description}
          </MKTypography>
        </MKBox>
        <MKBox mt="auto">
          {action.type === "external" ? (
            <MKButton
              component={MuiLink}
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="gradient"
              size="small"
              color={action.color ? action.color : "dark"}
            >
              {action.label}
            </MKButton>
          ) : (
            <MKButton
              component={Link}
              to={{
                pathname: `/producto/${product._id}`, // Redirige al producto específico usando su ID
              }}
              variant="gradient"
              size="small"
              color={action.color ? action.color : "dark"}
            >
              {action.label}
            </MKButton>
          )}
        </MKBox>
      </MKBox>
    </Card>
  );
}

CenteredBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
  product: PropTypes.object.isRequired, // Asegura que se pasa el producto completo como objeto
};

export default CenteredBlogCard;
