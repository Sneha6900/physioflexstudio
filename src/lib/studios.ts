import studioIndiranagar from "@/assets/studio-indiranagar.webp";
import studioKoramangala from "@/assets/studio-koramangala.webp";
import studioWhitefield from "@/assets/studio-whitefield.webp";

export type StudioBadge = "Most Popular" | "Premium Studio" | "New Location" | "Best Rated";

export type Studio = {
  id: string;
  shortName: string;
  name: string;
  address: string;
  hours: string;
  distance: string;
  travelTime: string;
  capacity: string;
  availability: string;
  badge?: StudioBadge;
  rating: number;
  amenities: string[];
  highlights: string[];
  image: string;
  mapEmbed: string;
  directionsUrl: string;
  phone: string;
};

export const studios: Studio[] = [
  {
    id: "indiranagar",
    shortName: "Indiranagar",
    name: "PhysioFlex Indiranagar",
    address: "100 Ft Road, Indiranagar, Bengaluru 560038",
    hours: "Mon – Sun · 6 AM – 10 PM",
    distance: "2.4 km",
    travelTime: "12 min drive",
    capacity: "8 treatment rooms",
    availability: "Slots available today",
    badge: "Most Popular",
    rating: 4.9,
    highlights: [
      "Advanced Equipment",
      "Expert Physiotherapists",
      "Personalized Care",
    ],
    amenities: [
      "Treatment Tables",
      "Stretching Area",
      "Recovery Equipment",
      "Mobility Training",
      "Wooden Flooring",
      "Natural Lighting",
    ],
    image: studioIndiranagar,
    mapEmbed: "https://www.google.com/maps?q=Indiranagar+Bangalore&output=embed",
    directionsUrl: "https://www.google.com/maps?q=Indiranagar+Bangalore",
    phone: "+91 80 4123 4501",
  },
  {
    id: "koramangala",
    shortName: "Koramangala",
    name: "PhysioFlex Koramangala",
    address: "80 Ft Road, 4th Block, Koramangala, Bengaluru 560034",
    hours: "Mon – Sun · 6 AM – 10 PM",
    distance: "4.1 km",
    travelTime: "18 min drive",
    capacity: "6 treatment rooms",
    availability: "Next slot tomorrow",
    badge: "Premium Studio",
    rating: 4.8,
    highlights: [
      "Assisted Stretching",
      "Expert Physiotherapists",
      "Private Consultations",
    ],
    amenities: [
      "Assisted Stretching Zone",
      "Resistance Bands",
      "Exercise Balls",
      "Posture Assessment",
      "Plants & Soft Lighting",
      "Parking Available",
    ],
    image: studioKoramangala,
    mapEmbed: "https://www.google.com/maps?q=Koramangala+Bangalore&output=embed",
    directionsUrl: "https://www.google.com/maps?q=Koramangala+Bangalore",
    phone: "+91 80 4123 4502",
  },
  {
    id: "whitefield",
    shortName: "Whitefield",
    name: "PhysioFlex Whitefield",
    address: "ITPL Main Road, Whitefield, Bengaluru 560066",
    hours: "Mon – Sat · 6 AM – 9 PM",
    distance: "8.6 km",
    travelTime: "26 min drive",
    capacity: "10 treatment rooms",
    availability: "Open this weekend",
    badge: "Best Rated",
    rating: 5.0,
    highlights: [
      "State-of-the-Art Equipment",
      "Senior Wellness Lounge",
      "Premium Recovery Spaces",
    ],
    amenities: [
      "Reception & Lounge",
      "Rehab Equipment",
      "Mobility Training",
      "Treatment Suites",
      "Climate Control",
      "Café Waiting Area",
    ],
    image: studioWhitefield,
    mapEmbed: "https://www.google.com/maps?q=Whitefield+Bangalore&output=embed",
    directionsUrl: "https://www.google.com/maps?q=Whitefield+Bangalore",
    phone: "+91 80 4123 4503",
  },
];

export const studioWhyChoose = [
  {
    title: "Modern Recovery Spaces",
    description: "Bright, calm studios designed for comfort — not clinical coldness.",
  },
  {
    title: "Private Consultation Rooms",
    description: "One-on-one sessions in quiet, dignified treatment spaces.",
  },
  {
    title: "Certified Physiotherapists",
    description: "Licensed experts focused on adults 40+ and pain-led recovery.",
  },
  {
    title: "Comfortable Environment",
    description: "Senior-friendly access, climate control, and welcoming staff.",
  },
  {
    title: "State-of-the-Art Equipment",
    description: "Professional-grade tools for mobility, strength, and rehabilitation.",
  },
];

export function getStudioByShortName(shortName: string) {
  return studios.find((s) => s.shortName === shortName);
}
