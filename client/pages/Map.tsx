import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const Map = () => {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Carte Interactive
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Explorez Casablanca via notre carte interactive. Localisez facilement les lieux patrimoniaux
              et les événements culturels près de vous.
            </p>

            <div className="bg-primary/10 rounded-lg p-8 border border-primary/20 mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Fonctionnalités à venir:
              </h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Carte interactive Google Maps
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Marqueurs pour lieux patrimoniaux
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Affichage des événements par localisation
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Itinéraires et directions
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Filtrage par quartier
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Retour à l'accueil
              </Link>
              <Link
                to="/heritage"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-semibold"
              >
                Voir le Patrimoine
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Map;
