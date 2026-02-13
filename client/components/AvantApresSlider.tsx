import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AvantApresSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
}

const AvantApresSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Avant",
  afterLabel = "Après",
  beforeAlt = "Image historique",
  afterAlt = "Image actuelle",
}: AvantApresSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle mouse/touch movement
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let x: number;

    if (e instanceof TouchEvent) {
      x = e.touches[0].clientX - rect.left;
    } else {
      x = e.clientX - rect.left;
    }

    // Constrain to container bounds
    x = Math.max(0, Math.min(x, rect.width));
    const newPosition = (x / rect.width) * 100;
    setSliderPosition(newPosition);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => handleMove(e);
    const handleTouchMove = (e: TouchEvent) => handleMove(e);
    const handleEnd = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  // Handle click on container
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPosition = (x / rect.width) * 100;
    setSliderPosition(newPosition);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let newPosition = sliderPosition;
    if (e.key === "ArrowLeft") {
      newPosition = Math.max(0, sliderPosition - 5);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      newPosition = Math.min(100, sliderPosition + 5);
      e.preventDefault();
    }
    if (newPosition !== sliderPosition) {
      setSliderPosition(newPosition);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl border-4 border-primary/30 shadow-xl group"
        onClick={handleContainerClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Avant/Après comparaison"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          cursor: isDragging ? "grabbing" : "col-resize",
        }}
      >
        {/* Before Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={beforeImage}
            alt={beforeAlt}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Before Label */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
            <span>📜</span>
            <span>{beforeLabel}</span>
          </div>
        </div>

        {/* After Image (Overlay) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={afterImage}
            alt={afterAlt}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          {/* After Label */}
          <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
            <span>✨</span>
            <span>{afterLabel}</span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-secondary to-accent transition-all duration-75 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Animated Line Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-secondary/20 to-transparent blur-md" />
        </div>

        {/* Interactive Handle Circle */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{
            left: `${sliderPosition}%`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div
            className={`w-16 h-16 md:w-14 md:h-14 bg-white rounded-full shadow-2xl border-4 border-primary flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-150 ${
              isDragging ? "scale-125" : "group-hover:scale-110"
            }`}
          >
            <div className="flex gap-1">
              <ChevronLeft size={20} className="text-primary" />
              <ChevronRight size={20} className="text-primary" />
            </div>
          </div>

          {/* Glow Effect */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full ${
              isDragging ? "animate-pulse" : "animate-pulse opacity-50"
            }`}
          />
        </div>

        {/* Percentage Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg border border-white/20">
          {Math.round(sliderPosition)}%
        </div>
      </div>

      {/* Instructions */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm">
        <div className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-lg">
          <span className="text-lg">📜</span>
          <span className="font-semibold text-foreground">{beforeLabel}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-lg border border-primary/30">
          <svg
            className="w-4 h-4 text-primary animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
          <span className="text-xs font-semibold text-primary">Glissez</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-lg">
          <span className="text-lg">✨</span>
          <span className="font-semibold text-foreground">{afterLabel}</span>
        </div>
      </div>

      {/* Optional Description */}
      <p className="text-center text-xs md:text-sm text-muted-foreground">
        💡 Souris • Doigt • Clavier (← →) pour explorer l'évolution
      </p>
    </div>
  );
};

export default AvantApresSlider;
