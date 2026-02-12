export interface Station {
  name: string;
  lat: number;
  lng: number;
  quartier?: string;
}

export interface RouteCoordinates {
  lat: number;
  lng: number;
}

// Lines: Tramway & Busway
export interface TransportLine {
  id: string;
  lineCode: string; // T1, T2, T3, T4, BW1, BW2
  transportType: "tramway" | "busway";
  name: string;
  description: string;
  color: string;
  icon: string;
  horaires?: string;
  quartiers?: string[];
  stations: Station[];
  route: RouteCoordinates[];
}

// Proximity Points: Bus & Taxis
export interface ProximityPoint {
  name: string;
  lat: number;
  lng: number;
  quartier?: string;
}

export interface PointsOfProximity {
  id: string;
  transportType: "bus" | "taxi_rouge" | "taxi_blanc";
  name: string;
  description: string;
  color: string;
  icon: string;
  horaires?: string;
  points: ProximityPoint[];
}

// ===== TRAMWAY LINES (T1, T2, T3, T4) =====
export const tramwayLines: TransportLine[] = [
  {
    id: "t1",
    lineCode: "T1",
    transportType: "tramway",
    name: "Tramway T1",
    description: "Ligne principale reliant le centre à la gare routière",
    color: "#FF4444",
    icon: "🚊",
    horaires: "05:30 - 23:30 | Fréquence: 5-10 min",
    quartiers: ["Ville Nouvelle", "Maarif", "Gauthier", "Anfa"],
    stations: [
      { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
      { name: "2 Mars", lat: 33.5742, lng: -7.5876, quartier: "Ville Nouvelle" },
      { name: "Place de France", lat: 33.5758, lng: -7.5845, quartier: "Ville Nouvelle" },
      { name: "Mohamed V", lat: 33.5805, lng: -7.5789, quartier: "Maarif" },
      { name: "Gauthier", lat: 33.5842, lng: -7.5712, quartier: "Gauthier" },
      { name: "Anfa Centre", lat: 33.5876, lng: -7.5645, quartier: "Anfa" },
      { name: "Sidi Maarouf", lat: 33.5908, lng: -7.5578, quartier: "Anfa" },
    ],
    route: [
      { lat: 33.5733, lng: -7.5898 },
      { lat: 33.5742, lng: -7.5876 },
      { lat: 33.5758, lng: -7.5845 },
      { lat: 33.5805, lng: -7.5789 },
      { lat: 33.5842, lng: -7.5712 },
      { lat: 33.5876, lng: -7.5645 },
      { lat: 33.5908, lng: -7.5578 },
    ],
  },
  {
    id: "t2",
    lineCode: "T2",
    transportType: "tramway",
    name: "Tramway T2",
    description: "Ligne reliant Casablanca à Ain Diab et Corniche",
    color: "#4444FF",
    icon: "🚊",
    horaires: "05:30 - 23:30 | Fréquence: 8-12 min",
    quartiers: ["Centre", "Ain Diab", "Corniche", "Polo"],
    stations: [
      { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
      { name: "Côté Mer", lat: 33.5715, lng: -7.5925, quartier: "Port" },
      { name: "Mosque Hassan II", lat: 33.5680, lng: -7.6000, quartier: "Seafront" },
      { name: "Ain Diab", lat: 33.5640, lng: -7.6080, quartier: "Ain Diab" },
      { name: "Corniche Est", lat: 33.5600, lng: -7.6160, quartier: "Corniche" },
      { name: "Polo", lat: 33.5560, lng: -7.6240, quartier: "Polo" },
      { name: "Ain Diab Fin", lat: 33.5510, lng: -7.6320, quartier: "Ain Diab" },
    ],
    route: [
      { lat: 33.5733, lng: -7.5898 },
      { lat: 33.5715, lng: -7.5925 },
      { lat: 33.5680, lng: -7.6000 },
      { lat: 33.5640, lng: -7.6080 },
      { lat: 33.5600, lng: -7.6160 },
      { lat: 33.5560, lng: -7.6240 },
      { lat: 33.5510, lng: -7.6320 },
    ],
  },
  {
    id: "t3",
    lineCode: "T3",
    transportType: "tramway",
    name: "Tramway T3",
    description: "Ligne nord reliant les quartiers de Saada et Tanger",
    color: "#44FF44",
    icon: "🚊",
    horaires: "05:30 - 23:30 | Fréquence: 10-15 min",
    quartiers: ["Saada", "Carriere", "Tanger", "Maarif"],
    stations: [
      { name: "Maarif Centre", lat: 33.5850, lng: -7.5600, quartier: "Maarif" },
      { name: "Saada", lat: 33.5920, lng: -7.5500, quartier: "Saada" },
      { name: "Carriere", lat: 33.5960, lng: -7.5450, quartier: "Carriere" },
      { name: "Tanger", lat: 33.6050, lng: -7.5380, quartier: "Tanger" },
      { name: "Tanger Est", lat: 33.6120, lng: -7.5300, quartier: "Tanger" },
    ],
    route: [
      { lat: 33.5850, lng: -7.5600 },
      { lat: 33.5920, lng: -7.5500 },
      { lat: 33.5960, lng: -7.5450 },
      { lat: 33.6050, lng: -7.5380 },
      { lat: 33.6120, lng: -7.5300 },
    ],
  },
  {
    id: "t4",
    lineCode: "T4",
    transportType: "tramway",
    name: "Tramway T4",
    description: "Ligne est vers l'aéroport et zones périphériques",
    color: "#FFFF44",
    icon: "🚊",
    horaires: "05:30 - 23:30 | Fréquence: 10-15 min",
    quartiers: ["Centre", "Bernoussi", "Aéroport"],
    stations: [
      { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
      { name: "Bernoussi", lat: 33.5650, lng: -7.5600, quartier: "Bernoussi" },
      { lat: 33.5500, lng: -7.5300, quartier: "Bernoussi" },
      { name: "Vers Aéroport", lat: 33.3750, lng: -7.5898, quartier: "Aéroport" },
    ],
    route: [
      { lat: 33.5733, lng: -7.5898 },
      { lat: 33.5650, lng: -7.5600 },
      { lat: 33.5500, lng: -7.5300 },
      { lat: 33.3750, lng: -7.5898 },
    ],
  },
];

// ===== BUSWAY LINES (BW1, BW2) =====
export const busWayLines: TransportLine[] = [
  {
    id: "bw1",
    lineCode: "BW1",
    transportType: "busway",
    name: "Busway BW1",
    description: "Ligne rapide reliant les zones sud à la gare routière",
    color: "#44AA44",
    icon: "🚌",
    horaires: "06:00 - 22:00 | Fréquence: 10-15 min",
    quartiers: ["Sidi Maarouf", "Zenata", "Maarif", "Ville Nouvelle"],
    stations: [
      { name: "Zenata", lat: 33.5908, lng: -7.5578, quartier: "Zenata" },
      { name: "Maarif Centre", lat: 33.5850, lng: -7.5600, quartier: "Maarif" },
      { name: "Gauthier", lat: 33.5800, lng: -7.5630, quartier: "Gauthier" },
      { name: "Place Verdun", lat: 33.5750, lng: -7.5680, quartier: "Ville Nouvelle" },
      { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
    ],
    route: [
      { lat: 33.5908, lng: -7.5578 },
      { lat: 33.5850, lng: -7.5600 },
      { lat: 33.5800, lng: -7.5630 },
      { lat: 33.5750, lng: -7.5680 },
      { lat: 33.5733, lng: -7.5898 },
    ],
  },
  {
    id: "bw2",
    lineCode: "BW2",
    transportType: "busway",
    name: "Busway BW2",
    description: "Ligne rapide reliant la corniche à la gare routière",
    color: "#00AA88",
    icon: "🚌",
    horaires: "06:00 - 22:00 | Fréquence: 10-15 min",
    quartiers: ["Ain Diab", "Corniche", "Polo", "Centre"],
    stations: [
      { name: "Ain Diab", lat: 33.5640, lng: -7.6080, quartier: "Ain Diab" },
      { name: "Corniche Est", lat: 33.5600, lng: -7.6160, quartier: "Corniche" },
      { name: "Polo", lat: 33.5560, lng: -7.6240, quartier: "Polo" },
      { name: "Anfa Centre", lat: 33.5876, lng: -7.5645, quartier: "Anfa" },
      { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
    ],
    route: [
      { lat: 33.5640, lng: -7.6080 },
      { lat: 33.5600, lng: -7.6160 },
      { lat: 33.5560, lng: -7.6240 },
      { lat: 33.5876, lng: -7.5645 },
      { lat: 33.5733, lng: -7.5898 },
    ],
  },
];

// ===== POINTS OF PROXIMITY (Bus Urbain, Taxis) =====
export const proximityPoints: PointsOfProximity[] = [
  {
    id: "bus_urbain",
    transportType: "bus",
    name: "Bus Urbain",
    description: "Réseau complet de bus desservant tous les quartiers de Casablanca",
    color: "#FFAA00",
    icon: "🚌",
    horaires: "06:00 - 23:00",
    points: [
      { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
      { name: "Maarif Centre", lat: 33.5850, lng: -7.5600, quartier: "Maarif" },
      { name: "Gauthier", lat: 33.5842, lng: -7.5712, quartier: "Gauthier" },
      { name: "Anfa Centre", lat: 33.5876, lng: -7.5645, quartier: "Anfa" },
      { name: "Ain Diab", lat: 33.5640, lng: -7.6080, quartier: "Ain Diab" },
      { name: "Corniche Est", lat: 33.5600, lng: -7.6160, quartier: "Corniche" },
      { name: "Polo", lat: 33.5560, lng: -7.6240, quartier: "Polo" },
      { name: "Zenata", lat: 33.5908, lng: -7.5578, quartier: "Zenata" },
      { name: "Saada", lat: 33.5920, lng: -7.5500, quartier: "Saada" },
    ],
  },
  {
    id: "taxi_rouge",
    transportType: "taxi_rouge",
    name: "Taxi Rouge",
    description: "Taxis collectifs assurant les déplacements intra-urbains",
    color: "#DD0000",
    icon: "🚕",
    horaires: "06:00 - 23:00",
    points: [
      { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
      { name: "Maarif Station", lat: 33.5850, lng: -7.5600, quartier: "Maarif" },
      { name: "Anfa Station", lat: 33.5876, lng: -7.5645, quartier: "Anfa" },
      { name: "Ain Diab Station", lat: 33.5640, lng: -7.6080, quartier: "Ain Diab" },
      { name: "Corniche Station", lat: 33.5600, lng: -7.6160, quartier: "Corniche" },
    ],
  },
  {
    id: "taxi_blanc",
    transportType: "taxi_blanc",
    name: "Taxi Blanc",
    description: "Taxis interurbains reliant Casablanca aux villes voisines",
    color: "#CCCCCC",
    icon: "🚖",
    horaires: "06:00 - 20:00",
    points: [
      { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
      { name: "Aéroport (Anfa)", lat: 33.3750, lng: -7.5898, quartier: "Aéroport" },
      { name: "Vers Rabat", lat: 33.4200, lng: -7.5800, quartier: "Route Nord" },
    ],
  },
];

// Export all combined
export const allTransportLines = [...tramwayLines, ...busWayLines];
export const allProximityPoints = proximityPoints;
