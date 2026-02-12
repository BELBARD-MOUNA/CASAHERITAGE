export interface Station {
  name: string;
  lat: number;
  lng: number;
  quartier?: string;
}

export interface Route {
  name: string;
  coordinates: Array<{ lat: number; lng: number }>;
  stations: Station[];
}

export interface TransportLine {
  id: string;
  type: "tramway" | "busway" | "bus" | "taxi_rouge" | "taxi_blanc";
  name: string;
  description: string;
  color: string;
  icon: string;
  routes: Route[];
  horaires?: string;
  quartiers?: string[];
}

export const transportData: TransportLine[] = [
  // Tramway Lines
  {
    id: "t1",
    type: "tramway",
    name: "Tramway T1",
    description: "Ligne principale du tramway de Casablanca, reliant le centre à la gare routière",
    color: "#FF4444",
    icon: "🚊",
    horaires: "05:30 - 23:30 | Fréquence: 5-10 min",
    quartiers: ["Ville Nouvelle", "Maarif", "Gauthier", "Anfa"],
    routes: [
      {
        name: "T1 - Ligne principale",
        coordinates: [
          { lat: 33.5733, lng: -7.5898 },
          { lat: 33.5742, lng: -7.5876 },
          { lat: 33.5758, lng: -7.5845 },
          { lat: 33.5805, lng: -7.5789 },
          { lat: 33.5842, lng: -7.5712 },
          { lat: 33.5876, lng: -7.5645 },
          { lat: 33.5908, lng: -7.5578 },
        ],
        stations: [
          { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
          { name: "2 Mars", lat: 33.5742, lng: -7.5876, quartier: "Ville Nouvelle" },
          { name: "Place de France", lat: 33.5758, lng: -7.5845, quartier: "Ville Nouvelle" },
          { name: "Mohamed V", lat: 33.5805, lng: -7.5789, quartier: "Maarif" },
          { name: "Gauthier", lat: 33.5842, lng: -7.5712, quartier: "Gauthier" },
          { name: "Anfa Centre", lat: 33.5876, lng: -7.5645, quartier: "Anfa" },
          { name: "Sidi Maarouf", lat: 33.5908, lng: -7.5578, quartier: "Anfa" },
        ],
      },
    ],
  },
  {
    id: "t2",
    type: "tramway",
    name: "Tramway T2",
    description: "Ligne reliant Casablanca à Ain Diab et Corniche",
    color: "#4444FF",
    icon: "🚊",
    horaires: "05:30 - 23:30 | Fréquence: 8-12 min",
    quartiers: ["Centre", "Ain Diab", "Corniche", "Polo"],
    routes: [
      {
        name: "T2 - Vers Corniche",
        coordinates: [
          { lat: 33.5733, lng: -7.5898 },
          { lat: 33.5715, lng: -7.5925 },
          { lat: 33.5680, lng: -7.6000 },
          { lat: 33.5640, lng: -7.6080 },
          { lat: 33.5600, lng: -7.6160 },
          { lat: 33.5560, lng: -7.6240 },
          { lat: 33.5510, lng: -7.6320 },
        ],
        stations: [
          { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
          { name: "Côté Mer", lat: 33.5715, lng: -7.5925, quartier: "Port" },
          { name: "Mosque Hassan II", lat: 33.5680, lng: -7.6000, quartier: "Seafront" },
          { name: "Ain Diab", lat: 33.5640, lng: -7.6080, quartier: "Ain Diab" },
          { name: "Corniche Est", lat: 33.5600, lng: -7.6160, quartier: "Corniche" },
          { name: "Polo", lat: 33.5560, lng: -7.6240, quartier: "Polo" },
          { name: "Ain Diab Fin", lat: 33.5510, lng: -7.6320, quartier: "Ain Diab" },
        ],
      },
    ],
  },

  // Busway
  {
    id: "bw1",
    type: "busway",
    name: "Busway BW1",
    description: "Ligne rapide reliant les zones sud à la gare routière",
    color: "#44AA44",
    icon: "🚌",
    horaires: "06:00 - 22:00 | Fréquence: 10-15 min",
    quartiers: ["Sidi Maarouf", "Zenata", "Maarif", "Ville Nouvelle"],
    routes: [
      {
        name: "BW1 - Axe Sud-Nord",
        coordinates: [
          { lat: 33.5908, lng: -7.5578 },
          { lat: 33.5850, lng: -7.5600 },
          { lat: 33.5800, lng: -7.5630 },
          { lat: 33.5750, lng: -7.5680 },
          { lat: 33.5733, lng: -7.5898 },
        ],
        stations: [
          { name: "Zenata", lat: 33.5908, lng: -7.5578, quartier: "Zenata" },
          { name: "Maarif Centre", lat: 33.5850, lng: -7.5600, quartier: "Maarif" },
          { name: "Gauthier", lat: 33.5800, lng: -7.5630, quartier: "Gauthier" },
          { name: "Place Verdun", lat: 33.5750, lng: -7.5680, quartier: "Ville Nouvelle" },
          { name: "Gare Routière", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
        ],
      },
    ],
  },

  // Regular Buses (zones)
  {
    id: "bus_north",
    type: "bus",
    name: "Bus Urbain - Zone Nord",
    description: "Réseau de bus desservant les quartiers nord (Maarif, Gauthier, Zenata)",
    color: "#FFAA00",
    icon: "🚌",
    horaires: "06:00 - 23:00",
    quartiers: ["Maarif", "Gauthier", "Zenata", "Saada"],
    routes: [
      {
        name: "Zone Nord",
        coordinates: [
          { lat: 33.5850, lng: -7.5600 },
          { lat: 33.5890, lng: -7.5620 },
          { lat: 33.5920, lng: -7.5650 },
          { lat: 33.5950, lng: -7.5680 },
        ],
        stations: [
          { name: "Maarif Centre", lat: 33.5850, lng: -7.5600, quartier: "Maarif" },
          { name: "Zenata", lat: 33.5920, lng: -7.5650, quartier: "Zenata" },
        ],
      },
    ],
  },
  {
    id: "bus_south",
    type: "bus",
    name: "Bus Urbain - Zone Sud",
    description: "Réseau desservant les quartiers sud (Anfa, Polo, Sidi Maarouf)",
    color: "#FFAA00",
    icon: "🚌",
    horaires: "06:00 - 23:00",
    quartiers: ["Anfa", "Polo", "Sidi Maarouf"],
    routes: [
      {
        name: "Zone Sud",
        coordinates: [
          { lat: 33.5876, lng: -7.5645 },
          { lat: 33.5860, lng: -7.5920 },
          { lat: 33.5560, lng: -7.6240 },
        ],
        stations: [
          { name: "Anfa Centre", lat: 33.5876, lng: -7.5645, quartier: "Anfa" },
          { name: "Polo", lat: 33.5560, lng: -7.6240, quartier: "Polo" },
        ],
      },
    ],
  },

  // Red Taxis
  {
    id: "taxi_red",
    type: "taxi_rouge",
    name: "Taxi Rouge (Grand Taxi)",
    description: "Taxis collectifs assurant les déplacements intra-urbains à Casablanca",
    color: "#DD0000",
    icon: "🚕",
    quartiers: ["Tous les quartiers"],
    routes: [
      {
        name: "Zones de circulation taxis rouges",
        coordinates: [
          { lat: 33.5733, lng: -7.5898 },
          { lat: 33.5800, lng: -7.5700 },
          { lat: 33.5850, lng: -7.5600 },
          { lat: 33.5900, lng: -7.5500 },
          { lat: 33.5850, lng: -7.6000 },
          { lat: 33.5700, lng: -7.6200 },
        ],
        stations: [
          { name: "Gare Routière Taxi", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
          { name: "Maarif Taxi", lat: 33.5850, lng: -7.5600, quartier: "Maarif" },
          { name: "Anfa Taxi", lat: 33.5876, lng: -7.5645, quartier: "Anfa" },
          { name: "Ain Diab Taxi", lat: 33.5640, lng: -7.6080, quartier: "Ain Diab" },
        ],
      },
    ],
  },

  // White Taxis
  {
    id: "taxi_white",
    type: "taxi_blanc",
    name: "Taxi Blanc (Interurbain)",
    description: "Taxis assurant les liaisons Casablanca ↔ villes voisines (Rabat, Fez, Marrakech)",
    color: "#FFFFFF",
    icon: "🚖",
    quartiers: ["Gare routière", "Aéroport"],
    routes: [
      {
        name: "Stations principales",
        coordinates: [
          { lat: 33.5733, lng: -7.5898 },
          { lat: 33.5650, lng: -7.6100 },
          { lat: 33.4200, lng: -7.5800 },
        ],
        stations: [
          { name: "Gare Routière Taxi Blanc", lat: 33.5733, lng: -7.5898, quartier: "Centre" },
          { name: "Aéroport (Anfa)", lat: 33.3750, lng: -7.5898, quartier: "Aéroport" },
          { name: "Vers Rabat & Fez", lat: 33.4200, lng: -7.5800, quartier: "Route" },
        ],
      },
    ],
  },
];
