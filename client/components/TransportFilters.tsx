import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { tramwayLines, busWayLines } from "@/data/transport";

interface TransportFiltersProps {
  selectedTramwayLine: string | null;
  selectedBusWayLine: string | null;
  activeProximityPoints: {
    bus: boolean;
    taxi_rouge: boolean;
    taxi_blanc: boolean;
  };
  onSelectTramwayLine: (lineId: string | null) => void;
  onSelectBusWayLine: (lineId: string | null) => void;
  onToggleProximityPoint: (type: "bus" | "taxi_rouge" | "taxi_blanc") => void;
  onReset: () => void;
}

const TransportFilters = ({
  selectedTramwayLine,
  selectedBusWayLine,
  activeProximityPoints,
  onSelectTramwayLine,
  onSelectBusWayLine,
  onToggleProximityPoint,
  onReset,
}: TransportFiltersProps) => {
  return (
    <div className="bg-white rounded-2xl border border-border/30 p-6 shadow-lg h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-primary font-poppins">
          🗺️ Sélection
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Réinitialiser
        </Button>
      </div>

      {/* Tramway Section */}
      <div className="mb-8">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="text-xl">🚊</span>
          Tramway
        </h4>
        <RadioGroup
          value={selectedTramwayLine || ""}
          onValueChange={(value) =>
            onSelectTramwayLine(value ? value : null)
          }
          className="space-y-3 ml-2"
        >
          {tramwayLines.map((line) => (
            <div key={line.id} className="flex items-start gap-3">
              <RadioGroupItem
                value={line.id}
                id={line.id}
                className="mt-0.5"
              />
              <Label
                htmlFor={line.id}
                className="cursor-pointer flex flex-col"
              >
                <span className="font-semibold text-foreground">
                  ⭕ {line.lineCode}
                </span>
                <span className="text-xs text-muted-foreground">
                  {line.quartiers?.join(", ")}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Busway Section */}
      <div className="mb-8">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="text-xl">🚌</span>
          Busway
        </h4>
        <RadioGroup
          value={selectedBusWayLine || ""}
          onValueChange={(value) =>
            onSelectBusWayLine(value ? value : null)
          }
          className="space-y-3 ml-2"
        >
          {busWayLines.map((line) => (
            <div key={line.id} className="flex items-start gap-3">
              <RadioGroupItem
                value={line.id}
                id={line.id}
                className="mt-0.5"
              />
              <Label
                htmlFor={line.id}
                className="cursor-pointer flex flex-col"
              >
                <span className="font-semibold text-foreground">
                  ⭕ {line.lineCode}
                </span>
                <span className="text-xs text-muted-foreground">
                  {line.quartiers?.join(", ")}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Proximity Points Section */}
      <div className="mb-8 pt-6 border-t border-border/50">
        <h4 className="font-semibold text-foreground mb-4">
          📍 Points de Proximité
        </h4>
        <div className="space-y-3 ml-2">
          {/* Bus Urbain */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="bus"
              checked={activeProximityPoints.bus}
              onCheckedChange={() => onToggleProximityPoint("bus")}
              className="mt-1"
            />
            <Label htmlFor="bus" className="cursor-pointer flex flex-col">
              <span className="font-semibold text-foreground">
                ☑ Bus Urbain
              </span>
              <span className="text-xs text-muted-foreground">
                Réseau local complet
              </span>
            </Label>
          </div>

          {/* Taxi Rouge */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="taxi_rouge"
              checked={activeProximityPoints.taxi_rouge}
              onCheckedChange={() => onToggleProximityPoint("taxi_rouge")}
              className="mt-1"
            />
            <Label
              htmlFor="taxi_rouge"
              className="cursor-pointer flex flex-col"
            >
              <span className="font-semibold text-foreground">
                ☑ Taxi Rouge
              </span>
              <span className="text-xs text-muted-foreground">
                Intra-urbain
              </span>
            </Label>
          </div>

          {/* Taxi Blanc */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="taxi_blanc"
              checked={activeProximityPoints.taxi_blanc}
              onCheckedChange={() => onToggleProximityPoint("taxi_blanc")}
              className="mt-1"
            />
            <Label
              htmlFor="taxi_blanc"
              className="cursor-pointer flex flex-col"
            >
              <span className="font-semibold text-foreground">
                ☑ Taxi Blanc
              </span>
              <span className="text-xs text-muted-foreground">
                Interurbain
              </span>
            </Label>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="pt-6 border-t border-border/50">
        <p className="text-xs font-bold text-primary mb-4 uppercase font-poppins">
          📋 Légende
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1.5 bg-red-500 rounded"></div>
            <span className="text-foreground/70">Tramway (épais)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-green-500 rounded"></div>
            <span className="text-foreground/70">Busway (moyen)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 border border-amber-500"></div>
            <span className="text-foreground/70">Points Bus Urbain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600 border border-red-600"></div>
            <span className="text-foreground/70">Stations Taxi Rouge</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full border-2 border-gray-400"
              style={{ borderStyle: "dashed" }}
            ></div>
            <span className="text-foreground/70">Points Taxi Blanc</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 p-3 bg-primary/10 rounded-lg">
        <p className="text-xs text-foreground/70 leading-relaxed">
          <strong>💡 Tip:</strong> Sélectionnez une ligne (Tramway ou Busway) OU des points de proximité. La carte
          affichera uniquement votre sélection.
        </p>
      </div>
    </div>
  );
};

export default TransportFilters;
