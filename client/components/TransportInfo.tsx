import { X, Clock, MapPin, Zap } from "lucide-react";
import { TransportLine } from "@/data/transport";

interface TransportInfoProps {
  line: TransportLine | null;
  station: any | null;
  onClose: () => void;
}

const TransportInfo = ({ line, station, onClose }: TransportInfoProps) => {
  if (!line && !station) {
    return (
      <div className="bg-white rounded-2xl border border-border/30 p-8 text-center">
        <p className="text-foreground/70">
          Cliquez sur une station ou une ligne pour voir les détails
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "tramway":
        return "Tramway";
      case "busway":
        return "Busway";
      case "bus":
        return "Bus Urbain";
      case "taxi_rouge":
        return "Taxi Rouge";
      case "taxi_blanc":
        return "Taxi Blanc";
      default:
        return type;
    }
  };

  if (station && line) {
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
            <span className="text-3xl">{getTypeEmoji(line.type)}</span>
            <div>
              <h3 className="text-xl font-bold text-primary font-poppins">
                {station.name}
              </h3>
              <p className="text-sm text-secondary font-semibold">
                {line.name}
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
                <p className="font-semibold text-foreground">
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
                <p className="font-semibold text-foreground">
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
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
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

  if (line && !station) {
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
            <span className="text-3xl">{getTypeEmoji(line.type)}</span>
            <div>
              <h3 className="text-xl font-bold text-primary font-poppins">
                {line.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getTypeLabel(line.type)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Zap size={20} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">À propos</p>
              <p className="font-semibold text-foreground">{line.description}</p>
            </div>
          </div>

          {line.horaires && (
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Horaires</p>
                <p className="font-semibold text-foreground">
                  {line.horaires}
                </p>
              </div>
            </div>
          )}

          {line.quartiers && line.quartiers.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Zones couvertes
              </p>
              <div className="flex flex-wrap gap-2">
                {line.quartiers.map((q) => (
                  <span
                    key={q}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          )}

          {line.routes && line.routes.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Stations ({line.routes[0].stations.length})
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {line.routes[0].stations.map((station: any, idx: number) => (
                  <div
                    key={idx}
                    className="text-sm py-1 px-2 bg-muted/50 rounded hover:bg-muted transition-colors"
                  >
                    {station.name}
                    {station.quartier && (
                      <span className="text-xs text-muted-foreground ml-2">
                        ({station.quartier})
                      </span>
                    )}
                  </div>
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

  return null;
};

export default TransportInfo;
