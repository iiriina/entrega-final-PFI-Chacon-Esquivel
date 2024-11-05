import React, { useState, useEffect } from 'react';
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardCelus from "examples/Cards/BlogCards/CardCelus"; // Tarjeta para celulares
import { FaSearch } from 'react-icons/fa';
import Pagination from "@mui/material/Pagination"; // Importar componente de paginación
import './index.css';
import SideBarCelulares from 'components/SideBarCelulares';
import { getCelulares } from 'controllers/getCelulares';
import routes from "routes";

function Cellphones() {
  const [searchQuery, setSearchQuery] = useState('');  
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);  
  const [filters, setFilters] = useState({});  

  // Función para obtener los productos (celulares) con filtros y paginación
  const fetchProducts = async (filtros = {}) => {
    setLoading(true);
    try {
      const resultados = await getCelulares({ ...filtros, page: currentPage, limit: 20 });  

      if (Array.isArray(resultados.data)) {
        setProducts(resultados.data);  
        setTotalPages(resultados.totalPages || 1);  
      } else {
        setProducts([]);  // Si no hay resultados, vaciamos la lista de productos
      }
    } catch (error) {
      console.error("Error al buscar celulares:", error);
      setProducts([]);  
    } finally {
      setLoading(false); 
    }
  };

  // obtener productos cuando el componente se carga o cambia la página o los filtros
  useEffect(() => {
    fetchProducts({ query: searchQuery, ...filters, page: currentPage });
  }, [currentPage, filters]);
  
  // Fx manejar cambios en la búsqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fx hacer la búsqueda
  const handleSearchSubmit = () => {
    setCurrentPage(1);  // Reinicia a página 1
    setFilters((prevFilters) => ({ ...prevFilters, query: searchQuery }));
  };

  // Función aplicar filtros
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); 
  };

  // Maneja el cambio de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value); 
  };

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={10}>
        <DefaultNavbar routes={routes} />
      </MKBox>
      <MKBox component="section" py={0.5} mt={10}>
        <div className="divTransparenteBackground">
          <div className="background-container">
            <div className="search-bar-container">
              <FaSearch className="search-icon" onClick={handleSearchSubmit} />
              <input
                type="text"
                placeholder="Buscar celulares"
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
            </div>
          </div>
        </div>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={2} className="sidebar-container">
              <SideBarCelulares onApplyFilters={handleApplyFilters} currentFilters={filters} />
            </Grid>

            <Grid item xs={12} md={9} lg={10}>
              <Grid container spacing={3}>
                {loading ? (
                  <p style={{ textAlign: 'center', width: '100%' }}>Cargando...</p>
                ) : products.length === 0 ? (
                  <p style={{ textAlign: 'center', width: '100%' }}>No se encontraron productos :( Prueba con otra búsqueda</p>
                ) : (
                  products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={product._id || index}>
                      <CardCelus
                        image={product.imagen}
                        title={product.nombre}
                        description={`${product.precio}`} 
                        product={product} 
                        action={{
                          type: "internal",
                          route: `/producto/${product._id}`,
                          color: "info",
                          label: "Ver detalles",
                        }}
                      />
                    </Grid>
                  ))
                )}
              </Grid>

              {/* Paginas */}
              <Grid container justifyContent="center" mt={3}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}

export default Cellphones;
