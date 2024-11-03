import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import './styles.css';

// Importar controladores
import { getDolar } from "controllers/getDolar";
import { getPuertaAPuerta } from "controllers/getImpuestosPuertaApuerta";
import { getEnvioEspecifico } from "controllers/getEnvio";

function ProfilesList({ title, productPrice }) {
  const [shippingCost, setShippingCost] = useState(0);
  const [dolarOficial, setDolarOficial] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [envio, setEnvio] = useState(""); // Selección inicial vacía
  const [enviosRealizados, setEnviosRealizados] = useState(0); // Cantidad de envíos realizados
  const [isComprador, setIsComprador] = useState(false);
  const [puertaAPuertaData, setPuertaAPuertaData] = useState({}); // Datos de puerta a puerta

  // Determinar si el usuario es "comprador" o no
  useEffect(() => {
    const tipoConsumidor = localStorage.getItem("tipoConsumidor");
    if (tipoConsumidor === "comprador") {
      setIsComprador(true);
    }
  }, []);

  // Fetch inicial para obtener datos de dolar y puertaAPuerta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dolarData = await getDolar();
        const puertaAPuertaDataResponse = await getPuertaAPuerta();
        setPuertaAPuertaData(puertaAPuertaDataResponse.data);
        setDolarOficial(dolarData.data.dolarOficial || 0);
      } catch (error) {
        console.error("Error al obtener los datos de impuestos", error);
      }
    };
    fetchData();
  }, []);

  if (!isComprador) {
    console.log("Apartado de empresa");
    return (
      <SoftBox p={2} boxShadow={3} borderRadius="lg">
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize" color="white">
          {title}
        </SoftTypography>
        <p>Apartado de empresa</p>
      </SoftBox>
    );
  }

  // Cálculo de BASE = Precio Mercadería + Envío
  const base = productPrice * quantity + (isComprador ? shippingCost : 0);
  console.log("BASE:", base);

  // Impuesto PAIS aplicado a BASE (7.5% de base)
  const impuestoPAIS = base * (puertaAPuertaData.impuestoPAIS / 100 || 0.075);
  console.log("Impuesto PAIS:", impuestoPAIS);

  // TOTAL = BASE + Impuesto PAIS
  const totalConPAIS = base + impuestoPAIS;
  console.log("Total con PAIS:", totalConPAIS);

  const impuestoGanancias = base * dolarOficial * puertaAPuertaData.impuestoGanancias;

  // Aplicar descuento de 50 USD a TOTAL si los envíos realizados son menores a 12
  const totalAjustado = enviosRealizados < (puertaAPuertaData.cantEnviosGratis || 12)
    ? totalConPAIS - (puertaAPuertaData.limiteSinImpuestos || 50)
    : totalConPAIS;
  console.log("Total Ajustado (con descuento si aplica):", totalAjustado);

  // Derechos de Importación (50% de TOTAL Ajustado)
  const derechosImportacion = totalAjustado * (puertaAPuertaData.porcentajeDescontado || 0.5);
  console.log("Derechos de Importación (en USD):", derechosImportacion);

  // Convertir a pesos
  const derechosImportacionARS = derechosImportacion * dolarOficial;
  console.log("Derechos de Importación en ARS:", derechosImportacionARS);

  // Total Ajustado a Pesos (con Derechos de Importación)
  const totalAjustadoEnPesos = totalAjustado * dolarOficial;
  console.log("Total Ajustado en Pesos:", totalAjustadoEnPesos);

  // Total en ARS sin Tasa de Correo
  const totalEnARSSinTasaCorreo = totalAjustadoEnPesos + derechosImportacionARS;
  console.log("Total en ARS sin Tasa de Correo:", totalEnARSSinTasaCorreo);

  // Tasa de Correo (fija en 190 ARS según los datos proporcionados)
  const tasaCorreo = puertaAPuertaData.tasaCorreo || 190;
  const totalConTasaCorreoARS = totalEnARSSinTasaCorreo + tasaCorreo;
  console.log("Total con Tasa de Correo en ARS:", totalConTasaCorreoARS);

  // IVA (21%) sobre el subtotal en ARS
  const ivaPorcentaje = (puertaAPuertaData.IVA || 21) / 100;
  const iva = totalConTasaCorreoARS * ivaPorcentaje;
  console.log("IVA en ARS:", iva);

  // Subtotal con IVA en ARS
  const subtotalConIVAenARS = totalConTasaCorreoARS + iva;
  console.log("Subtotal con IVA en ARS:", subtotalConIVAenARS);

  // Total final en ARS con Impuesto a las Ganancias
  const totalConGananciasARS = subtotalConIVAenARS + (impuestoGanancias * dolarOficial);
  console.log("Total en ARS con Impuesto a las Ganancias:", totalConGananciasARS);

  // Total en ARS sin Impuesto a las Ganancias
  const totalSinGananciasARS = subtotalConIVAenARS;
  console.log("Total en ARS sin Impuesto a las Ganancias:", totalSinGananciasARS);

  const handleEnvioChange = async (event) => {
    const selectedEnvio = event.target.value;
    setEnvio(selectedEnvio);

    if (selectedEnvio === "Otro") {
      setShippingCost(0);
    } else {
      try {
        const envioResponse = await getEnvioEspecifico(selectedEnvio, quantity * 2.0); // Peso total por producto
        setShippingCost(envioResponse.data.precio || 0);
      } catch (error) {
        console.error("Error al obtener el costo de envío:", error);
        setShippingCost(0);
      }
    }
  };

  return (
    <SoftBox p={2} boxShadow={3} borderRadius="lg">
      <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize" color="white">
        {title}
      </SoftTypography>
      {/* Aquí comienza la tabla de cálculos para comprador */}
      <TableContainer sx={{ overflowX: "hidden", mt: 2 }}>
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableBody>
            <TableRow>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="left">Cantidad</TableCell>
              <TableCell align="left">Precio</TableCell>
              <TableCell align="left">Total</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Costo del Producto</TableCell>
              <TableCell align="left">
                <TextField 
                  type="number"
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value, 10)))} 
                  inputProps={{ min: "0" }} 
                />
              </TableCell>
              <TableCell align="left">${productPrice.toFixed(2)}</TableCell>
              <TableCell align="left">${(productPrice * quantity).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Envíos Realizados</TableCell>
              <TableCell align="left">
                <TextField 
                  type="number" 
                  value={enviosRealizados} 
                  onChange={(e) => setEnviosRealizados(Math.max(0, parseInt(e.target.value, 10)))} 
                  inputProps={{ min: "0" }} 
                />
              </TableCell>
            </TableRow>
            {isComprador && (
              <TableRow>
                <TableCell align="left">
                  <Select
                    value={envio}
                    onChange={handleEnvioChange}
                    displayEmpty
                  >
                    <MenuItem value="">Seleccionar Envio</MenuItem>
                    <MenuItem value="Economy">Economy</MenuItem>
                    <MenuItem value="Priority">Priority</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="left">1</TableCell>
                <TableCell align="left">
                  {envio === "Otro" ? (
                    <TextField
                      value={shippingCost}
                      onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                      placeholder="Ingrese el costo"
                      type="number"
                    />
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </TableCell>
                <TableCell align="left">${(productPrice * quantity + shippingCost).toFixed(2)}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell align="left">Impuesto PAIS (7.5%)</TableCell>
              <TableCell align="left">1</TableCell>
              <TableCell align="left">${impuestoPAIS.toFixed(2)}</TableCell>
              <TableCell align="left">${(productPrice * quantity + shippingCost + impuestoPAIS).toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
          <tfoot>
            <TableRow>
              <TableCell colSpan={3} align="right" style={{ fontWeight: "bold" }}>
                Total en USD:
              </TableCell>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                ${(productPrice * quantity + shippingCost + impuestoPAIS).toFixed(2)}
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </TableContainer>

      {/* Aquí comienza la segunda tabla después del título intermedio */}
      <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize" color="white" mt={4}>
        {"Cálculo impuestos CORREO:"}
      </SoftTypography>

      <TableContainer sx={{ overflowX: "hidden", mt: 2 }}>
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableBody>
            <TableRow>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="left">Cantidad</TableCell>
              <TableCell align="left">Precio</TableCell>
              <TableCell align="left">Total</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">Derechos de Importación (50%)</TableCell>
              <TableCell align="left">1</TableCell>
              <TableCell align="left">${derechosImportacion.toFixed(2)}</TableCell>
              <TableCell align="left">${(productPrice * quantity + shippingCost + impuestoPAIS + derechosImportacion).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Conversión a ARS (Dólar Oficial)</TableCell>
              <TableCell align="left">{(productPrice * quantity + shippingCost + impuestoPAIS + derechosImportacion).toFixed(2)}</TableCell>
              <TableCell align="left">${dolarOficial.toFixed(2)}</TableCell>
              <TableCell align="left">${((productPrice * quantity + shippingCost + impuestoPAIS + derechosImportacion) * dolarOficial.toFixed(2)).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Tasa de Correo Argentino</TableCell>
              <TableCell align="left">1</TableCell>
              <TableCell align="left">${tasaCorreo.toFixed(2)}</TableCell>
              <TableCell align="left">${((productPrice * quantity + shippingCost + impuestoPAIS + derechosImportacion) * dolarOficial.toFixed(2) + tasaCorreo).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">IVA ({puertaAPuertaData.IVA}%)</TableCell>
              <TableCell align="left">1</TableCell>
              <TableCell align="left">${(((productPrice * quantity + shippingCost + impuestoPAIS + derechosImportacion) * dolarOficial.toFixed(2) + tasaCorreo) * (puertaAPuertaData.IVA / 100)).toFixed(2)}</TableCell>
              <TableCell align="left">
                ${(
                  ((productPrice * quantity + shippingCost + impuestoPAIS + derechosImportacion) * dolarOficial + tasaCorreo) *
                  (1 + puertaAPuertaData.IVA / 100)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align="right" style={{ fontWeight: "bold", color: "gray" }}>
                Total s/ Imp. Ganancias en ARS:
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold", color: "gray" }}>
                ${(
                  ((productPrice * quantity + shippingCost + impuestoPAIS + derechosImportacion) * dolarOficial + tasaCorreo) *
                  (1 + puertaAPuertaData.IVA / 100)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Impuesto a las Ganancias (30%)</TableCell>
              <TableCell align="left">1</TableCell>
              <TableCell align="left">${impuestoGanancias.toFixed(2)}</TableCell>
              <TableCell align="left">
                ${(
                  impuestoGanancias +
                  ((productPrice * quantity + shippingCost + impuestoPAIS + derechosImportacion) * dolarOficial + tasaCorreo) *
                  (1 + puertaAPuertaData.IVA / 100)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
          <tfoot>
            <TableRow>
              <TableCell colSpan={3} align="right" style={{ fontWeight: "bold" }}>
                Total c/ Imp. Ganancias en ARS:
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                ${(
                  impuestoGanancias +
                  ((productPrice * quantity + shippingCost + impuestoPAIS + derechosImportacion) * dolarOficial + tasaCorreo) *
                  (1 + puertaAPuertaData.IVA / 100)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </TableContainer>
    </SoftBox>
  );
}

ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired
};

export default ProfilesList;
