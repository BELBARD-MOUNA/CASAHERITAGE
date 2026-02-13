import { useState } from "react";
import Layout from "@/components/Layout";
import TransportMap from "@/components/TransportMap";
import TransportFilters from "@/components/TransportFilters";
import TransportInfo from "@/components/TransportInfo";

const Map = () => {
  const [selectedTramwayLine, setSelectedTramwayLine] = useState<string | null>(
    null
  );
  const [selectedBusWayLine, setSelectedBusWayLine] = useState<string | null>(
    null
  );
  const [activeProximityPoints, setActiveProximityPoints] = useState({
    bus: false,
    taxi_rouge: false,
    taxi_blanc: false,
  });

  const [selectedInfo, setSelectedInfo] = useState<{
    type: "station" | "proximity" | null;
    station?: any;
    line?: any;
    point?: any;
    proximitySet?: any;
  } | null>(null);

  const handleSelectTramwayLine = (lineId: string | null) => {
    setSelectedTramwayLine(lineId);
    // Clear busway when selecting tramway
    if (lineId) {
      setSelectedBusWayLine(null);
    }
  };

  const handleSelectBusWayLine = (lineId: string | null) => {
    setSelectedBusWayLine(lineId);
    // Clear tramway when selecting busway
    if (lineId) {
      setSelectedTramwayLine(null);
    }
  };

  const handleToggleProximityPoint = (type: "bus" | "taxi_rouge" | "taxi_blanc") => {
    setActiveProximityPoints((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleReset = () => {
    setSelectedTramwayLine(null);
    setSelectedBusWayLine(null);
    setActiveProximityPoints({
      bus: false,
      taxi_rouge: false,
      taxi_blanc: false,
    });
    setSelectedInfo(null);
  };

  const handleMarkerClick = (data: any) => {
    setSelectedInfo(data);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-poppins">
              🗺️ Carte Interactive de Casablanca
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Explorez les moyens de transport. Sélectionnez une ligne ou des points de proximité pour naviguer la ville.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <TransportFilters
                selectedTramwayLine={selectedTramwayLine}
                selectedBusWayLine={selectedBusWayLine}
                activeProximityPoints={activeProximityPoints}
                onSelectTramwayLine={handleSelectTramwayLine}
                onSelectBusWayLine={handleSelectBusWayLine}
                onToggleProximityPoint={handleToggleProximityPoint}
                onReset={handleReset}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Map */}
              <div className="h-96 md:h-[600px] mb-6">
                <TransportMap
                  selectedTramwayLine={selectedTramwayLine}
                  selectedBusWayLine={selectedBusWayLine}
                  activeProximityPoints={activeProximityPoints}
                  onMarkerClick={handleMarkerClick}
                />
              </div>

              {/* Info Panel */}
              <div className="mt-6">
                <TransportInfo
                  data={selectedInfo}
                  onClose={() => setSelectedInfo(null)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center font-poppins">
            À Propos des Transports à Casablanca
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🚊",
                title: "Tramway",
                description:
                  "4 lignes principales (T1, T2, T3, T4) reliant les quartiers clés avec un service fréquent.",
              },
              {
                icon: "🚌",
                title: "Busway",
                description:
                  "2 lignes rapides (BW1, BW2) assurant les liaisons principales entre zones urbaines.",
              },
              {
                icon: "🚌",
                title: "Bus Urbain",
                description:
                  "Réseau complet desservant tous les quartiers avec des tarifs accessibles.",
              },
              {
                icon: "🚕",
                title: "Taxi Rouge",
                description:
                  "Taxis collectifs pour les déplacements intra-urbains rapides et économiques.",
              },
              {
                icon: "🚖",
                title: "Taxi Blanc",
                description:
                  "Transport interurbain vers Rabat, Fez, Marrakech et autres villes voisines.",
              },
              {
                icon: "🚂",
                title: "Train (ONCF)",
                description:
                  "Liaisons ferroviaires confortables vers les principales villes du Maroc.",
              },
            ].map((transport, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-border/30 hover:shadow-lg transition-shadow"
              >
                <p className="text-4xl mb-4">{transport.icon}</p>
                <h3 className="text-xl font-bold text-primary mb-3 font-poppins">
                  {transport.title}
                </h3>
                <p className="text-foreground/70">{transport.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-secondary/10 rounded-2xl p-8 md:p-12 border border-secondary/20">
            <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">
              💡 Guide d'Utilisation
            </h2>
            <ul className="space-y-4 text-foreground/80">
              <li className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span>
                  <strong>Sélectionner une ligne:</strong> Cliquez sur T1, T2, BW1, etc. Une seule ligne s'affiche à la fois
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span>
                  <strong>Ajouter des points:</strong> Cochez les cases pour afficher Bus, Taxis Rouges ou Blancs
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span>
                  <strong>Cliquer sur la carte:</strong> Sélectionnez une station ou un point pour voir les détails
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span>
                  <strong>Auto-zoom:</strong> La carte se centre automatiquement sur votre sélection
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span>
                  <strong>Réinitialiser:</strong> Cliquez sur "Réinitialiser" pour tout effacer et recommencer
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Map;
