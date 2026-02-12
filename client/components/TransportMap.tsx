import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Polyline, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";
import { transportData } from "@/data/transport";
import "./TransportMap.css";

interface TransportMapProps {
  activeTransports: {
    tramway: boolean;
    busway: boolean;
    bus: boolean;
    taxi_rouge: boolean;
    taxi_blanc: boolean;
  };
  onMarkerClick?: (station: any) => void;
}

const TransportMap = ({ activeTransports, onMarkerClick }: TransportMapProps) => {
  const [selectedStation, setSelectedStation] = useState<any>(null);

  // Filter transport lines based on active filters
  const filteredTransport = useMemo(() => {
    return transportData.filter((line) => activeTransports[line.type]);
  }, [activeTransports]);

  // Center coordinates for Casablanca
  const casablancaCenter: [number, number] = [33.5731, -7.5898];

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

        {/* Render all transport lines and stations */}
        {filteredTransport.map((line) =>
          line.routes.map((route, routeIdx) => (
            <div key={`${line.id}-${routeIdx}`}>
              {/* Draw route polyline */}
              <Polyline
                positions={route.coordinates.map((c) => [c.lat, c.lng])}
                color={line.color}
                weight={
                  line.type === "tramway" ? 4 : line.type === "busway" ? 3 : 2
                }
                opacity={0.8}
                dashArray={line.type === "taxi_blanc" ? "5, 5" : undefined}
              />

              {/* Draw stations as circles */}
              {route.stations.map((station, stationIdx) => (
                <CircleMarker
                  key={`${line.id}-${routeIdx}-${stationIdx}`}
                  center={[station.lat, station.lng]}
                  radius={
                    line.type === "tramway"
                      ? 6
                      : line.type === "busway"
                      ? 5
                      : 4
                  }
                  fillColor={line.color}
                  color={line.color}
                  weight={2}
                  opacity={1}
                  fillOpacity={0.8}
                  eventHandlers={{
                    click: () => {
                      setSelectedStation({ ...station, line, type: line.type });
                      onMarkerClick?.({ ...station, line, type: line.type });
                    },
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-bold text-primary">{station.name}</p>
                      <p className="text-xs text-muted-foreground">{line.name}</p>
                      {station.quartier && (
                        <p className="text-xs text-foreground/70">
                          📍 {station.quartier}
                        </p>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </div>
          ))
        )}
      </MapContainer>
    </div>
  );
};

export default TransportMap;
