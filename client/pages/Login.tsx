import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@shared/auth";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    try {
      // Validate form
      const result = loginSchema.safeParse({ email, password });
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
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 md:py-28 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <LogIn size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-primary font-poppins">Se connecter</h1>
                </div>
              </div>

              <p className="text-foreground/70 mb-8">
                Connectez-vous à votre compte Casa Heritage
              </p>

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl flex gap-3">
                  <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
                      fieldErrors.email
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-white hover:border-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10"
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
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
                      fieldErrors.password
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-white hover:border-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    }`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  {fieldErrors.password && (
                    <p className="text-sm text-destructive mt-1">{fieldErrors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Se connecter
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
                className="w-full px-6 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all duration-300 font-semibold text-center block"
              >
                Continuer sans compte
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
