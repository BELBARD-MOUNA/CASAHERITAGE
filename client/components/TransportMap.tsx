import { useMemo, useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Popup, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import {
  tramwayLines,
  busWayLines,
  proximityPoints,
  TransportLine,
  ProximityPoint,
} from "@/data/transport";
import "./TransportMap.css";

interface TransportMapProps {
  selectedTramwayLine: string | null;
  selectedBusWayLine: string | null;
  activeProximityPoints: {
    bus: boolean;
    taxi_rouge: boolean;
    taxi_blanc: boolean;
  };
  onMarkerClick?: (data: any) => void;
}

// Component to handle map zooming
const MapBounds = ({
  selectedTramwayLine,
  selectedBusWayLine,
  activeProximityPoints,
}: {
  selectedTramwayLine: string | null;
  selectedBusWayLine: string | null;
  activeProximityPoints: {
    bus: boolean;
    taxi_rouge: boolean;
    taxi_blanc: boolean;
  };
}) => {
  const map = useMap();

  useEffect(() => {
    // Collect all points to zoom to
    const allPoints: Array<[number, number]> = [];

    // Add selected line points
    if (selectedTramwayLine) {
      const line = tramwayLines.find((l) => l.id === selectedTramwayLine);
      if (line) {
        line.route.forEach((coord) => allPoints.push([coord.lat, coord.lng]));
      }
    }

    if (selectedBusWayLine) {
      const line = busWayLines.find((l) => l.id === selectedBusWayLine);
      if (line) {
        line.route.forEach((coord) => allPoints.push([coord.lat, coord.lng]));
      }
    }

    // Add proximity point locations
    if (activeProximityPoints.bus) {
      const busData = proximityPoints.find((p) => p.transportType === "bus");
      if (busData) {
        busData.points.forEach((point) =>
          allPoints.push([point.lat, point.lng])
        );
      }
    }
    if (activeProximityPoints.taxi_rouge) {
      const taxiRedData = proximityPoints.find(
        (p) => p.transportType === "taxi_rouge"
      );
      if (taxiRedData) {
        taxiRedData.points.forEach((point) =>
          allPoints.push([point.lat, point.lng])
        );
      }
    }
    if (activeProximityPoints.taxi_blanc) {
      const taxiWhiteData = proximityPoints.find(
        (p) => p.transportType === "taxi_blanc"
      );
      if (taxiWhiteData) {
        taxiWhiteData.points.forEach((point) =>
          allPoints.push([point.lat, point.lng])
        );
      }
    }

    // Zoom to bounds if we have points
    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      // Default zoom to Casablanca
      map.setView([33.5731, -7.5898], 13);
    }
  }, [selectedTramwayLine, selectedBusWayLine, activeProximityPoints, map]);

  return null;
};

const TransportMap = ({
  selectedTramwayLine,
  selectedBusWayLine,
  activeProximityPoints,
  onMarkerClick,
}: TransportMapProps) => {
  const casablancaCenter: [number, number] = [33.5731, -7.5898];

  // Get selected line data
  const selectedLine = useMemo(() => {
    if (selectedTramwayLine) {
      return tramwayLines.find((l) => l.id === selectedTramwayLine);
    }
    if (selectedBusWayLine) {
      return busWayLines.find((l) => l.id === selectedBusWayLine);
    }
    return null;
  }, [selectedTramwayLine, selectedBusWayLine]);

  // Get active proximity point data
  const activeProximityData = useMemo(() => {
    const result = [];
    if (activeProximityPoints.bus) {
      const busData = proximityPoints.find((p) => p.transportType === "bus");
      if (busData) result.push(busData);
    }
    if (activeProximityPoints.taxi_rouge) {
      const taxiRedData = proximityPoints.find(
        (p) => p.transportType === "taxi_rouge"
      );
      if (taxiRedData) result.push(taxiRedData);
    }
    if (activeProximityPoints.taxi_blanc) {
      const taxiWhiteData = proximityPoints.find(
        (p) => p.transportType === "taxi_blanc"
      );
      if (taxiWhiteData) result.push(taxiWhiteData);
    }
    return result;
  }, [activeProximityPoints]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-border/30 shadow-lg">
      <MapContainer
        center={casablancaCenter}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        className="transport-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapBounds
          selectedTramwayLine={selectedTramwayLine}
          selectedBusWayLine={selectedBusWayLine}
          activeProximityPoints={activeProximityPoints}
        />

        {/* Render selected line */}
        {selectedLine && (
          <>
            {/* Draw route polyline */}
            <Polyline
              positions={selectedLine.route.map((c) => [c.lat, c.lng])}
              color={selectedLine.color}
              weight={selectedLine.transportType === "tramway" ? 4 : 3}
              opacity={0.9}
              dashArray={selectedLine.transportType === "busway" ? undefined : undefined}
            />

            {/* Draw stations as circles */}
            {selectedLine.stations.map((station, idx) => (
              <CircleMarker
                key={`${selectedLine.id}-station-${idx}`}
                center={[station.lat, station.lng]}
                radius={selectedLine.transportType === "tramway" ? 7 : 6}
                fillColor={selectedLine.color}
                color="#fff"
                weight={2}
                opacity={1}
                fillOpacity={0.9}
                eventHandlers={{
                  click: () => {
                    onMarkerClick?.({
                      type: "station",
                      station,
                      line: selectedLine,
                    });
                  },
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold text-primary">{station.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedLine.lineCode} - {selectedLine.name}
                    </p>
                    {station.quartier && (
                      <p className="text-xs text-foreground/70">
                        📍 {station.quartier}
                      </p>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </>
        )}

        {/* Render proximity points */}
        {activeProximityData.map((proximitySet) =>
          proximitySet.points.map((point, idx) => (
            <CircleMarker
              key={`${proximitySet.id}-point-${idx}`}
              center={[point.lat, point.lng]}
              radius={5}
              fillColor={proximitySet.color}
              color="#fff"
              weight={2}
              opacity={1}
              fillOpacity={0.85}
              eventHandlers={{
                click: () => {
                  onMarkerClick?.({
                    type: "proximity",
                    point,
                    proximitySet,
                  });
                },
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold text-primary">{point.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {proximitySet.name}
                  </p>
                  {point.quartier && (
                    <p className="text-xs text-foreground/70">
                      📍 {point.quartier}
                    </p>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

export default TransportMap;
