import { useEffect, useState } from "react";
import DisplayCard from "../DisplayCard";
import "./SavedSpotsComponent.css";
import { FaTrash } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

function SavedSpotsComponent() {
  // const sessionUser = useSelector((state) => state.session.user);
  const [selectedStations, setSelectedStations] = useState([]);
  const [photoUrl, setPhotoUrl] = useState({});
  const [update, setUpdate] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(null);

  const fetchSelectedStation = async (id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "*",
      },
    };
    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${id}?key=${API_KEY}`,
        requestOptions,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching selected station:", error);
    }
  };

  const fetchPhotoUrl = async (selectedStation) => {
    // This creates a long URL string that we fetch from using the
    // Google Places API
    if (
      selectedStation &&
      selectedStation.photos &&
      selectedStation.photos.length > 0
    ) {
      const photoList = selectedStation.photos;
      const photoUrls = await Promise.all(
        photoList.map(async (photo) => {
          const photoName = photo.name;
          const response = await fetch(
            "https://places.googleapis.com/v1/" +
              photoName +
              "/media?maxHeightPx=400&maxWidthPx=400&key=" +
              API_KEY,
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.url;
        }),
      );
      return photoUrls;
    }
  };

  const onDeleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/king/current/station/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedStations = selectedStations.filter(
        (station) => station.id !== id,
      );
      setSelectedStations(updatedStations);
      setUpdate((prev) => !prev);
      setOpenConfirmation(null);
    } catch (error) {
      console.error("Failed to delete station:", error);
    }
  };

  useEffect(() => {
    const fetchUserStationData = async () => {
      try {
        const res = await fetch(`/api/king/current/stations`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const userStationData = await res.json();
        const userStations = Object.values(userStationData.stations);

        const stationsData = await Promise.all(
          userStations.map(async (spot) => {
            const selectedStationData = await fetchSelectedStation(
              spot.id,
            );
            const photoUrls = await fetchPhotoUrl(
              selectedStationData,
            );
            return { ...selectedStationData, photoUrls };
          }),
        );

        setSelectedStations(stationsData);
      } catch (error) {
        console.error("Failed to fetch user station data:", error);
      }
    };

    fetchUserStationData();
  }, [update]);

  useEffect(() => {
    const fetchAllPhotoUrls = async () => {
      const photoUrlsMap = {};
      for (const station of selectedStations) {
        const photoUrls = await fetchPhotoUrl(station);
        photoUrlsMap[station.id] = photoUrls;
      }
      setPhotoUrl(photoUrlsMap);
    };

    if (selectedStations.length > 0) {
      fetchAllPhotoUrls();
    }
  }, [selectedStations]);

  if (!selectedStations)
    return (
      <div className="saved-spots-container">
        <h3>Loading...</h3>
      </div>
    );

  if (openConfirmation) {
    return (
      <div className="saved-spots-container">
        <p>Are you sure you want to delete this station?</p>
        <div className="confirmation-buttons">
          <button
            className="button"
            onClick={() => onDeleteHandler(openConfirmation)}
          >
            Yes
          </button>
          <button
            className="button"
            onClick={() => setOpenConfirmation(null)}
          >
            No
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-spots-container">
      <h3>Saved Stations: </h3>
      {selectedStations.map((spot, index) => {
        if (spot) {
          return (
            <div key={spot + index} className="saved-spot-item">
              <div
                className="delete-icon-container"
                onClick={() => setOpenConfirmation(spot.id)}
              >
                <FaTrash className="delete-icon" />
              </div>
              <DisplayCard
                selectedStation={spot}
                photoUrl={photoUrl[spot.id]}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

export default SavedSpotsComponent;
