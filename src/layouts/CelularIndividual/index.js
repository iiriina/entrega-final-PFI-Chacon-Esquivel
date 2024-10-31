// @mui material components
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import InfoComputadoras from "examples/Cards/InfoCards/InfoComputadoras";
import ProfilesList from "examples/Lists/ProfilesList";
import Header from "layouts/ComputadoraIndividual/componentes/Header2";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import Card from "@mui/material/Card";
import routes from "routes";
import samsungImage from "assets/images/268868_u7nsk3.png"; // Imagen por defecto para el celular
import './index.css';

// API URL
const API_URL = "https://4tljb4fp5f.execute-api.us-east-1.amazonaws.com/dev/api/cellphone_recommendations/cellphonePorId";

function Overview() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}?id_celular=${id}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data.data);
        } else {
          console.error("Error fetching product:", data.message);
        }
      } catch (error) {
        console.error("Error al obtener el producto", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!product) {
    return <p>No se encontró el celular.</p>;
  }

  const productInfo = {
    "Marca": product?.marca || "No disponible",
    "Modelo": product?.nombre || "No disponible",
    "Resolución": product?.resolucionPantalla || "No disponible",
    "Cámara Frontal": product?.camaraFrontal || "No disponible",
    "Cámaras Traseras": product?.camarasTraseras?.join(", ") || "No disponible",
    "RAM": product?.RAM || "No disponible",
    "Sist. Operativo": product?.OS || product?.sistema_operativo || "No disponible",
    "Batería": product?.bateria || "No disponible",
    "Peso": product?.peso || "No disponible",
    "Almacenamiento": product?.almacenamiento || "No disponible",
  };

  const filteredProductInfo = Object.entries(productInfo).reduce((acc, [key, value]) => {
    if (value && value !== "No disponible") {
      acc[key] = value;
    }
    return acc;
  }, {});

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={10}>
        <DefaultNavbar
          routes={routes}
          transparent
          light
        />
      </MKBox>

      <Header title={product?.nombre || "Producto"} />
      <SoftBox mt={6} mb={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={3}>
          {/* Columna para la imagen del producto */}
          <Grid item xs={12} md={4} xl={3}>
            <SoftBox
              sx={{
                position: "relative",
                borderRadius: "lg",
                backgroundColor: "white",
                boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
              }}
            >
              <img
                src={product?.imagen || samsungImage}
                alt={product?.nombre || "Producto"}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </SoftBox>

            {/* Nuevo Card para el precio */}
            <Card
              sx={{
                mt: 0, // No margin top if the brand is Apple
                p: 2,
                textAlign: "center",
                mx: "auto", // Center align the card horizontally
                maxWidth: "100%", // Max width same as the image container
              }}
            >
              {/* Product name */}
              <SoftTypography variant="h5" fontWeight="medium" textTransform="capitalize">
                {product?.nombre || "Nombre del Producto"}
              </SoftTypography>

              {/* Price */}
              <SoftTypography variant="h5" fontWeight="bold" color="violet" sx={{ mt: 2 }}>
                Precio: ${product?.precio} (USD)
              </SoftTypography>
            </Card>

              {/* Nuevo Card para el precio Arg */}
              <Card 
                sx={{ 
                  mt: 3, 
                  p: 2,  
                  textAlign: "center",
                  mx: "auto", // Center align the card horizontally

                  maxWidth: "100%", // Max width same as the image container

                }}
              >
              {product?.precioArg && (
                <SoftTypography variant="h6" fontWeight="bold" color="green" sx={{ mt: 1 }}>
                  Precio en Argentina: ${new Intl.NumberFormat("es-AR").format(product?.precioArg)} (ARS)
                </SoftTypography>
              )}
              
            </Card>

          </Grid>





          {/* Columna para la información del producto */}
          <Grid item xs={12} md={6} xl={4}>
            <InfoComputadoras
              title="Información Del Producto"
              description={`Marca: ${product?.marca || "N/A"} - Modelo: ${product?.nombre || "N/A"}`}
              info={filteredProductInfo}
            />
          </Grid>

          {/* Columna para ProfilesList */}
          <Grid item xs={12} xl={4}>
            <ProfilesList title="Impuestos" productPrice={product?.precio} />
          </Grid>
        </Grid>
      </SoftBox>
    </>
  );
}

export default Overview;
