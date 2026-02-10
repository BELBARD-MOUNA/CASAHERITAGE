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
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Calendar,
      title: "Événements Culturels",
      description:
        "Restez informé des événements et manifestations culturelles",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: Users,
      title: "Communauté",
      description:
        "Connectez-vous avec d'autres passionnés du patrimoine culturel",
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
    },
    {
      icon: Search,
      title: "Exploration Interactive",
      description:
        "Explorez Casablanca via notre carte interactive et intuitive",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
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
      {/* Hero Section with Modern Gradient */}
      <section className="relative overflow-hidden py-20 sm:py-28 md:py-32" style={{background: "linear-gradient(135deg, hsl(172, 81%, 28%) 0%, hsl(204, 93%, 56%) 100%)"}}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute bottom-0 -left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm">
              <Sparkles size={16} />
              Bienvenue à Casa Heritage
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Valorisez le Patrimoine de{" "}
              <span className="text-accent">Casablanca</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Explorez les richesses culturelles et architecturales de Casablanca. Découvrez le patrimoine, les événements
              culturels et connectez-vous avec une communauté passionnée.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/heritage"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
              >
                Explorer le Patrimoine
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 font-semibold"
              >
                Voir les Événements
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-xl p-1 flex gap-1 backdrop-blur-sm">
              <input
                type="text"
                placeholder="Rechercher un lieu, un événement..."
                className="flex-1 px-4 py-3 outline-none text-foreground placeholder-muted-foreground bg-transparent"
              />
              <button className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-300 font-semibold">
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
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <div className="text-3xl md:text-4xl font-bold mb-2 font-poppins">{stat.number}</div>
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
                  className="p-8 rounded-xl bg-white border border-border/30 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group card-hover"
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feature.bgColor} ${feature.iconColor}`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 font-poppins">
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
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-poppins">
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
                className={`${category.color} text-primary-foreground p-8 rounded-xl text-center font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer btn-hover-scale`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <p className="font-poppins">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-poppins">
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
                className="p-8 bg-white rounded-xl border border-border/30 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 card-hover"
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
                  <p className="font-semibold text-primary font-poppins">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 text-white relative overflow-hidden" style={{background: "linear-gradient(135deg, hsl(172, 81%, 28%) 0%, hsl(204, 93%, 56%) 100%)"}}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
            Prêt à Explorer Casa Heritage?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Créez un compte gratuitement et commencez à découvrir, partager et conserver le patrimoine
            culturel de Casablanca
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
            >
              Créer un Compte
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/heritage"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 font-semibold"
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
