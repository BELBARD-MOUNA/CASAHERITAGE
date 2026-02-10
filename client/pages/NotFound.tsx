import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-20 md:py-28 flex-1">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-96">
          <div className="text-center max-w-md">
            <h1 className="text-6xl md:text-7xl font-bold text-accent mb-4 font-poppins">404</h1>
            <p className="text-2xl font-semibold text-primary mb-4 font-poppins">Page non trouvée</p>
            <p className="text-foreground/70 mb-8">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
            >
              Retour à l'accueil
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
