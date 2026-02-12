import { useState } from "react";
import Layout from "@/components/Layout";
import EventCard, { PlanningItem } from "@/components/EventCard";
import { Calendar, Filter } from "lucide-react";

const Events = () => {
  const [selectedQuartier, setSelectedQuartier] = useState("all");

  // Sample events data
  const events = [
    {
      id: "1",
      title: "Conférence: Architecture Moderne de Casablanca",
      description: "Découvrez l'évolution architecturale de Casablanca à travers une conférence interactive avec des experts en histoire urbaine.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      quartier: "Ville Nouvelle",
      startDate: "2024-03-15",
      endDate: "2024-03-15",
      planning: [
        { time: "09:00", activity: "Accueil et café" },
        { time: "10:00", activity: "Conférence principale" },
        { time: "12:00", activity: "Pause déjeuner" },
        { time: "14:00", activity: "Débat et questions" },
        { time: "17:00", activity: "Clôture" },
      ] as PlanningItem[],
      capacity: 150,
      registrationsCount: 87,
    },
    {
      id: "2",
      title: "Festival de la Musique Marocaine",
      description: "Célébration des traditions musicales marocaines avec performances en direct d'artistes locaux et internationaux.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      quartier: "Anfa",
      startDate: "2024-03-20",
      endDate: "2024-03-22",
      planning: [
        { time: "16:00", activity: "Ouverture et accueil" },
        { time: "17:00", activity: "Performances musicales" },
        { time: "19:00", activity: "Dîner traditionnel" },
        { time: "21:00", activity: "Concert principal" },
        { time: "23:30", activity: "Fermeture" },
      ] as PlanningItem[],
      capacity: 500,
      registrationsCount: 423,
    },
    {
      id: "3",
      title: "Atelier d'Art Traditionnel",
      description: "Atelier pratique sur les techniques traditionne les de zellige et calligraphie arabes. Tous les niveaux bienvenue.",
      image: "https://images.unsplash.com/photo-1578984425749-e60585f7b97c?w=800&h=600&fit=crop",
      quartier: "Médina",
      startDate: "2024-03-25",
      endDate: "2024-03-25",
      planning: [
        { time: "10:00", activity: "Accueil et introduction" },
        { time: "10:30", activity: "Démonstration de zellige" },
        { time: "12:00", activity: "Pause café" },
        { time: "12:30", activity: "Atelier pratique" },
        { time: "16:00", activity: "Fin de l'atelier" },
      ] as PlanningItem[],
      capacity: 50,
      registrationsCount: 48,
    },
    {
      id: "4",
      title: "Visite Guidée: Patrimoine Colonial",
      description: "Découvrez l'architecture coloniale de Casablanca lors d'une visite guidée commentée par un historien spécialiste.",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&h=600&fit=crop",
      quartier: "Centre-ville",
      startDate: "2024-04-01",
      endDate: "2024-04-01",
      planning: [
        { time: "09:00", activity: "Rendez-vous et briefing" },
        { time: "09:30", activity: "Visite guidée - Partie 1" },
        { time: "11:30", activity: "Pause et questions" },
        { time: "12:00", activity: "Visite guidée - Partie 2" },
        { time: "14:00", activity: "Conclusion et discussion" },
      ] as PlanningItem[],
      capacity: 40,
      registrationsCount: 35,
    },
    {
      id: "5",
      title: "Exposition: Photos Anciennes de Casablanca",
      description: "Exposition photographique retraçant l'histoire de Casablanca à travers des archives historiques rares et fascinantes.",
      image: "https://images.unsplash.com/photo-1578906314433-8f18819e3de8?w=800&h=600&fit=crop",
      quartier: "Ain Diab",
      startDate: "2024-04-05",
      endDate: "2024-04-15",
      planning: [
        { time: "10:00", activity: "Ouverture de l'exposition" },
        { time: "11:00", activity: "Visite guidée - Lot 1" },
        { time: "14:00", activity: "Pause déjeuner" },
        { time: "15:00", activity: "Visite guidée - Lot 2" },
        { time: "18:00", activity: "Fermeture" },
      ] as PlanningItem[],
      capacity: 200,
      registrationsCount: 156,
    },
    {
      id: "6",
      title: "Conférence: Avenir du Patrimoine",
      description: "Discussion prospective sur la conservation et la modernisation du patrimoine casablancais. Avec experts et décideurs.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      quartier: "Polo",
      startDate: "2024-04-10",
      endDate: "2024-04-10",
      planning: [
        { time: "13:00", activity: "Accueil buffet" },
        { time: "14:00", activity: "Conférence principale" },
        { time: "15:30", activity: "Pause" },
        { time: "16:00", activity: "Table ronde" },
        { time: "18:00", activity: "Réception de clôture" },
      ] as PlanningItem[],
      capacity: 120,
      registrationsCount: 89,
    },
  ];

  const quartiers = ["all", ...new Set(events.map((e) => e.quartier))];
  const filteredEvents =
    selectedQuartier === "all"
      ? events
      : events.filter((e) => e.quartier === selectedQuartier);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-poppins">
              Événements Culturels
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Découvrez les événements culturels de Casablanca. Conférences, festivals, ateliers et expositions vous attendent!
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter size={20} className="text-primary" />
            <div className="flex gap-3 flex-wrap">
              {quartiers.map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuartier(q)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
                    selectedQuartier === q
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-background text-foreground border border-border hover:border-primary"
                  }`}
                >
                  {q === "all" ? "Tous les quartiers" : q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          {filteredEvents.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-8">
                <Calendar size={24} className="text-secondary" />
                <h2 className="text-2xl font-bold text-primary font-poppins">
                  {filteredEvents.length} événement{filteredEvents.length > 1 ? "s" : ""}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="animate-fade-in">
                    <EventCard {...event} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-foreground/70 mb-4">
                Aucun événement trouvé pour ce quartier.
              </p>
              <button
                onClick={() => setSelectedQuartier("all")}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold"
              >
                Voir tous les événements
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;
