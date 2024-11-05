import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";


// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

import routes from "routes";
import ProductDetail from "layouts/CelularIndividual";
import ProductDetail2 from "layouts/ComputadoraIndividual";

//mantener estado login
import store from "./redux/store";
import { Provider } from 'react-redux'; // Agregar esta línea para importar el Provider de Redux
import Login from "layouts/login";
import SignUp from "components/SignUp";
import HomePage from "pages/LandingPages/homePage";

import './styles.css';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {getRoutes(routes)}
          <Route path="/inicio" element={<Presentation />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/computadora/:id" element={<ProductDetail2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/homePage" element={<HomePage />} />


          <Route path="*" element={<Navigate to="/inicio" />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}
