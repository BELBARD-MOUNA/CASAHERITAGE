import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const Events = () => {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-poppins">
              Événements Culturels
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Explorez tous les événements culturels de Casablanca. Restez à jour avec les manifestations,
              festivals, et activités culturelles de la ville.
            </p>

            <div className="bg-secondary/10 rounded-xl p-8 border border-secondary/20 mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4 font-poppins">
                Fonctionnalités à venir:
              </h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  Calendrier interactif des événements
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  Filtrage par date, quartier et catégorie
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  Informations détaillées par événement
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  Formulaire de soumission pour organisateurs
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  Système de notifications et favoris
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
                to="/map"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all duration-300 font-semibold"
              >
                Voir la Carte
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
