import { X, Clock, MapPin, Zap } from "lucide-react";
import { TransportLine, ProximityPoint, PointsOfProximity } from "@/data/transport";

interface TransportInfoProps {
  data: {
    type: "station" | "proximity" | null;
    station?: any;
    line?: TransportLine;
    point?: ProximityPoint;
    proximitySet?: PointsOfProximity;
  } | null;
  onClose: () => void;
}

const TransportInfo = ({ data, onClose }: TransportInfoProps) => {
  if (!data || data.type === null) {
    return (
      <div className="bg-white rounded-2xl border border-border/30 p-8 text-center">
        <p className="text-foreground/70 font-medium">
          📍 Cliquez sur une station ou un point pour voir les détails
        </p>
      </div>
    );
  }

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case "tramway":
        return "🚊";
      case "busway":
        return "🚌";
      case "bus":
        return "🚌";
      case "taxi_rouge":
        return "🚕";
      case "taxi_blanc":
        return "🚖";
      default:
        return "🚗";
    }
  };

  // Station on a line
  if (data.type === "station" && data.station && data.line) {
    const station = data.station;
    const line = data.line;

    return (
      <div className="bg-white rounded-2xl border border-border/30 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <X size={20} className="text-foreground/70" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{getTypeEmoji(line.transportType)}</span>
            <div>
              <h3 className="text-xl font-bold text-primary font-poppins">
                {station.name}
              </h3>
              <p className="text-sm text-secondary font-semibold">
                {line.lineCode} - {line.name}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {station.quartier && (
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Quartier</p>
                <p className="font-semibold text-foreground">
                  {station.quartier}
                </p>
              </div>
            </div>
          )}

          {line.horaires && (
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Horaires</p>
                <p className="text-sm font-semibold text-foreground">
                  {line.horaires}
                </p>
              </div>
            </div>
          )}

          {line.description && (
            <div className="flex items-start gap-3">
              <Zap size={20} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-sm font-semibold text-foreground">
                  {line.description}
                </p>
              </div>
            </div>
          )}

          {line.quartiers && line.quartiers.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Quartiers desservis
              </p>
              <div className="flex flex-wrap gap-2">
                {line.quartiers.map((q) => (
                  <span
                    key={q}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-border/30">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-colors font-semibold"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Proximity point (bus, taxi)
  if (data.type === "proximity" && data.point && data.proximitySet) {
    const point = data.point;
    const proximitySet = data.proximitySet;

    return (
      <div className="bg-white rounded-2xl border border-border/30 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <X size={20} className="text-foreground/70" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{getTypeEmoji(proximitySet.transportType)}</span>
            <div>
              <h3 className="text-xl font-bold text-primary font-poppins">
                {point.name}
              </h3>
              <p className="text-sm text-secondary font-semibold">
                {proximitySet.name}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {point.quartier && (
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Quartier</p>
                <p className="font-semibold text-foreground">
                  {point.quartier}
                </p>
              </div>
            </div>
          )}

          {proximitySet.horaires && (
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Horaires</p>
                <p className="text-sm font-semibold text-foreground">
                  {proximitySet.horaires}
                </p>
              </div>
            </div>
          )}

          {proximitySet.description && (
            <div className="flex items-start gap-3">
              <Zap size={20} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">À propos</p>
                <p className="text-sm font-semibold text-foreground">
                  {proximitySet.description}
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-border/30">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-colors font-semibold"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TransportInfo;
