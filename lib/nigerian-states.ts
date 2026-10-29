export type NigerianState = {
  name: string;
  code: string;
  zone: "lagos" | "fct" | "south-west" | "south-south" | "south-east" | "north-central" | "north-west" | "north-east";
  cities: string[];
};

export const NIGERIAN_STATES: NigerianState[] = [
  { name: "Abia", code: "AB", zone: "south-east", cities: ["Umuahia", "Aba"] },
  { name: "Adamawa", code: "AD", zone: "north-east", cities: ["Yola", "Mubi"] },
  { name: "Akwa Ibom", code: "AK", zone: "south-south", cities: ["Uyo", "Eket"] },
  { name: "Anambra", code: "AN", zone: "south-east", cities: ["Awka", "Onitsha", "Nnewi"] },
  { name: "Bauchi", code: "BA", zone: "north-east", cities: ["Bauchi"] },
  { name: "Bayelsa", code: "BY", zone: "south-south", cities: ["Yenagoa"] },
  { name: "Benue", code: "BN", zone: "north-central", cities: ["Makurdi", "Gboko"] },
  { name: "Borno", code: "BO", zone: "north-east", cities: ["Maiduguri"] },
  { name: "Cross River", code: "CR", zone: "south-south", cities: ["Calabar"] },
  { name: "Delta", code: "DT", zone: "south-south", cities: ["Asaba", "Warri"] },
  { name: "Ebonyi", code: "EB", zone: "south-east", cities: ["Abakaliki"] },
  { name: "Edo", code: "ED", zone: "south-south", cities: ["Benin City"] },
  { name: "Ekiti", code: "EK", zone: "south-west", cities: ["Ado-Ekiti"] },
  { name: "Enugu", code: "EN", zone: "south-east", cities: ["Enugu", "Nsukka"] },
  { name: "FCT", code: "FC", zone: "fct", cities: ["Abuja", "Gwagwalada", "Kubwa"] },
  { name: "Gombe", code: "GO", zone: "north-east", cities: ["Gombe"] },
  { name: "Imo", code: "IM", zone: "south-east", cities: ["Owerri"] },
  { name: "Jigawa", code: "JI", zone: "north-west", cities: ["Dutse"] },
  { name: "Kaduna", code: "KD", zone: "north-west", cities: ["Kaduna", "Zaria"] },
  { name: "Kano", code: "KN", zone: "north-west", cities: ["Kano"] },
  { name: "Katsina", code: "KT", zone: "north-west", cities: ["Katsina"] },
  { name: "Kebbi", code: "KE", zone: "north-west", cities: ["Birnin Kebbi"] },
  { name: "Kogi", code: "KO", zone: "north-central", cities: ["Lokoja"] },
  { name: "Kwara", code: "KW", zone: "north-central", cities: ["Ilorin"] },
  { name: "Lagos", code: "LA", zone: "lagos", cities: ["Ikeja", "Victoria Island", "Lekki", "Ikorodu", "Surulere", "Yaba", "Ajah", "Ikoyi"] },
  { name: "Nasarawa", code: "NA", zone: "north-central", cities: ["Lafia"] },
  { name: "Niger", code: "NI", zone: "north-central", cities: ["Minna"] },
  { name: "Ogun", code: "OG", zone: "south-west", cities: ["Abeokuta", "Sango-Ota"] },
  { name: "Ondo", code: "ON", zone: "south-west", cities: ["Akure"] },
  { name: "Osun", code: "OS", zone: "south-west", cities: ["Osogbo", "Ile-Ife"] },
  { name: "Oyo", code: "OY", zone: "south-west", cities: ["Ibadan", "Ogbomoso"] },
  { name: "Plateau", code: "PL", zone: "north-central", cities: ["Jos"] },
  { name: "Rivers", code: "RI", zone: "south-south", cities: ["Port Harcourt"] },
  { name: "Sokoto", code: "SO", zone: "north-west", cities: ["Sokoto"] },
  { name: "Taraba", code: "TA", zone: "north-east", cities: ["Jalingo"] },
  { name: "Yobe", code: "YO", zone: "north-east", cities: ["Damaturu"] },
  { name: "Zamfara", code: "ZA", zone: "north-west", cities: ["Gusau"] },
];

export function getStateByName(name: string) {
  return NIGERIAN_STATES.find((state) => state.name === name);
}

export function getCitiesForState(name: string) {
  return getStateByName(name)?.cities ?? [];
}
