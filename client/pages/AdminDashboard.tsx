import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { Download, Users, GraduationCap, Briefcase, User, AlertCircle } from "lucide-react";

interface Registration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  role: "student" | "professional" | "other";
  message?: string;
  registeredAt: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState("1");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const events = [
    { id: "1", title: "Conférence: Architecture Moderne" },
    { id: "2", title: "Festival de la Musique Marocaine" },
    { id: "3", title: "Atelier d'Art Traditionnel" },
    { id: "4", title: "Visite Guidée: Patrimoine Colonial" },
    { id: "5", title: "Exposition: Photos Anciennes" },
    { id: "6", title: "Conférence: Avenir du Patrimoine" },
  ];

  useEffect(() => {
    fetchRegistrations();
  }, [selectedEvent]);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`/api/events/${selectedEvent}/registrations`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement");
      }

      setRegistrations(data.registrations || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(
        `/api/events/${selectedEvent}/registrations/export`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `registrations-${selectedEvent}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError("Erreur lors de l'export");
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return <GraduationCap size={18} className="text-primary" />;
      case "professional":
        return <Briefcase size={18} className="text-secondary" />;
      default:
        return <User size={18} className="text-accent" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student":
        return "Étudiant";
      case "professional":
        return "Professionnel";
      default:
        return "Autre";
    }
  };

  const stats = {
    total: registrations.length,
    students: registrations.filter((r) => r.role === "student").length,
    professionals: registrations.filter((r) => r.role === "professional").length,
    others: registrations.filter((r) => r.role === "other").length,
  };

  if (user?.role !== "admin") {
    return (
      <Layout>
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <AlertCircle size={48} className="text-destructive mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-primary mb-4 font-poppins">
              Accès Refusé
            </h1>
            <p className="text-foreground/70 mb-8">
              Vous n'avez pas les permissions pour accéder au dashboard admin.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8 font-poppins">
            Dashboard Admin
          </h1>

          {/* Event Selection */}
          <div className="bg-white rounded-2xl border border-border/30 p-8 mb-8">
            <label className="block text-sm font-semibold text-primary mb-4 font-poppins">
              Sélectionner un événement
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-border bg-white hover:border-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-300 outline-none"
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">Total</p>
              <p className="text-3xl font-bold text-primary font-poppins">
                {stats.total}
              </p>
            </div>
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap size={16} className="text-primary" />
                <p className="text-sm text-muted-foreground">Étudiants</p>
              </div>
              <p className="text-3xl font-bold text-primary font-poppins">
                {stats.students}
              </p>
            </div>
            <div className="bg-secondary/10 rounded-xl p-6 border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase size={16} className="text-secondary" />
                <p className="text-sm text-muted-foreground">Professionnels</p>
              </div>
              <p className="text-3xl font-bold text-secondary font-poppins">
                {stats.professionals}
              </p>
            </div>
            <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <User size={16} className="text-accent" />
                <p className="text-sm text-muted-foreground">Autres</p>
              </div>
              <p className="text-3xl font-bold text-accent font-poppins">
                {stats.others}
              </p>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              <Download size={18} />
              Télécharger (CSV)
            </button>
            <button
              onClick={fetchRegistrations}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all duration-300 font-semibold"
            >
              <Users size={18} />
              Actualiser
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-8">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Registrations Table */}
          <div className="bg-white rounded-2xl border border-border/30 overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <p className="text-foreground/70">Chargement des inscriptions...</p>
              </div>
            ) : registrations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary/5 border-b border-border/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                        Nom
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                        Message
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-primary">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, idx) => (
                      <tr
                        key={reg.id}
                        className="border-b border-border/30 hover:bg-primary/2 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-foreground">{reg.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-foreground/70">{reg.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getRoleIcon(reg.role)}
                            <span className="text-sm font-medium">
                              {getRoleLabel(reg.role)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-foreground/70">
                            {reg.message || "-"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground">
                            {new Date(reg.registeredAt).toLocaleDateString("fr-FR")}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-foreground/70">Aucune inscription pour cet événement</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
