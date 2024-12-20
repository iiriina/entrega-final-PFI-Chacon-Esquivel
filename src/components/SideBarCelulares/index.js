import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MKTypography from "components/MKTypography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from 'prop-types';

function SideBarCelulares({ onApplyFilters, currentFilters }) {
  const [minPrice, setMinPrice] = useState(currentFilters.min_price || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.max_price || '');
  const [almacenamiento, setAlmacenamiento] = useState(currentFilters.almacenamiento || '');
  const [cantidadCamaras, setCantidadCamaras] = useState(currentFilters.cantidadCamaras || '');

  useEffect(() => {
    setMinPrice(currentFilters.min_price || '');
    setMaxPrice(currentFilters.max_price || '');
    setAlmacenamiento(currentFilters.almacenamiento || '');
    setCantidadCamaras(currentFilters.cantidadCamaras || '');
  }, [currentFilters]);

  const handleApplyFilters = () => {
    const filters = {
      min_price: minPrice,
      max_price: maxPrice,
      almacenamiento,
      cantidadCamaras,
    };
    onApplyFilters(filters);
  };

  const handleAlmacenamientoChange = (value) => {
    setAlmacenamiento(almacenamiento === value ? '' : value);
  };

  return (
    <Card sx={{ p: 2, borderRadius: "lg", boxShadow: "lg", backgroundColor: "white", height: "100%" }}>
      <MKTypography variant="h6" mb={2}>
        Filtros
      </MKTypography>

      {/* Filtro de precio */}
      <MKTypography variant="body2" mb={1}>
        Rango de Precio
      </MKTypography>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
        <TextField
          label="Mínimo"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Máximo"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />
      </div>

      {/* Filtro de almacenamiento */}
      <MKTypography variant="body2" mt={3} mb={1}>
        Almacenamiento
      </MKTypography>
      <div>
        {['128 GB', '256 GB', '512 GB', '1 TB'].map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={almacenamiento === option}
                onChange={() => handleAlmacenamientoChange(option)}
              />
            }
            label={<MKTypography variant="body2">{option}</MKTypography>}
          />
        ))}
      </div>

      {/* Filtro de cantidad de cámaras */}
      <MKTypography variant="body2" mt={3} mb={1}>
        Cantidad de Cámaras
      </MKTypography>
      <div style={{ padding: '0 15px' }}> {/* Cambiado a 20px para mayor separación */}
      <Slider
  value={cantidadCamaras || 0} // Usa 0 para representar "Vacío"
  onChange={(e, value) => setCantidadCamaras(value === 0 ? null : value)} // Si es 0, lo convierte a null
  step={1}
  marks={[
    {
      value: 0,
      label: (
        <MKTypography
          variant="caption"
          sx={{
            position: 'relative',
            left: '-20px', // Mueve la etiqueta hacia la izquierda
          }}
        >
          (Vacío)
        </MKTypography>
      ),
    },
    { value: 1, label: <MKTypography variant="caption">1</MKTypography> },
    { value: 2, label: <MKTypography variant="caption">2</MKTypography> },
    { value: 3, label: <MKTypography variant="caption">3</MKTypography> },
    { value: 4, label: <MKTypography variant="caption">4</MKTypography> },
  ]}
  min={0}
  max={4}
  valueLabelDisplay="auto"
  aria-labelledby="slider-cantidad-camaras"
  sx={{
    width: '100%',
    mx: 'auto',
    '& .MuiSlider-markLabel': {
      transform: 'translateY(10px)', // Ajusta la posición vertical de todas las etiquetas
    },
    '& .MuiSlider-mark': {
      width: '8px', // Tamaño de los puntos
      height: '8px',
      borderRadius: '50%', // Forma redonda
      backgroundColor: '#1976d2', // Azul
    },
    '& .MuiSlider-markActive': {
      backgroundColor: '#115293', // Azul oscuro para puntos activos
    },
  }}
/>






      </div>

      {/* Botón aplicar filtros */}
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleApplyFilters}>
        Aplicar Filtros
      </Button>
    </Card>
  );
}

SideBarCelulares.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
  currentFilters: PropTypes.object
};

export default SideBarCelulares;
