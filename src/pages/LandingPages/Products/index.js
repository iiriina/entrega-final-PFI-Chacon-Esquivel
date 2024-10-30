import React, { useState, useEffect } from 'react';
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CenteredBlogCard from 'examples/Cards/BlogCards/CardCompus'; // Tarjeta para computadoras
import { FaSearch } from 'react-icons/fa';
import Pagination from "@mui/material/Pagination"; // Importar el componente de paginación
import './index.css';
import Sidebar from 'components/SideBar';
import { getComputadoras } from 'controllers/getComputadoras';  // Función para obtener las computadoras
import routes from "routes";

function Products() {
  const [searchQuery, setSearchQuery] = useState('');  // Estado para la búsqueda
  const [products, setProducts] = useState([]);  // Estado para los productos (computadoras)
  const [loading, setLoading] = useState(false);  // Estado de carga
  const [currentPage, setCurrentPage] = useState(1);  // Estado para la página actual
  const [totalPages, setTotalPages] = useState(1);  // Estado para el total de páginas
  const [filters, setFilters] = useState({}); // Estado para los filtros aplicados

  // Función para obtener los productos (computadoras)
  const fetchProducts = async (filtros = {}) => {
    setLoading(true);
    try {
      const resultados = await getComputadoras({ ...filtros, page: currentPage, limit: 20 });  // Añadir paginación a la consulta

      if (Array.isArray(resultados.data)) {
        setProducts(resultados.data);  // Establecer los productos en el estado
        setTotalPages(resultados.totalPages || 1);  // Establecer el total de páginas
      } else {
        setProducts([]);  // Si no hay resultados, vaciar la lista de productos
      }
    } catch (error) {
      console.error("Error al buscar computadoras:", error);
      setProducts([]);  // Manejo de errores
    } finally {
      setLoading(false);  // Terminar el estado de carga
    }
  };

  // para obtener productos cuando el componente se monta o cambia la página
  useEffect(() => {
    fetchProducts({ query: searchQuery, page: currentPage });
  }, [currentPage]);

  // Función para manejar cambios en la búsqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Función para realizar la búsqueda
  const handleSearchSubmit = () => {
    setCurrentPage(1);  // Reiniciar la página a 1 antes de realizar la búsqueda
    fetchProducts({ query: searchQuery, page: 1, ...filters });  // Establecer la página en 1 cuando se realiza la búsqueda
  };

  // Función para aplicar filtros desde la barra lateral
  const handleApplyFilters = (filters) => {
    const transformedFilters = {
      query: searchQuery || '',  // Añadir la query si existe
      min_price: filters.min_price || undefined,
      max_price: filters.max_price || undefined,
      almacenamiento: filters.almacenamiento || undefined,  // Añadir almacenamiento
      RAM: filters.RAM || undefined  // Añadir RAM
    };

    const cleanedFilters = Object.fromEntries(
      Object.entries(transformedFilters).filter(([, value]) => value !== undefined)
    );

    console.log("Filtros aplicados:", cleanedFilters); // Verificar los filtros aplicados en la consola

    setFilters(cleanedFilters); // Guardar los filtros en el estado
    setCurrentPage(1); // Reiniciar la página al aplicar filtros
    fetchProducts(cleanedFilters);
  };

  // Función para manejar el cambio de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Cambiar la página actual
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
              <Sidebar onApplyFilters={handleApplyFilters} />
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
                          product={product} // Pasar el producto completo
                        />
                      ) : (
                        <p>Producto no disponible</p>  // Mostrar un mensaje alternativo si el producto no está disponible
                      )}
                    </Grid>
                  ))
                )}
              </Grid>
              {/* Paginador */}
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
