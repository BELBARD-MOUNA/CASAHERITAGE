import { Clock, MapPin, Users, ArrowRight, Flame, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export interface PlanningItem {
  time: string;
  activity: string;
}

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  quartier: string;
  startDate: string;
  endDate: string;
  planning: PlanningItem[];
  capacity: number;
  registrationsCount: number;
}

const EventCard = ({
  id,
  title,
  description,
  image,
  quartier,
  startDate,
  planning,
  capacity,
  registrationsCount,
}: EventCardProps) => {
  const spotsAvailable = capacity - registrationsCount;
  const isFull = spotsAvailable <= 0;

  // Determine badge status
  const getBadgeInfo = () => {
    if (isFull) {
      return {
        label: "Complet",
        icon: "🚫",
        bgColor: "bg-destructive",
        textColor: "text-white",
      };
    }
    if (spotsAvailable <= 3) {
      return {
        label: `${spotsAvailable} place${spotsAvailable > 1 ? "s" : ""} restante${spotsAvailable > 1 ? "s" : ""}`,
        icon: "⚠️",
        bgColor: "bg-accent",
        textColor: "text-white",
      };
    }
    if (spotsAvailable <= 10) {
      return {
        label: `${spotsAvailable} places disponibles`,
        icon: "🔥",
        bgColor: "bg-orange-500",
        textColor: "text-white",
      };
    }
    return null;
  };

  const badge = getBadgeInfo();

  return (
    <div className="bg-white rounded-2xl border border-border/30 overflow-hidden hover:shadow-2xl transition-all duration-300 card-hover flex flex-col h-full group/card">
      {/* Event Image */}
      <div className="relative overflow-hidden h-64 sm:h-72 group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>

        {/* Badge Section */}
        {badge && (
          <div
            className={`absolute top-4 right-4 ${badge.bgColor} ${badge.textColor} px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg animate-pulse`}
          >
            <span>{badge.icon}</span>
            <span>{badge.label}</span>
          </div>
        )}

        {/* Hot Event Badge */}
        {spotsAvailable > 0 && spotsAvailable <= 10 && (
          <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <Flame size={14} className="animate-bounce" />
            Très demandé
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-primary mb-3 font-poppins">
          {title}
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <MapPin size={18} className="text-primary flex-shrink-0" />
            <span className="font-medium">{quartier}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <Clock size={18} className="text-secondary flex-shrink-0" />
            <span>{new Date(startDate).toLocaleDateString("fr-FR")}</span>
          </div>

          {/* Capacity Bar */}
          <div className="flex items-center gap-3">
            <Users size={18} className="text-accent flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-foreground/70">
                  {registrationsCount} / {capacity}
                </span>
                <span className="text-xs font-semibold text-accent">
                  {Math.round((registrationsCount / capacity) * 100)}%
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-accent to-accent/60 h-full transition-all duration-500"
                  style={{ width: `${(registrationsCount / capacity) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-foreground/80 mb-6 flex-1">
          {description}
        </p>

        {/* Planning Preview */}
        <div className="mb-6 bg-primary/5 rounded-xl p-4 border border-primary/10">
          <p className="text-xs font-bold text-primary mb-3 uppercase font-poppins">
            Programme
          </p>
          <div className="space-y-2">
            {planning.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 text-sm"
              >
                <span className="font-bold text-primary min-w-12">{item.time}</span>
                <span className="text-foreground/70">{item.activity}</span>
              </div>
            ))}
            {planning.length > 3 && (
              <p className="text-xs text-muted-foreground pt-2">
                + {planning.length - 3} activités
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to={isFull ? "#" : `/events/${id}`}
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              isFull
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                : "bg-secondary text-white hover:bg-secondary/90 shadow-md hover:shadow-lg transform hover:scale-105"
            }`}
            onClick={(e) => {
              if (isFull) {
                e.preventDefault();
              }
            }}
          >
            {isFull ? "Complet" : "S'inscrire maintenant"}
            {!isFull && <ArrowRight size={18} />}
          </Link>

          {/* Secondary Action: View Details */}
          <Link
            to={`/events/${id}`}
            className="w-full inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-md"
          >
            Voir détails & plus
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
