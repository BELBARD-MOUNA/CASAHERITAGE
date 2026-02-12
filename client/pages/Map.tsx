import { useState } from "react";
import Layout from "@/components/Layout";
import TransportMap from "@/components/TransportMap";
import TransportFilters from "@/components/TransportFilters";
import TransportInfo from "@/components/TransportInfo";
import { TransportLine } from "@/data/transport";

const Map = () => {
  const [activeTransports, setActiveTransports] = useState({
    tramway: true,
    busway: true,
    bus: true,
    taxi_rouge: true,
    taxi_blanc: true,
  });

  const [selectedInfo, setSelectedInfo] = useState<{
    line: TransportLine | null;
    station: any | null;
  }>({
    line: null,
    station: null,
  });

  const handleToggleTransport = (
    type: keyof typeof activeTransports
  ) => {
    setActiveTransports((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleMarkerClick = (data: any) => {
    setSelectedInfo({
      line: data.line || null,
      station: data || null,
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-poppins">
              Carte Interactive de Casablanca
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Explorez les moyens de transport de Casablanca. Tramways, bus, taxis et plus encore!
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
                activeTransports={activeTransports}
                onToggle={handleToggleTransport}
              />
            </div>

            {/* Main Map */}
            <div className="lg:col-span-3">
              <div className="h-96 md:h-[600px] mb-6">
                <TransportMap
                  activeTransports={activeTransports}
                  onMarkerClick={handleMarkerClick}
                />
              </div>

              {/* Info Panel */}
              <div className="mt-6">
                <TransportInfo
                  line={selectedInfo.line}
                  station={selectedInfo.station}
                  onClose={() =>
                    setSelectedInfo({
                      line: null,
                      station: null,
                    })
                  }
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
                  "Le tramway de Casablanca offre un système de transport rapide et moderne avec 4 lignes principales reliant les quartiers clés.",
              },
              {
                icon: "🚌",
                title: "Busway",
                description:
                  "Lignes de bus rapides et fiables assurant les liaisons principales entre les zones urbaines de la ville.",
              },
              {
                icon: "🚌",
                title: "Bus Urbain",
                description:
                  "Réseau complet de bus desservant tous les quartiers de Casablanca avec des tarifs accessibles.",
              },
              {
                icon: "🚕",
                title: "Taxi Rouge",
                description:
                  "Taxis collectifs assurant les déplacements locaux à l'intérieur de Casablanca avec des tarifs raisonnables.",
              },
              {
                icon: "🚖",
                title: "Taxi Blanc",
                description:
                  "Transport interurbain reliant Casablanca aux villes voisines (Rabat, Fez, Marrakech, etc.).",
              },
              {
                icon: "🚂",
                title: "Train (ONCF)",
                description:
                  "Liaisons ferroviaires reliant Casablanca à d'autres villes du Maroc avec confort et efficacité.",
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
              💡 Conseils de Navigation
            </h2>
            <ul className="space-y-4 text-foreground/80">
              <li className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span>
                  Utilisez les filtres pour afficher/masquer les moyens de transport
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span>
                  Cliquez sur une station pour voir les détails (quartier, horaires)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span>
                  Les couleurs des lignes correspondent aux différents types de transport
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span>
                  Zoomez/dézoomez avec la molette de la souris pour explorer la carte
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
