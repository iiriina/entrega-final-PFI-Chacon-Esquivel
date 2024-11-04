// @mui material components
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import InfoComputadoras from "examples/Cards/InfoCards/InfoComputadoras";
import ImpuestosPuertaAPuertaComputadoras from "components/impuestosPuertaAPuertaCelulares";
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
  <SoftBox mt={6} mb={3} px={7} sx={{ display: "flex", justifyContent: "center" }}>
    <Grid container spacing={3}>
      {/* Columna para la imagen del producto */}
      <Grid item xs={12} md={6}>
        <div>
          <SoftBox
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              borderRadius: "lg",
              backgroundColor: "white",
              boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
            }}
          >
            <img
              src={Array.isArray(product?.imagenes) ? product?.imagenes[0] : samsungImage}
              alt={product?.nombre || "Producto"}
              style={{ width: "60%", borderRadius: "10px" }}
            />
          </SoftBox>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <Card 
            sx={{ 
              mt: 3, 
              p: 2,  
              textAlign: "center",
              maxWidth: "100%",
            }}
          >
            <SoftTypography variant="h5" fontWeight="medium" textTransform="capitalize">
              {product?.nombre || "Nombre del Producto"}
            </SoftTypography>

            <SoftTypography variant="h5" fontWeight="bold" color="violet" sx={{ mt: 2 }}>
              PRECIO: ${product?.precio} (USD)
            </SoftTypography>
          </Card>
        </div>

        {product?.precioArg && (
          <Card 
            sx={{ 
              mt: 3, 
              p: 2,  
              textAlign: "center",
              maxWidth: "100%",
            }}
          >
            <SoftTypography variant="h6" fontWeight="bold" color="green" sx={{ mt: 1 }}>
              PRECIO EN ARGENTINA: ${new Intl.NumberFormat("es-AR").format(product?.precioArg)} (ARS)
            </SoftTypography>
          </Card>
        )}

        <InfoComputadoras
          title="Información Del Producto"
          description={`Marca: ${product?.marca || "N/A"} - Modelo: ${product?.nombre || "N/A"}`}
          info={filteredProductInfo}
        />
      </Grid>

      {/* Columna para los impuestos */}
      <Grid item xs={12} md={6}>
        <ImpuestosPuertaAPuertaComputadoras title="Compra producto" productPrice={product?.precio} />
      </Grid>
    </Grid>
  </SoftBox>
</>
  );
}

export default Overview;
