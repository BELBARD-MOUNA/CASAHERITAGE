import Layout from "@/components/Layout";
import HeritageStoryCard from "@/components/HeritageStoryCard";

const Heritage = () => {
  // Sample heritage sites data
  const heritageSites = [
    {
      id: "1",
      name: "Mosquée Hassan II",
      image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop",
      story: "Symbole spirituel et architectural dominant l'océan Atlantique. Un chef-d'œuvre de l'architecture moderne marocaine avec ses 210 mètres de minaret.",
      quartier: "Ain Diab",
      coordinates: { lat: 33.6084, lng: -7.6326 },
    },
    {
      id: "2",
      name: "Cathédrale du Sacré-Cœur",
      image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=800&h=600&fit=crop",
      story: "Monument religieux emblématique de l'époque coloniale française. Son architecture Art Déco représente l'héritage architectural européen de Casablanca.",
      quartier: "Ville Nouvelle",
      coordinates: { lat: 33.573, lng: -7.5898 },
    },
    {
      id: "3",
      name: "Palais Royal",
      image: "https://images.unsplash.com/photo-1577720643272-265fff1fe52e?w=800&h=600&fit=crop",
      story: "Résidence royale majestueuse avec ses jardins pittoresques. Exemple remarquable de l'architecture palatiale marocaine traditionnelle et moderne.",
      quartier: "Polo",
      coordinates: { lat: 33.5842, lng: -7.6547 },
    },
    {
      id: "4",
      name: "Médina de Casablanca",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      story: "Vieille ville pittoresque avec ses ruelles étroites et architecture traditionnelle. Cœur vivant du patrimoine urbain casablancais.",
      quartier: "Médina",
      coordinates: { lat: 33.5711, lng: -7.5898 },
    },
    {
      id: "5",
      name: "Port de Casablanca",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      story: "Port commercial majeur avec ses installations modernes. Symbole de l'importance économique et maritime de Casablanca.",
      quartier: "Port",
      coordinates: { lat: 33.5672, lng: -7.5897 },
    },
    {
      id: "6",
      name: "Villa Royale",
      image: "https://images.unsplash.com/photo-1513489409461-a62f6a844b20?w=800&h=600&fit=crop",
      story: "Propriété historique avec architecture éclectique. Représente le luxe et le raffinement de l'époque dorée de Casablanca.",
      quartier: "Anfa",
      coordinates: { lat: 33.5486, lng: -7.6658 },
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-poppins">
              Patrimoine Architectural
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Découvrez les joyaux historiques et architecturaux de Casablanca. Explorez les histoires, les quartiers et les coordonnées exactes de chaque site.
            </p>
          </div>
        </div>
      </section>

      {/* Heritage Sites Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {heritageSites.map((site) => (
              <div key={site.id} className="animate-fade-in">
                <HeritageStoryCard {...site} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 font-poppins">
            Explorer Notre Patrimoine
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Découvrez des histoires fascinantes sur le patrimoine de Casablanca. Passez votre curseur sur les images pour en savoir plus.
          </p>
          <a
            href="https://maps.google.com/?q=Casablanca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            📍 Voir sur la Carte
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Heritage;
