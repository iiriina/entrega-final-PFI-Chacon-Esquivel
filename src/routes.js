import Icon from "@mui/material/Icon";

// Pages
import Product from "layouts/pages/landing-pages/product";
import Dashboard from "layouts/dashboard";
import Celulares from "layouts/pages/landing-pages/cellphones";
import Presentation from "pages/Presentation";
import DashboardCelulares from "layouts/dashboardCelulares";
import DashboardComputadoras from "layouts/dashboardComputadoras";

const routes = [
  {
    name: "Productos",
    icon: <Icon>article</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "Categorias",
        collapse: [
          {
            name: "Celulares",
            route: "/pages/celulares",
            component: <Celulares />,
          },
          {
            name: "Computadoras",
            route: "/pages/landing-pages/products",
            component: <Product />,
          }
        ],
      },
    ],
  },
  {
    name: "Dashboards",
    icon: <Icon>dashboard</Icon>,
    collapse: [
      {
        name: "Predictivo",
        route: "/pages/dashboardPredictivo",
        component: <Dashboard />,
      },
      {
        name: "Celulares",
        route: "/pages/dashboardCelulares",
        component: <DashboardCelulares />,
      },
      {
        name: "Computadoras",
        route: "/pages/dashboardComputadoras",
        component: <DashboardComputadoras />,
      }
    ]
  },
  {
    name: "",
    icon: <Icon>settings</Icon>,
    collapse: [
      {
        name: "Cerrar sesión",  // El nombre que se verá en el menú
        route: "/inicio",             // Redirigir al inicio
        action: "logout",
        component: <Presentation />
      },
    ],
  },
];

export default routes;
