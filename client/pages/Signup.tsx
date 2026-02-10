import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Signup = () => {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-border">
              <h1 className="text-3xl font-bold text-primary mb-2">Créer un compte</h1>
              <p className="text-foreground/70 mb-8">
                Rejoignez la communauté Casa Heritage et commencez à explorer!
              </p>

              <div className="bg-secondary/10 rounded-lg p-6 border border-secondary/20 mb-8">
                <p className="text-sm text-foreground/80">
                  Le formulaire d'inscription avec authentification JWT sera bientôt implémenté.
                </p>
                <p className="text-sm text-foreground/80 mt-3">
                  Vous pourrez créer un compte utilisateur, organisateur, ou administrateur selon vos besoins.
                </p>
              </div>

              <Link
                to="/"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-center block"
              >
                Retour à l'accueil
              </Link>

              <div className="mt-6 text-center text-sm text-foreground/70">
                Déjà un compte?{" "}
                <Link to="/login" className="text-primary hover:underline font-semibold">
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
