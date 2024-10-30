import React, { useState } from "react";
import Card from "@mui/material/Card";
import MKTypography from "components/MKTypography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from 'prop-types';

function Sidebar({ onApplyFilters }) {
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [almacenamiento, setAlmacenamiento] = useState('');
  const [RAM, setRAM] = useState('');

  const handleApplyFilters = () => {
    const filters = {
      min_price: minPrice,
      max_price: maxPrice,
      almacenamiento,
      RAM
    };
    onApplyFilters(filters);
  };

  // Función para controlar la selección de Almacenamiento
  const handleAlmacenamientoChange = (value) => {
    setAlmacenamiento(almacenamiento === value ? '' : value);
  };

  // Función para controlar la selección de RAM
  const handleRAMChange = (value) => {
    setRAM(RAM === value ? '' : value);
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
          value={minPrice || ''}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Máximo"
          type="number"
          value={maxPrice || ''}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
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
        {['256 GB', '512 GB', '1 TB', '2 TB', '3 TB'].map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={almacenamiento === option}
                onChange={() => handleAlmacenamientoChange(option)}
              />
            }
            label={option}
          />
        ))}
      </div>

      {/* Filtro de RAM */}
      <MKTypography variant="body2" mt={3} mb={1}>
        RAM
      </MKTypography>
      <div>
        {['8 GB', '16 GB', '32 GB', '48 GB', '64 GB'].map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={RAM === option}
                onChange={() => handleRAMChange(option)}
              />
            }
            label={option}
          />
        ))}
      </div>

      {/* Botón aplicar filtros */}
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleApplyFilters}>
        Aplicar Filtros
      </Button>
    </Card>
  );
}

// Validación de PropTypes para onApplyFilters
Sidebar.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
};

export default Sidebar;
