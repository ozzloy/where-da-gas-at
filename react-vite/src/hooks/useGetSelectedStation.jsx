import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

function useGetSelectedStation({ id }) {
    const [selectedStationData, setSelectedStationData] = useState(null);

    useEffect(() => {
        const fetchSelectedStation = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY,
                "X-Goog-FieldMask": "*",
            },
        };
        try {
            const response = await fetch(
            `https://places.googleapis.com/v1/places/${id}?key=${API_KEY}`,
            requestOptions
            );
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSelectedStationData(data);
        } catch (error) {
            console.error('Error fetching selected station:', error);
        }
        };

        if (id) {
        fetchSelectedStation();
        }
    }, [id]);

    return selectedStationData;
}

export { useGetSelectedStation };