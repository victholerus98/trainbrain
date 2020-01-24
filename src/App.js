import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as trainData from "./components/knockon.json";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    width: "100vw",
    height: "100vh",
    zoom: 0
  });
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedStation(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/joakimhellgren/ck5nrjreg2k3f1imprc5vyw6z"
        mapboxApiAccessToken="pk.eyJ1Ijoiam9ha2ltaGVsbGdyZW4iLCJhIjoiY2s1a3NscDRqMGczdjNscm04OXMwdWlxYyJ9.gFU5MsFPKNlqM96iO0zEfQ"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {trainData.disruptions.map(disruptions => (
          <Marker
            latitude={Number(disruptions.station.lat)}
            longitude={Number(disruptions.station.lng)}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedStation(disruptions);
              }}
            >
              <img src="" alt="delay dot" />
            </button>
          </Marker>
        ))}

        {selectedStation ? (
          <Popup
            latitude={Number(selectedStation.station.lat)}
            longitude={Number(selectedStation.station.lng)}
            onClose={() => {
              setSelectedStation(null);
            }}
          >
            <div>
              <h2>{selectedStation.station.station}</h2>
              <p>{selectedStation.delaycount}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
