import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { GoogleMapProvider } from "../context/GoogleMapContext";
import "../index.css";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import ReviewStationProvider from "../context/UserReviewContext";
import PriceProvider from "../context/PriceContext";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    try {
      dispatch(thunkAuthenticate());
      setIsLoaded(true);
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  return (
    <>
      <ThemeProvider>
        <APIProvider
          apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMapProvider>
            <ReviewStationProvider>
              <PriceProvider>
                <ModalProvider>
                  <div className="align-body">
                    <div className={`main-body-container-${theme}`}>
                      <Navigation />
                      {isLoaded && <Outlet />}
                    </div>
                  </div>
                  <Modal />
                </ModalProvider>
              </PriceProvider>
            </ReviewStationProvider>
          </GoogleMapProvider>
        </APIProvider>
      </ThemeProvider>
    </>
  );
}
