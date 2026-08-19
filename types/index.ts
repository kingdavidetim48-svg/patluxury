export type RoomCategory =
  | "All Suites"
  | "Executive"
  | "Suites"
  | "Deluxe"
  | "Standard Luxury";

export interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: "Executive" | "Suites" | "Deluxe" | "Standard Luxury";
  pricePerNight: number;
  currency: string;
  bedrooms: number;
  beds: string;
  bathrooms: number;
  maxGuests: number;
  sizeSqM: number;
  floor: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  featuredImage: string;
  galleryImages: string[];
  description: string;
  longDescription: string[];
  highlights: string[];
  amenities: string[];
  houseRules: {
    checkInTime: string;
    checkOutTime: string;
    smoking: boolean;
    pets: boolean;
    parties: boolean;
    additionalPolicies: string[];
  };
}

export interface Amenity {
  id: string;
  name: string;
  category: "Comfort" | "Technology" | "Hospitality" | "Security" | "Wellness";
  iconName: string;
  description: string;
  isPopular?: boolean;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  image: string;
  pricingInfo: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  guestName: string;
  guestLocation: string;
  stayedRoom: string;
  rating: number;
  date: string;
  quote: string;
  avatar: string;
  tripType: "Business" | "Leisure & Romance" | "Family Vacation" | "VIP Diplomat";
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Presidential Suites" | "Living Spaces" | "Master Bedrooms" | "Gourmet Kitchens" | "Spa Bathrooms" | "Architecture & Views" | "Hospitality & Dining";
  image: string;
  aspectRatio?: "landscape" | "portrait" | "square";
  roomSlug?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Lifestyle" | "Architecture" | "Fine Dining" | "Travel Guide" | "Concierge Secrets";
  date: string;
  readTime: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      image?: string;
    }[];
    conclusion: string;
  };
  tags: string[];
}

export interface BookingSimulation {
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  addOnServices: {
    privateChef: boolean;
    airportChauffeur: boolean;
    champagneArrival: boolean;
    lateCheckOut: boolean;
  };
  totalNights: number;
  basePrice: number;
  addOnsTotal: number;
  serviceTax: number;
  grandTotal: number;
}
