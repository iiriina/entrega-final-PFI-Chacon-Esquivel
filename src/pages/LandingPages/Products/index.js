import React, { useState, useEffect } from 'react';
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CenteredBlogCard from 'examples/Cards/BlogCards/CardCompus'; 
import { FaSearch } from 'react-icons/fa';
import Pagination from "@mui/material/Pagination"; 
import './index.css';
import Sidebar from 'components/SideBar';
import { getComputadoras } from 'controllers/getComputadoras';  
import routes from "routes";

function Products() {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);  
  const [totalPages, setTotalPages] = useState(1); 
  const [filters, setFilters] = useState({}); 

  // Función para obtener los productos (computadoras)
  const fetchProducts = async (filtros = {}) => {
    setLoading(true);
    try {
      const resultados = await getComputadoras({ ...filtros, page: currentPage, limit: 20 }); 

      if (Array.isArray(resultados.data)) {
        setProducts(resultados.data);  
        setTotalPages(resultados.totalPages || 1); 
      } else {
        setProducts([]);  
      }
    } catch (error) {
      console.error("Error al buscar computadoras:", error);
      setProducts([]); 
    } finally {
      setLoading(false); 
    }
  };

  // para obtener productos cuando el componente se monta o cambia la página
  useEffect(() => {
    fetchProducts({ query: searchQuery, ...filters, page: currentPage });
  }, [currentPage, filters]); // Agregar filters aquí
  

  // para manejar cambios en la búsqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // para realizar la búsqueda
  const handleSearchSubmit = () => {
    setCurrentPage(1);  // Reiniciar la página a 1
    fetchProducts({ query: searchQuery, page: 1, ...filters });  // Establecer la página en 1 
  };

  const handleApplyFilters = (filters) => {
    const transformedFilters = {
      query: searchQuery || '',
      min_price: filters.min_price || undefined,
      max_price: filters.max_price || undefined,
      almacenamiento: filters.almacenamiento || undefined,
      RAM: filters.RAM || undefined,
    };
  
    const cleanedFilters = Object.fromEntries(
      Object.entries(transformedFilters).filter(([, value]) => value !== undefined)
    );
  
    setFilters(cleanedFilters); // Solo actualiza el estado de los filtros
    setCurrentPage(1); // Reinicia a la página 1
  };
  

  // manejar el cambio de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value); 
  };

  return (
    <div className="mainDiv">
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
                placeholder="Buscar computadoras"
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
            {/* Sidebar de filtros */}
            <Grid item xs={12} md={3} lg={2} className="sidebar-container">
            <Sidebar onApplyFilters={handleApplyFilters} currentFilters={filters} />
            </Grid>

            {/* Listado de productos */}
            <Grid item xs={12} md={9} lg={10}>
              <Grid container spacing={3}>
                {loading ? (
                  <p style={{ textAlign: 'center', width: '100%' }}>Cargando...</p>
                ) : products.length === 0 ? (
                  <p style={{ textAlign: 'center', width: '100%' }}>No se encontraron productos :( Prueba con otra búsqueda</p>
                ) : (
                  products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={product?._id || index}>
                      {product ? (
                        <CenteredBlogCard
                          image={Array.isArray(product.imagenes) ? product.imagenes[0] : product.imagen}
                          title={`${product.nombre}`}
                          description={product.precio}
                          action={{
                            type: "internal",
                            route: `/computadora/${product._id}`,
                            color: "info",
                            label: "Ver Más",
                          }}
                          product={product} 
                        />
                      ) : (
                        <p>Producto no disponible</p>  
                      )}
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
    </div>
  );
}

export default Products;
