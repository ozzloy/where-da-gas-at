import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import GoogleMaps from "../components/GoogleMapsDisplay";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <GoogleMaps />,
      },
    ],
  },
]);
