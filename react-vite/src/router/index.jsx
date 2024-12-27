import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import GoogleMaps from "../components/GoogleMapsDisplay";
import StationDisplay from "../components/StationDisplay/StationDisplay";

// This is the router configuration for the app.
// If we want to add more routes, we can do so here.

// Most of the changes are done on the GoogleMaps component
// We might want to add new routes for the crud features 
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <GoogleMaps />,
      },
      {
        path: "/station/:id",
        element: <StationDisplay />,
      }
    ],
  },
]);
