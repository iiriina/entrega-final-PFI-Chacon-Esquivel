import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import InfoComputadoras from "examples/Cards/InfoCards/InfoComputadoras";

import ImpuestosPuertaAPuertaComputadoras from "components/impuestosPuertaAPuertaComputadoras";
import Header from "./componentes/Header2";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import routes from "routes";
import defaultComputerImage from "assets/images/268868_u7nsk3.png";
import Card from "@mui/material/Card";
import './index.css';

// API URL
const API_URL = "http://34.228.83.83:4000/api/computer-prediction/computerPorId";

function Overview() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}?id_computer=${id}`);
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
    return <p>No se encontró la computadora.</p>;
  }

  const productInfo = {
    "Marca": product?.marca || "No disponible",
    "Modelo": product?.modelo || "No disponible",
    "Procesador": product?.procesador || "No disponible",
    "Sist. Operativo": product?.OS || product?.sistema_operativo || "No disponible",
    "Placa Gráfica": product?.placaGrafica || "No disponible",
    "RAM": product?.RAM || "No disponible",
    "Almacenamiento": product?.almacenamiento || "No disponible",
    "Tamaño Pantalla": product?.tamaño || "No disponible",
    "Resolución Pantalla": product?.resolucionPantalla || "No disponible",
    "Batería": product?.bateria || "No disponible",
    "Peso": product?.peso || "No disponible",
  };

  const filteredProductInfo = Object.entries(productInfo).reduce((acc, [key, value]) => {
    if (value && value !== "No disponible") {
      acc[key] = value;
    }
    return acc;
  }, {});

  const replaceQuotes = (text) => text.replace(/&quot;/g, '" ');

  const productDescription = Array.isArray(product?.descripcion)
    ? product?.descripcion.map(item => replaceQuotes(item.trim().endsWith('.') ? item : `${item}.`)).join(" ")
    : replaceQuotes(product?.descripcion?.trim().endsWith('.') ? product?.descripcion : `${product?.descripcion}.`) || null;

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
      <SoftBox mt={6} mb={3} px={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={3} >
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
                src={Array.isArray(product?.imagenes) ? product?.imagenes[0] : defaultComputerImage}
                alt={product?.nombre || "Producto"}
                style={{ width: "60%", borderRadius: "10px" }}
              />
            </SoftBox>
            </div>
            
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
              description={productDescription}
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
