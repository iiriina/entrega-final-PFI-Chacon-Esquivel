import PropTypes from "prop-types";
import { useEffect, useState } from "react"; // Import hooks
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Asumimos que quieres hacer fetch de "dolar" y "puertaAPuerta"
import { getDolar } from "controllers/getDolar";
import { getPuertaAPuerta } from "controllers/getImpuestosPuertaApuerta";

function ProfilesList({ title, productPrice, productWeight }) {
  const [setImpuestos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Variables que almacenan los valores de envío y dólar
  const [shippingCost, setShippingCost] = useState(0);
  const [dolarOficial, setDolarOficial] = useState(0);

  // Fetch data cuando el componente se monta
  useEffect(() => {
    const fetchImpuestosData = async () => {
      try {
        const dolarData = await getDolar();
        const puertaAPuertaData = await getPuertaAPuerta();

        // Aquí seleccionamos el costo de envío en base al peso del producto
        const pesoKey = "fedexEconomy3Kg";
        const envio = puertaAPuertaData.data[pesoKey];

        // Guardamos el costo de envío y el valor del dólar oficial
        setShippingCost(envio);
        setDolarOficial(dolarData.data.dolarOficial);

        const impuestos = [
          { name: "Dólar Oficial", value: dolarData.data.dolarOficial },
          { name: "Cantidad de Envíos Gratis", value: puertaAPuertaData.data.cantEnviosGratis },
          { name: "Fedex Economy", value: envio },
        ];

        setImpuestos(impuestos);
      } catch (error) {
        console.error("Error al obtener los datos de impuestos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImpuestosData();
  }, [productWeight]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  // Cálculo final
  const totalCost = (productPrice + shippingCost) * dolarOficial;

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        {/* Tabla para mostrar los detalles */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Descripción</th>
              <th style={{ textAlign: 'right' }}>Cantidad</th>
              <th style={{ textAlign: 'right' }}>Precio</th>
              <th style={{ textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Costo del Producto</td>
              <td>1</td>
              <td style={{ textAlign: 'right' }}>${productPrice}</td>
              <td style={{ textAlign: 'right' }}>${productPrice}</td>
            </tr>
            <tr>
              <td>Envío ({productWeight} kg)</td>
              <td>1</td>
              <td style={{ textAlign: 'right' }}>${shippingCost}</td>
              <td style={{ textAlign: 'right' }}>${shippingCost}</td>
            </tr>
            <tr>
              <td>Valor del Dólar Oficial</td>
              <td>1</td>
              <td style={{ textAlign: 'right' }}>${dolarOficial}</td>
              <td style={{ textAlign: 'right' }}>${dolarOficial}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Total</td>
              <td></td>
              <td></td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>${totalCost.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </SoftBox>
    </Card>
  );
}

// Validar los PropTypes
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired, // Precio del producto
  productWeight: PropTypes.number.isRequired, // Peso del producto
};

export default ProfilesList;
