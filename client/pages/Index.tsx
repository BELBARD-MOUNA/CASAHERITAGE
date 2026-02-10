import { Link } from "react-router-dom";
import { MapPin, Calendar, Sparkles, Users, Search, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  const features = [
    {
      icon: MapPin,
      title: "Patrimoine Architectural",
      description:
        "Découvrez les joyaux historiques et architecturaux de Casablanca",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Calendar,
      title: "Événements Culturels",
      description:
        "Restez informé des événements et manifestations culturelles",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Users,
      title: "Communauté",
      description:
        "Connectez-vous avec d'autres passionnés du patrimoine culturel",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: Search,
      title: "Exploration Interactive",
      description:
        "Explorez Casablanca via notre carte interactive et intuitive",
      color: "bg-primary/10 text-primary",
    },
  ];

  const stats = [
    { number: "50+", label: "Lieux Patrimoniaux" },
    { number: "100+", label: "Événements/Année" },
    { number: "5", label: "Quartiers Couverts" },
    { number: "3", label: "Langues" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20 sm:py-28 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold text-sm">
              <Sparkles size={16} />
              Bienvenue à Casa Heritage
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Valorisez le Patrimoine de{" "}
              <span className="text-accent">Casablanca</span>
            </h1>

            <p className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-2xl leading-relaxed">
              Explorez les richesses culturelles et architecturales de Casablanca. Découvrez le patrimoine, les événements
              culturels et connectez-vous avec une communauté passionnée.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/heritage"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 font-semibold"
              >
                Explorer le Patrimoine
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-all font-semibold"
              >
                Voir les Événements
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-4 flex gap-2">
              <input
                type="text"
                placeholder="Rechercher un lieu, un événement..."
                className="flex-1 px-4 py-2 outline-none text-foreground placeholder-muted-foreground"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Qu'est-ce que Casa Heritage?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Une plateforme complète dédiée à la valorisation du patrimoine matériel et immatériel
              de Casablanca
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-lg bg-white border border-border hover:shadow-lg transition-shadow group"
                >
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Explorez par Catégories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Architecture Coloniale",
                color: "bg-primary",
                icon: "🏛️",
              },
              { name: "Quartiers Historiques", color: "bg-secondary", icon: "🏘️" },
              {
                name: "Événements Culturels",
                color: "bg-accent",
                icon: "🎭",
              },
              {
                name: "Musées & Collections",
                color: "bg-primary",
                icon: "🖼️",
              },
              { name: "Traditions Marocaines", color: "bg-secondary", icon: "🎨" },
              { name: "Gastronomie Locale", color: "bg-accent", icon: "🍲" },
            ].map((category, index) => (
              <Link
                key={index}
                to="/heritage"
                className={`${category.color} text-primary-foreground p-8 rounded-lg text-center font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Ce que Nos Utilisateurs Pensent
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Casa Heritage m'a permis de redécouvrir ma propre ville sous un nouvel angle!",
                author: "Fatima M.",
                role: "Résidente, Casablanca",
              },
              {
                text: "Une ressource incroyable pour mes recherches sur l'histoire architecturale de Casablanca.",
                author: "Ahmed B.",
                role: "Chercheur, Université",
              },
              {
                text: "Parfait pour trouver les meilleurs événements culturels de la ville chaque semaine.",
                author: "Sarah L.",
                role: "Touriste, France",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground/80 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Explorer Casa Heritage?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Créez un compte gratuitement et commencez à découvrir, partager et conserver le patrimoine
            culturel de Casablanca
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 font-semibold"
            >
              Créer un Compte
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/heritage"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-semibold"
            >
              Continuer sans Compte
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
