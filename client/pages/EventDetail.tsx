import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { MapPin, Clock, Users, BookOpen, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface PlanningItem {
  time: string;
  activity: string;
}

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Sample event data - in production, fetch from API based on id
  const event = {
    id: id || "1",
    title: "Conférence: Architecture Moderne de Casablanca",
    description:
      "Découvrez l'évolution architecturale de Casablanca à travers une conférence interactive avec des experts en histoire urbaine et développement urbain contemporain.",
    longDescription:
      "Cette conférence approfondit la transformation architecturale remarquable de Casablanca au cours du siècle dernier. Des experts discuteront de l'influence coloniale, de l'évolution moderniste et des projets contemporains qui façonnent la ville aujourd'hui. Parfait pour les étudiants, chercheurs et passionnés d'architecture.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
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
  };

  const spotsAvailable = event.capacity - event.registrationsCount;
  const isFull = spotsAvailable <= 0;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Le nom est requis";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email valide requis";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/events/${id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription");
      }

      setSubmitSuccess(true);
      setShowForm(false);
      setTimeout(() => {
        navigate("/events");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero with Image */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-poppins">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Event Info */}
              <div className="bg-white rounded-2xl p-8 border border-border/30 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Lieu</p>
                    <div className="flex items-start gap-2">
                      <MapPin size={20} className="text-primary mt-0.5" />
                      <p className="font-semibold text-foreground">{event.quartier}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Date</p>
                    <div className="flex items-start gap-2">
                      <Clock size={20} className="text-secondary mt-0.5" />
                      <p className="font-semibold text-foreground">
                        {new Date(event.startDate).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Inscrits</p>
                    <div className="flex items-start gap-2">
                      <Users size={20} className="text-accent mt-0.5" />
                      <p className="font-semibold text-foreground">
                        {event.registrationsCount}/{event.capacity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Statut</p>
                    <div className="flex items-start gap-2">
                      <BookOpen size={20} className={isFull ? "text-destructive" : "text-primary"} />
                      <p className={`font-semibold ${isFull ? "text-destructive" : "text-primary"}`}>
                        {isFull ? "Complet" : "Ouvert"}
                      </p>
                    </div>
                  </div>
                </div>

                {spotsAvailable <= 5 && !isFull && (
                  <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-8">
                    <p className="text-sm text-accent font-semibold">
                      ⚠️ Plus que {spotsAvailable} place{spotsAvailable > 1 ? "s" : ""} disponible{spotsAvailable > 1 ? "s" : ""}!
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary mb-4 font-poppins">
                  À propos
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {event.longDescription}
                </p>
              </div>

              {/* Planning */}
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">
                  Programme
                </h2>
                <div className="space-y-4">
                  {event.planning.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-6 pb-4 border-b border-primary/10 last:border-b-0 last:pb-0"
                    >
                      <div className="min-w-24">
                        <p className="text-xl font-bold text-primary font-poppins">
                          {item.time}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground font-medium">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Registration */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {submitSuccess ? (
                  <div className="bg-white rounded-2xl p-8 border-2 border-primary/30 text-center">
                    <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-primary mb-2 font-poppins">
                      Merci!
                    </h3>
                    <p className="text-foreground/70 mb-4">
                      Votre inscription a été enregistrée avec succès.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Redirection en cours...
                    </p>
                  </div>
                ) : showForm ? (
                  <div className="bg-white rounded-2xl p-8 border border-border/30 shadow-xl">
                    <h3 className="text-2xl font-bold text-primary mb-6 font-poppins">
                      Inscription
                    </h3>

                    {error && (
                      <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl flex gap-3">
                        <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-destructive">{error}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
                            fieldErrors.name
                              ? "border-destructive bg-destructive/5 focus:border-destructive"
                              : "border-border bg-white hover:border-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10"
                          }`}
                          placeholder="Votre nom"
                          disabled={isSubmitting}
                        />
                        {fieldErrors.name && (
                          <p className="text-sm text-destructive mt-1">
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
                            fieldErrors.email
                              ? "border-destructive bg-destructive/5 focus:border-destructive"
                              : "border-border bg-white hover:border-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10"
                          }`}
                          placeholder="votre@email.com"
                          disabled={isSubmitting}
                        />
                        {fieldErrors.email && (
                          <p className="text-sm text-destructive mt-1">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Statut
                        </label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white hover:border-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-300 outline-none"
                          disabled={isSubmitting}
                        >
                          <option value="student">🎓 Étudiant</option>
                          <option value="professional">💼 Professionnel</option>
                          <option value="other">👤 Autre</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message (optionnel)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white hover:border-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-300 outline-none resize-none"
                          placeholder="Parlez-nous de vous..."
                          rows={3}
                          disabled={isSubmitting}
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Inscription...
                          </>
                        ) : (
                          "Confirmer"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="w-full px-6 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all duration-300 font-semibold"
                      >
                        Annuler
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-8 border border-border/30">
                    <div className="mb-8">
                      <p className="text-sm text-muted-foreground mb-2">Places disponibles</p>
                      <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-300"
                          style={{
                            width: `${((event.registrationsCount / event.capacity) * 100)}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm font-semibold text-primary mt-2">
                        {spotsAvailable > 0 ? `${spotsAvailable} place(s) restante(s)` : "Complet"}
                      </p>
                    </div>

                    <button
                      onClick={() => !isFull && setShowForm(true)}
                      disabled={isFull}
                      className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                        isFull
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-secondary text-white hover:bg-secondary/90"
                      }`}
                    >
                      {isFull ? "Événement Complet" : "S'inscrire"}
                    </button>

                    <Link
                      to="/events"
                      className="block mt-4 px-6 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all duration-300 font-semibold text-center"
                    >
                      Retour aux événements
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventDetail;
