import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { GoogleMapProvider } from "../context/GoogleMapContext";
import "../index.css";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ThemeProvider } from "../context/ThemeContext";
// import DarkLightMode from "../components/DarkLightModeDisplay/DarkLightMode";
import ReviewStationProvider from "../context/UserReviewContext";
import UserReviewsDisplay from "../components/GoogleMapsDisplay/ControlCRUDComponents/UserReviewsDisplay";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    try {
      dispatch(thunkAuthenticate());
      setIsLoaded(true);
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  const DisplayReview = location.pathname.startsWith("/api/station");

  return (
    <>
      <ThemeProvider>
        {/* <DarkLightMode /> */}
        <APIProvider
          apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMapProvider>
            <ReviewStationProvider>
              {DisplayReview && <UserReviewsDisplay />}
              <ModalProvider>
                <div className="align-body">
                  <div className="main-body-container">
                    <Navigation />
                    {isLoaded && <Outlet />}
                  </div>
                </div>
                <Modal />
              </ModalProvider>
            </ReviewStationProvider>
          </GoogleMapProvider>
        </APIProvider>
      </ThemeProvider>
    </>
  );
}
