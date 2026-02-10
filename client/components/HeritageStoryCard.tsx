import { MapPin } from "lucide-react";
import "./HeritageStoryCard.css";

interface HeritageStoryCardProps {
  id: string;
  name: string;
  image: string;
  story: string;
  quartier: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const HeritageStoryCard = ({
  name,
  image,
  story,
  quartier,
  coordinates,
}: HeritageStoryCardProps) => {
  return (
    <div className="heritage-perspective group">
      <div className="heritage-card">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="heritage-overlay">
          <div className="space-y-3">
            <div>
              <h3 className="text-2xl font-bold text-white font-poppins mb-2">
                {name}
              </h3>
              <div className="flex items-center gap-2 text-white/90 mb-3">
                <MapPin size={18} />
                <span className="font-medium">{quartier}</span>
              </div>
            </div>

            <p className="text-white/85 text-sm leading-relaxed">
              {story}
            </p>

            <div className="pt-2 border-t border-white/20">
              <p className="text-white/70 text-xs font-mono">
                📍 {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeritageStoryCard;
