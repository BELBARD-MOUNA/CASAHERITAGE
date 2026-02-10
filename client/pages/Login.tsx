import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Login = () => {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-border">
              <h1 className="text-3xl font-bold text-primary mb-2">Se connecter</h1>
              <p className="text-foreground/70 mb-8">
                Cette page sera bientôt disponible. Connectez-vous à votre compte Casa Heritage.
              </p>

              <div className="bg-accent/10 rounded-lg p-6 border border-accent/20 mb-8">
                <p className="text-sm text-foreground/80">
                  Le formulaire de connexion avec authentification JWT sera bientôt implémenté.
                </p>
              </div>

              <Link
                to="/"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-center block"
              >
                Retour à l'accueil
              </Link>

              <div className="mt-6 text-center text-sm text-foreground/70">
                Pas de compte?{" "}
                <Link to="/signup" className="text-primary hover:underline font-semibold">
                  S'inscrire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
