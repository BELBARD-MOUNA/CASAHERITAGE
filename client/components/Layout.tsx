import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/heritage", label: "Patrimoine" },
    { href: "/events", label: "Événements" },
    { href: "/map", label: "Carte" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">CH</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary">Casa Heritage</h1>
                <p className="text-xs text-muted-foreground">Casablanca</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium text-sm"
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-4 pl-4 border-l border-border">
                  <div className="text-right">
                    <p className="font-medium text-sm text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors font-medium text-sm flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Déconnecter
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  Se connecter
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-border space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && user ? (
                <>
                  <div className="py-2 border-t border-border mt-2 pt-2">
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Déconnecter
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-center mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Se connecter
                </Link>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Casa Heritage</h3>
              <p className="text-sm opacity-90">
                Valoriser le patrimoine et les événements culturels de Casablanca
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Explorez</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/heritage" className="opacity-90 hover:opacity-100">
                    Patrimoine
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="opacity-90 hover:opacity-100">
                    Événements
                  </Link>
                </li>
                <li>
                  <Link to="/map" className="opacity-90 hover:opacity-100">
                    Carte
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Compte</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/login" className="opacity-90 hover:opacity-100">
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="opacity-90 hover:opacity-100">
                    Inscription
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>Email: info@casaheritage.ma</li>
                <li>Casablanca, Maroc</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2024 Casa Heritage. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
