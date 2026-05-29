export interface MissionConfig {
  payloadName: string;
  payloadWeight: number; // in kg
  orbitAltitude: number; // in km
  propellantType: 'Hydrolox' | 'Methalox' | 'Kerolox' | 'Ion Drive';
  destination: 'Low Earth Orbit (LEO)' | 'Geostationary (GEO)' | 'Lunar Transfer' | 'Martian Orbit';
}

export interface PartnerAgency {
  name: string;
  category: string;
  logoText: string;
}
