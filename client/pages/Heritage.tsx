import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const Heritage = () => {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-poppins">
              Patrimoine Architectural
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Découvrez les lieux patrimoniaux de Casablanca. Cette page sera bientôt enrichie avec une
              galerie complète, les détails des sites historiques, et une carte interactive.
            </p>

            <div className="bg-primary/10 rounded-xl p-8 border border-primary/20 mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Fonctionnalités à venir:
              </h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Galerie complète des lieux patrimoniaux
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Détails historiques et architecturaux
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Photos haute résolution
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Horaires d'ouverture et accès
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Commentaires et avis utilisateurs
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
              >
                Retour à l'accueil
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all duration-300 font-semibold"
              >
                Voir les Événements
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Heritage;
