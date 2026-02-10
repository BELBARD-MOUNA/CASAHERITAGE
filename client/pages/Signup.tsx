import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { signupSchema } from "@shared/auth";
import { UserPlus, AlertCircle, Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    try {
      // Validate form
      const result = signupSchema.safeParse({
        name,
        email,
        password,
        confirmPassword,
      });
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0]] = err.message;
          }
        });
        setFieldErrors(errors);
        return;
      }

      setIsLoading(true);
      await signup(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 md:py-28 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <UserPlus size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-primary">Créer un compte</h1>
                </div>
              </div>

              <p className="text-foreground/70 mb-8">
                Rejoignez la communauté Casa Heritage et commencez à explorer!
              </p>

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
                  <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors outline-none ${
                      fieldErrors.name
                        ? "border-destructive bg-destructive/5"
                        : "border-border hover:border-foreground/30 focus:border-primary"
                    }`}
                    placeholder="Votre nom"
                    disabled={isLoading}
                  />
                  {fieldErrors.name && (
                    <p className="text-sm text-destructive mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors outline-none ${
                      fieldErrors.email
                        ? "border-destructive bg-destructive/5"
                        : "border-border hover:border-foreground/30 focus:border-primary"
                    }`}
                    placeholder="votre@email.com"
                    disabled={isLoading}
                  />
                  {fieldErrors.email && (
                    <p className="text-sm text-destructive mt-1">{fieldErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors outline-none ${
                      fieldErrors.password
                        ? "border-destructive bg-destructive/5"
                        : "border-border hover:border-foreground/30 focus:border-primary"
                    }`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  {fieldErrors.password && (
                    <p className="text-sm text-destructive mt-1">{fieldErrors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors outline-none ${
                      fieldErrors.confirmPassword
                        ? "border-destructive bg-destructive/5"
                        : "border-border hover:border-foreground/30 focus:border-primary"
                    }`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">{fieldErrors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-secondary text-primary-foreground rounded-lg hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Créer un compte
                    </>
                  )}
                </button>
              </form>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-muted-foreground">ou</span>
                </div>
              </div>

              <Link
                to="/"
                className="w-full px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-semibold text-center block"
              >
                Continuer sans compte
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
