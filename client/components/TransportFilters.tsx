import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TransportFiltersProps {
  activeTransports: {
    tramway: boolean;
    busway: boolean;
    bus: boolean;
    taxi_rouge: boolean;
    taxi_blanc: boolean;
  };
  onToggle: (type: keyof typeof activeTransports) => void;
}

const TransportFilters = ({ activeTransports, onToggle }: TransportFiltersProps) => {
  const filters = [
    {
      id: "tramway",
      label: "🚊 Tramway",
      description: "Lignes T1, T2, T3, T4",
      color: "text-red-500",
    },
    {
      id: "busway",
      label: "🚌 Busway",
      description: "Lignes rapides BW",
      color: "text-green-500",
    },
    {
      id: "bus",
      label: "🚌 Bus Urbain",
      description: "Réseaux locaux",
      color: "text-amber-500",
    },
    {
      id: "taxi_rouge",
      label: "🚕 Taxi Rouge",
      description: "Intra-urbain",
      color: "text-red-600",
    },
    {
      id: "taxi_blanc",
      label: "🚖 Taxi Blanc",
      description: "Interurbain",
      color: "text-gray-400",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-border/30 p-6 shadow-lg">
      <h3 className="text-lg font-bold text-primary mb-6 font-poppins">
        Moyens de Transport
      </h3>

      <div className="space-y-4">
        {filters.map((filter) => (
          <div key={filter.id} className="flex items-start gap-3">
            <Checkbox
              id={filter.id}
              checked={activeTransports[filter.id as keyof typeof activeTransports]}
              onCheckedChange={() => onToggle(filter.id as keyof typeof activeTransports)}
              className="mt-1"
            />
            <div className="flex-1 cursor-pointer" onClick={() => onToggle(filter.id as keyof typeof activeTransports)}>
              <Label
                htmlFor={filter.id}
                className="text-base font-semibold text-foreground cursor-pointer"
              >
                {filter.label}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {filter.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <p className="text-xs font-bold text-primary mb-4 uppercase font-poppins">
          Légende
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-red-500"></div>
            <span className="text-foreground/70">Tramway (4px)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-green-500"></div>
            <span className="text-foreground/70">Busway (3px)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-amber-500"></div>
            <span className="text-foreground/70">Bus urbain (2px)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600 border border-red-600"></div>
            <span className="text-foreground/70">Gares taxi rouge</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400 border border-gray-400" style={{borderStyle: 'dashed'}}></div>
            <span className="text-foreground/70">Taxi blanc (pointillé)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportFilters;
