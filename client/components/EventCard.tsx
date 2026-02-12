import { Clock, MapPin, Users, ArrowRight } from "lucide-react";
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

  return (
    <div className="bg-white rounded-2xl border border-border/30 overflow-hidden hover:shadow-xl transition-all duration-300 card-hover flex flex-col h-full">
      {/* Event Image */}
      <div className="relative overflow-hidden h-64 sm:h-72 group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        {isFull && (
          <div className="absolute top-4 right-4 bg-destructive text-white px-4 py-2 rounded-full text-sm font-semibold">
            Complet
          </div>
        )}
        {!isFull && spotsAvailable <= 5 && (
          <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
            {spotsAvailable} places
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-primary mb-3 font-poppins">
          {title}
        </h3>

        <div className="space-y-2 mb-6 text-sm text-foreground/70">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            <span className="font-medium">{quartier}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-secondary" />
            <span>{new Date(startDate).toLocaleDateString("fr-FR")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} className="text-accent" />
            <span>{registrationsCount} / {capacity} inscrits</span>
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

        <Link
          to={isFull ? "#" : `/events/${id}`}
          className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            isFull
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-secondary text-white hover:bg-secondary/90 shadow-md hover:shadow-lg"
          }`}
          onClick={(e) => {
            if (isFull) {
              e.preventDefault();
            }
          }}
        >
          {isFull ? "Complet" : "S'inscrire"}
          {!isFull && <ArrowRight size={18} />}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
