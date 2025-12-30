import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Home, 
  Heart, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ArrowRight,
  Filter, 
  CheckCircle,
  DollarSign,
  Calendar,
  Calculator,
  Users,
  Info,
  ChevronDown,
  User,
  Lock,
  Send,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  Instagram,
  Twitter,
  Linkedin,
  Sparkles
} from 'lucide-react';

// --- Global Styles & Animations ---
const GlobalStyles = () => (
  <style>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    @keyframes float-delayed {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    @keyframes shine {
      0% { left: -100%; opacity: 0; }
      20% { left: 100%; opacity: 0.6; }
      100% { left: 100%; opacity: 0; }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes gradient-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
    .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .gradient-text {
      background: linear-gradient(300deg, #2563eb, #9333ea, #db2777, #2563eb);
      background-size: 200% auto;
      animation: gradient-flow 4s linear infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .shine-effect {
      position: relative;
      overflow: hidden;
    }
    .shine-effect::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
      transform: skewX(-25deg);
      animation: shine 6s infinite;
    }
    .glass-panel {
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
  `}</style>
);

// --- 3D Tilt Component ---
const TiltCard = ({ children, className = "" }) => {
  const [transform, setTransform] = useState('');
  const [transition, setTransition] = useState('transform 0.1s ease-out');
  const [shadow, setShadow] = useState('');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    // Calculate rotation (limit to +/- 5 degrees for subtlety)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setTransition('transform 0.1s ease-out');
    setShadow('0 25px 50px -12px rgba(0, 0, 0, 0.25)');
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setTransition('transform 0.5s ease-out, box-shadow 0.5s ease-out');
    setShadow('');
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition, boxShadow: shadow }}
      className={`will-change-transform transform-gpu ${className}`}
    >
      {children}
    </div>
  );
};

// --- Animated Entrance Wrapper ---
const AnimatedSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Mock Data ---
const PROPERTIES = [
  {
    id: 1,
    title: "Modern Minimalist Villa",
    price: 1250000,
    address: "123 Palm Avenue, Beverly Hills, CA",
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    description: "Experience luxury living in this architectural masterpiece. Featuring floor-to-ceiling windows, an infinity pool, and a state-of-the-art smart home system.",
    agent: { name: "Sarah Jenkins", phone: "(555) 123-4567", email: "sarah@estately.com", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" },
    features: ["Pool", "Smart Home", "Garage", "Garden"]
  },
  {
    id: 2,
    title: "Urban Loft in Downtown",
    price: 4500,
    address: "45 Industrial Way, Seattle, WA",
    beds: 1,
    baths: 1,
    sqft: 950,
    type: "rent",
    category: "Apartment",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    description: "Authentic industrial loft with exposed brick walls, 15ft ceilings, and massive windows. Walking distance to the best coffee shops.",
    agent: { name: "Mike Ross", phone: "(555) 987-6543", email: "mike@estately.com", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
    features: ["Exposed Brick", "Gym Access", "Rooftop", "Pet Friendly"]
  },
  {
    id: 3,
    title: "Cozy Family Cottage",
    price: 450000,
    address: "789 Maple Drive, Portland, OR",
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    description: "Charming cottage with a renovated kitchen and a spacious backyard perfect for gardening.",
    agent: { name: "Linda White", phone: "(555) 456-7890", email: "linda@estately.com", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
    features: ["Fireplace", "Hardwood Floors", "Large Yard", "Newly Renovated"]
  },
  {
    id: 4,
    title: "Luxury Penthouse Suite",
    price: 8500,
    address: "101 Skyline Blvd, New York, NY",
    beds: 3,
    baths: 3,
    sqft: 2400,
    type: "rent",
    category: "Apartment",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    description: "Breathtaking views of the city skyline. Private elevator access, concierge service, and high-end finishes throughout.",
    agent: { name: "James Bond", phone: "(555) 007-0007", email: "james@estately.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
    features: ["Doorman", "Private Elevator", "Terrace", "City Views"]
  },
  {
    id: 5,
    title: "Seaside Retreat",
    price: 2100000,
    address: "55 Ocean View Ln, Malibu, CA",
    beds: 5,
    baths: 4,
    sqft: 4100,
    type: "buy",
    category: "Villa",
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
    description: "Direct beach access and panoramic ocean views. Open concept living area perfect for entertaining.",
    agent: { name: "Sarah Jenkins", phone: "(555) 123-4567", email: "sarah@estately.com", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" },
    features: ["Beach Access", "Guest House", "Deck", "Jacuzzi"]
  },
  {
    id: 6,
    title: "Modern Condo",
    price: 3200,
    address: "88 Tech Park, Austin, TX",
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "rent",
    category: "Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    description: "Sleek and modern condo in the heart of the tech district. Amenities include a pool, fitness center, and co-working space.",
    agent: { name: "Mike Ross", phone: "(555) 987-6543", email: "mike@estately.com", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
    features: ["Pool", "Co-working Space", "Balcony", "Modern Appliances"]
  },
  {
    id: 7,
    title: "Historic Townhouse",
    price: 890000,
    address: "14 Beacon Hill, Boston, MA",
    beds: 3,
    baths: 2.5,
    sqft: 2200,
    type: "buy",
    category: "Townhouse",
    image: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=800&q=80",
    description: "Classic brownstone with original woodwork, high ceilings, and modern updates. Located in a historic neighborhood.",
    agent: { name: "Linda White", phone: "(555) 456-7890", email: "linda@estately.com", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
    features: ["Historic Detail", "Roof Deck", "Chef's Kitchen", "Walk-in Closet"]
  },
  {
    id: 8,
    title: "Mountain View Cabin",
    price: 675000,
    address: "42 Pine Ridge, Aspen, CO",
    beds: 3,
    baths: 2,
    sqft: 1600,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    description: "Rustic yet modern cabin with breathtaking mountain views. Features a wrap-around porch and stone fireplace.",
    agent: { name: "James Bond", phone: "(555) 007-0007", email: "james@estately.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
    features: ["Mountain View", "Fireplace", "Ski-in/Ski-out", "Hot Tub"]
  },
  {
    id: 9,
    title: "Lakefront Paradise",
    price: 1550000,
    address: "77 Shoreline Dr, Lake Tahoe, NV",
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=80",
    description: "Stunning lakefront property with private dock. Huge windows maximize the view. Spacious interior.",
    agent: { name: "Sarah Jenkins", phone: "(555) 123-4567", email: "sarah@estately.com", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" },
    features: ["Private Dock", "Lake View", "Vaulted Ceilings", "Game Room"]
  },
  {
    id: 10,
    title: "Downtown Artist Studio",
    price: 2200,
    address: "21 Arts District, Los Angeles, CA",
    beds: 0,
    baths: 1,
    sqft: 700,
    type: "rent",
    category: "Studio",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
    description: "Bright and airy studio space perfect for creatives. Concrete floors, high ceilings, and lots of natural light.",
    agent: { name: "Mike Ross", phone: "(555) 987-6543", email: "mike@estately.com", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
    features: ["Natural Light", "Concrete Floors", "Open Plan", "Secure Entry"]
  },
  {
    id: 11,
    title: "Grand Victorian Manor",
    price: 3400000,
    address: "55 Heritage Lane, San Francisco, CA",
    beds: 6,
    baths: 5,
    sqft: 4800,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    description: "Impeccably restored Victorian manor with period details, stained glass windows, and a modern chef's kitchen.",
    agent: { name: "Elena Rodriguez", phone: "(555) 234-5678", email: "elena@estately.com", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
    features: ["Wine Cellar", "Library", "Staff Quarters", "City Views"]
  },
  {
    id: 12,
    title: "Sky High Luxury Condo",
    price: 12000,
    address: "500 N Michigan Ave, Chicago, IL",
    beds: 2,
    baths: 2.5,
    sqft: 1800,
    type: "rent",
    category: "Apartment",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    description: "Experience the pinnacle of luxury in this high-rise condo. Features include a private balcony and rooftop lounge.",
    agent: { name: "David Kim", phone: "(555) 876-5432", email: "david@estately.com", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
    features: ["Rooftop Lounge", "Indoor Pool", "24/7 Concierge", "Valet Parking"]
  },
  {
    id: 13,
    title: "Suburban Ranch House",
    price: 380000,
    address: "88 Oak Creek Dr, Dallas, TX",
    beds: 3,
    baths: 2,
    sqft: 1950,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
    description: "Perfect starter home in a friendly community. Single-story ranch with a large backyard and mature trees.",
    agent: { name: "Linda White", phone: "(555) 456-7890", email: "linda@estately.com", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
    features: ["Large Backyard", "Quiet Street", "Attached Garage", "Open Kitchen"]
  },
  {
    id: 14,
    title: "Sunnyvale Starter Home",
    price: 850000,
    address: "402 Silicon Way, Sunnyvale, CA",
    beds: 2,
    baths: 1,
    sqft: 1100,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?auto=format&fit=crop&w=800&q=80",
    description: "Cozy bungalow in the heart of Silicon Valley. Walking distance to tech campuses and downtown dining. Updated hardwood floors.",
    agent: { name: "Sarah Jenkins", phone: "(555) 123-4567", email: "sarah@estately.com", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" },
    features: ["Location", "Updated Floors", "Private Yard", "Solar Panels"]
  },
  {
    id: 15,
    title: "Brooklyn Brownstone",
    price: 2500000,
    address: "76 Williamsburg St, Brooklyn, NY",
    beds: 5,
    baths: 3,
    sqft: 3400,
    type: "buy",
    category: "Townhouse",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
    description: "Classic multi-family brownstone with rental income potential. High ceilings, original moldings, and a private garden oasis.",
    agent: { name: "David Kim", phone: "(555) 876-5432", email: "david@estately.com", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
    features: ["Garden", "Rental Unit", "Fireplace", "High Ceilings"]
  },
  {
    id: 16,
    title: "Austin Creek Side",
    price: 600000,
    address: "22 Live Oak Ln, Austin, TX",
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80",
    description: "Modern farmhouse style home backing onto a seasonal creek. Open floor plan perfect for entertaining.",
    agent: { name: "Mike Ross", phone: "(555) 987-6543", email: "mike@estately.com", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
    features: ["Creek View", "Modern Farmhouse", "Patio", "Office"]
  },
  {
    id: 17,
    title: "Miami Beach Condo",
    price: 900000,
    address: "101 Ocean Dr, Miami, FL",
    beds: 2,
    baths: 2,
    sqft: 1400,
    type: "buy",
    category: "Condo",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    description: "Oceanfront living at its finest. Floor-to-ceiling glass walls, wrap-around balcony, and white glove amenities.",
    agent: { name: "Sarah Jenkins", phone: "(555) 123-4567", email: "sarah@estately.com", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" },
    features: ["Ocean Front", "Pool", "Valet", "Gym"]
  },
  {
    id: 18,
    title: "Aspen Ski Lodge",
    price: 4200000,
    address: "88 Powder Run, Aspen, CO",
    beds: 6,
    baths: 6,
    sqft: 5500,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    description: "Ultimate ski-in/ski-out luxury. Timber frame construction, massive stone fireplace, theater room, and outdoor hot tub.",
    agent: { name: "James Bond", phone: "(555) 007-0007", email: "james@estately.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
    features: ["Ski-In/Out", "Theater", "Hot Tub", "Mountain View"]
  },
  {
    id: 19,
    title: "Nashville Music Row Loft",
    price: 3500,
    address: "12 Country Music Blvd, Nashville, TN",
    beds: 1,
    baths: 1.5,
    sqft: 1100,
    type: "rent",
    category: "Loft",
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
    description: "Industrial chic loft in the heart of Music City. Exposed ductwork, concrete floors, and a rooftop deck with live music.",
    agent: { name: "Mike Ross", phone: "(555) 987-6543", email: "mike@estately.com", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
    features: ["Rooftop", "Industrial Chic", "City View", "Concierge"]
  },
  {
    id: 20,
    title: "Seattle Houseboat",
    price: 750000,
    address: "22 Lake Union Slip, Seattle, WA",
    beds: 2,
    baths: 1,
    sqft: 850,
    type: "buy",
    category: "Houseboat",
    image: "https://images.unsplash.com/photo-1506126279646-a697353d3166?auto=format&fit=crop&w=800&q=80",
    description: "Unique living on the water. Sleepless in Seattle vibes with a rooftop deck and kayak launch. Beautiful city skyline views.",
    agent: { name: "David Kim", phone: "(555) 876-5432", email: "david@estately.com", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
    features: ["Waterfront", "Rooftop Deck", "Kayak Launch", "Skyline View"]
  },
  {
    id: 21,
    title: "Chicago Greystone",
    price: 1100000,
    address: "45 Logan Sq, Chicago, IL",
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "buy",
    category: "Townhouse",
    // Fixed image URL
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=800&q=80",
    description: "Historic Greystone 2-flat converted to single family luxury. Chef's kitchen, master suite with spa bath, and 2-car garage.",
    agent: { name: "Elena Rodriguez", phone: "(555) 234-5678", email: "elena@estately.com", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
    features: ["Historic", "Garage", "Chef Kitchen", "Spa Bath"]
  },
  {
    id: 22,
    title: "Charleston Antebellum",
    price: 1800000,
    address: "14 Battery Pl, Charleston, SC",
    beds: 5,
    baths: 4,
    sqft: 4000,
    type: "buy",
    category: "House",
    // Fixed image URL
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
    description: "Stately Antebellum home with double piazzas. Heart pine floors, 12ft ceilings, and a manicured English garden.",
    agent: { name: "Elena Rodriguez", phone: "(555) 234-5678", email: "elena@estately.com", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
    features: ["Historic", "Double Porch", "Garden", "High Ceilings"]
  },
  {
    id: 23,
    title: "Santa Fe Adobe",
    price: 950000,
    address: "77 Canyon Rd, Santa Fe, NM",
    beds: 3,
    baths: 2.5,
    sqft: 2400,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=800&q=80",
    description: "Authentic Adobe style home with kiva fireplaces, vigas ceilings, and sunset views over the desert. Private courtyard.",
    agent: { name: "James Bond", phone: "(555) 007-0007", email: "james@estately.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
    features: ["Adobe", "Kiva Fireplace", "Courtyard", "Desert View"]
  },
  {
    id: 24,
    title: "Hamptons Summer House",
    price: 5500000,
    address: "20 Dune Rd, East Hampton, NY",
    beds: 7,
    baths: 6,
    sqft: 6500,
    type: "buy",
    category: "Estate",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    description: "Quintessential shingle-style estate. Gunite pool, tennis court, and guest cottage. Steps to the ocean beaches.",
    agent: { name: "James Bond", phone: "(555) 007-0007", email: "james@estately.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
    features: ["Pool", "Tennis Court", "Guest House", "Ocean Access"]
  },
  {
    id: 25,
    title: "Portland Eco-Friendly",
    price: 620000,
    address: "55 Green St, Portland, OR",
    beds: 3,
    baths: 2,
    sqft: 1650,
    type: "buy",
    category: "House",
    // Fixed image URL
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    description: "Certified LEED Platinum home. Solar array, rainwater harvesting, and non-toxic finishes. Sustainable living in a walkable neighborhood.",
    agent: { name: "Linda White", phone: "(555) 456-7890", email: "linda@estately.com", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
    features: ["Solar", "Eco-Friendly", "Modern", "Garden"]
  },
  {
    id: 26,
    title: "Detroit Renovated Loft",
    price: 1800,
    address: "88 Corktown Ave, Detroit, MI",
    beds: 2,
    baths: 2,
    sqft: 1300,
    type: "rent",
    category: "Loft",
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80",
    description: "Spacious loft in a converted warehouse. 20ft ceilings, concrete pillars, and huge windows. Includes secure parking.",
    agent: { name: "Mike Ross", phone: "(555) 987-6543", email: "mike@estately.com", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
    features: ["Parking", "High Ceilings", "Warehouse Conv", "Pet Friendly"]
  },
  {
    id: 27,
    title: "New Orleans Creole Cottage",
    price: 550000,
    address: "404 Bourbon St, New Orleans, LA",
    beds: 3,
    baths: 2,
    sqft: 1700,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
    description: "Colorful Creole cottage in the Marigny. Wood floors, shutters, and a lush tropical courtyard. Vibrant neighborhood.",
    agent: { name: "Elena Rodriguez", phone: "(555) 234-5678", email: "elena@estately.com", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
    features: ["Historic", "Courtyard", "Vibrant", "Wood Floors"]
  },
  {
    id: 28,
    title: "Montana Ranch",
    price: 3200000,
    address: "99 Big Sky Rd, Bozeman, MT",
    beds: 4,
    baths: 3.5,
    sqft: 3800,
    type: "buy",
    category: "Ranch",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    description: "Sprawling ranch on 50 acres. Log cabin construction with modern luxury. Stables, trout stream, and panoramic mountain views.",
    agent: { name: "James Bond", phone: "(555) 007-0007", email: "james@estately.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
    features: ["Acreage", "Stables", "Fishing", "Views"]
  },
  {
    id: 29,
    title: "Savannah Historic Home",
    price: 875000,
    address: "22 Jones St, Savannah, GA",
    beds: 4,
    baths: 3,
    sqft: 2900,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
    description: "Elegant brick home on one of America's most beautiful streets. Grand staircase, carriage house, and moss-draped oak trees.",
    agent: { name: "Elena Rodriguez", phone: "(555) 234-5678", email: "elena@estately.com", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
    features: ["Historic", "Carriage House", "Garden", "Brick"]
  },
  {
    id: 30,
    title: "Las Vegas Luxury Villa",
    price: 1500000,
    address: "777 Strip Blvd, Las Vegas, NV",
    beds: 5,
    baths: 5,
    sqft: 4200,
    type: "buy",
    category: "Villa",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    description: "Modern desert oasis in a gated community. Infinity edge pool, outdoor kitchen, and views of the Las Vegas strip.",
    agent: { name: "Sarah Jenkins", phone: "(555) 123-4567", email: "sarah@estately.com", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" },
    features: ["Pool", "Gated", "Strip View", "Modern"]
  },
  {
    id: 31,
    title: "San Diego Bungalow",
    price: 920000,
    address: "33 North Park Ave, San Diego, CA",
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
    description: "Craftsman bungalow with a huge front porch. Walkable to Balboa Park. Updated kitchen and drought-tolerant landscaping.",
    agent: { name: "Linda White", phone: "(555) 456-7890", email: "linda@estately.com", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
    features: ["Craftsman", "Porch", "Walkable", "Landscaping"]
  },
  {
    id: 32,
    title: "Boston Wharf Condo",
    price: 4200,
    address: "55 Seaport Blvd, Boston, MA",
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "rent",
    category: "Condo",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    description: "Luxury waterfront living in the Seaport. Harbor views, gym, concierge, and steps to the best seafood restaurants.",
    agent: { name: "David Kim", phone: "(555) 876-5432", email: "david@estately.com", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
    features: ["Waterfront", "Gym", "Concierge", "Modern"]
  },
  {
    id: 33,
    title: "Denver Modern Townhome",
    price: 780000,
    address: "12 RiNo St, Denver, CO",
    beds: 3,
    baths: 3,
    sqft: 1900,
    type: "buy",
    category: "Townhouse",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    description: "Sleek townhome with a rooftop deck and mountain views. Located in the trendy RiNo arts district. 2-car garage.",
    agent: { name: "Mike Ross", phone: "(555) 987-6543", email: "mike@estately.com", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
    features: ["Rooftop", "Modern", "Garage", "Arts District"]
  },
  {
    id: 34,
    title: "Philadelphia Row House",
    price: 450000,
    address: "20 Fishtown Ave, Philadelphia, PA",
    beds: 3,
    baths: 1.5,
    sqft: 1500,
    type: "buy",
    category: "Townhouse",
    image: "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?auto=format&fit=crop&w=800&q=80",
    description: "Renovated row house with exposed brick and hardwood floors. Backyard patio for grilling. Close to public transit.",
    agent: { name: "Linda White", phone: "(555) 456-7890", email: "linda@estately.com", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
    features: ["Row House", "Patio", "Renovated", "Brick"]
  },
  {
    id: 35,
    title: "Phoenix Desert Home",
    price: 580000,
    address: "99 Saguaro Ln, Phoenix, AZ",
    beds: 4,
    baths: 2,
    sqft: 2200,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80",
    description: "Spacious single level home with a pool. Low maintenance desert landscaping. Updated kitchen with granite counters.",
    agent: { name: "Sarah Jenkins", phone: "(555) 123-4567", email: "sarah@estately.com", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" },
    features: ["Pool", "Single Level", "Desert Landscape", "Updated"]
  },
  {
    id: 36,
    title: "Honolulu Oceanfront",
    price: 2800000,
    address: "55 Waikiki Blvd, Honolulu, HI",
    beds: 3,
    baths: 3,
    sqft: 2100,
    type: "buy",
    category: "Condo",
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
    description: "Paradise found. Luxury condo with unobstructed ocean and Diamond Head views. Resort style amenities.",
    agent: { name: "James Bond", phone: "(555) 007-0007", email: "james@estately.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
    features: ["Ocean View", "Resort Amenities", "Luxury", "Balcony"]
  },
  {
    id: 37,
    title: "Atlanta Buckhead Estate",
    price: 2200000,
    address: "12 Peach Tree Rd, Atlanta, GA",
    beds: 6,
    baths: 5.5,
    sqft: 5800,
    type: "buy",
    category: "Estate",
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=800&q=80",
    description: "Classic Southern estate in prestigious Buckhead. Gated entry, pool house, home theater, and wine cellar.",
    agent: { name: "Elena Rodriguez", phone: "(555) 234-5678", email: "elena@estately.com", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
    features: ["Gated", "Pool House", "Theater", "Luxury"]
  },
  {
    id: 38,
    title: "Minneapolis Lake Cabin",
    price: 650000,
    address: "44 Minnetonka Dr, Minneapolis, MN",
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "buy",
    category: "House",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    description: "Year-round lake home. Private dock, large deck for entertaining, and cozy fireplace for winter nights.",
    agent: { name: "Linda White", phone: "(555) 456-7890", email: "linda@estately.com", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
    features: ["Lakefront", "Dock", "Fireplace", "Deck"]
  }
];

const AGENTS = [
  { id: 1, name: "Sarah Jenkins", role: "Senior Broker", phone: "(555) 123-4567", email: "sarah@estately.com", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Mike Ross", role: "Rental Specialist", phone: "(555) 987-6543", email: "mike@estately.com", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Linda White", role: "Family Homes Expert", phone: "(555) 456-7890", email: "linda@estately.com", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "James Bond", role: "Luxury Estates", phone: "(555) 007-0007", email: "james@estately.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Elena Rodriguez", role: "Historic Homes", phone: "(555) 234-5678", email: "elena@estately.com", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "David Kim", role: "Commercial & Condo", phone: "(555) 876-5432", email: "david@estately.com", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
];

// --- Sub-Components ---

const Navbar = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Buy', id: 'buy' },
    { name: 'Rent', id: 'rent' },
    { name: 'Agents', id: 'agents' },
    { name: 'Calculator', id: 'calculator' },
    { name: 'About', id: 'about' },
  ];

  return (
    <nav className="fixed w-full bg-white/30 backdrop-blur-lg z-50 border-b border-white/20 shadow-lg">
      <GlobalStyles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo with 3D Effect */}
          <div 
            className="flex items-center gap-2 cursor-pointer group perspective-1000" 
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="relative group-hover:rotate-12 transition-transform duration-500 transform-style-3d">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
                <div className="relative bg-gradient-to-tr from-blue-600 to-indigo-600 p-3 rounded-xl shadow-xl border-t border-white/30">
                    <Home className="h-7 w-7 text-white drop-shadow-md" />
                </div>
            </div>
            <span className="font-black text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">Estately</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 relative overflow-hidden group ${
                  activePage === link.id 
                    ? 'bg-white text-blue-600 shadow-lg shadow-blue-500/20 transform scale-105' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {activePage !== link.id && (
                  <div className="absolute inset-0 bg-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-700 bg-white/50 rounded-lg hover:bg-white shadow-sm backdrop-blur-sm">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-gray-100 backdrop-blur-xl absolute w-full animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActivePage(link.id); setIsMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 text-lg font-medium rounded-xl transition-all ${
                   activePage === link.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const PropertyCard = ({ property, onClick }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <TiltCard className="h-full">
      <div 
        className="group bg-white rounded-[2rem] overflow-hidden shadow-lg h-full border border-white/50 cursor-pointer relative shine-effect"
        onClick={() => onClick(property)}
      >
        <div className="relative h-72 overflow-hidden">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute top-4 left-4">
            <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-xl backdrop-blur-md border border-white/20 ${
              property.type === 'buy' ? 'bg-blue-600/90 text-white' : 'bg-green-500/90 text-white'
            }`}>
              {property.type === 'buy' ? 'For Sale' : 'For Rent'}
            </span>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-bold text-3xl drop-shadow-md tracking-tight">{formattedPrice}<span className="text-lg font-medium text-gray-300 ml-1">{property.type === 'rent' && '/mo'}</span></p>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">{property.title}</h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-6 bg-gray-50 p-2 rounded-lg w-fit">
            <MapPin size={16} className="text-blue-500" />
            <span className="line-clamp-1 font-medium">{property.address}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-blue-50 transition-colors">
              <Bed size={22} className="text-blue-600 mb-1" />
              <span className="text-sm font-bold text-gray-700">{property.beds}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-blue-50 transition-colors">
              <Bath size={22} className="text-blue-600 mb-1" />
              <span className="text-sm font-bold text-gray-700">{property.baths}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-blue-50 transition-colors">
              <Maximize size={22} className="text-blue-600 mb-1" />
              <span className="text-sm font-bold text-gray-700">{property.sqft}</span>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 perspective-2000">
      <div 
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 border border-white/20">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all hover:rotate-90 shadow-lg"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 h-80 md:h-auto relative overflow-hidden group">
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
               <p className="font-extrabold text-white text-4xl drop-shadow-lg tracking-tight">{formattedPrice} <span className="text-2xl font-normal opacity-80">{property.type === 'rent' && '/mo'}</span></p>
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col bg-white/90 backdrop-blur-3xl">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-1.5 text-xs font-bold uppercase rounded-full shadow-sm tracking-wider ${
                  property.type === 'buy' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                }`}>
                  For {property.type === 'buy' ? 'Sale' : 'Rent'}
                </span>
                <span className="bg-gray-100 text-gray-600 px-4 py-1.5 text-xs font-bold uppercase rounded-full tracking-wider shadow-sm">
                  {property.category}
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-3 leading-tight gradient-text">{property.title}</h2>
              <div className="flex items-center text-gray-500 font-medium text-lg">
                <MapPin size={20} className="mr-2 text-blue-500" />
                {property.address}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl text-center border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <Bed className="mx-auto mb-2 text-blue-600" size={32} />
                <p className="font-black text-gray-900 text-xl">{property.beds}</p>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Beds</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl text-center border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <Bath className="mx-auto mb-2 text-blue-600" size={32} />
                <p className="font-black text-gray-900 text-xl">{property.baths}</p>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Baths</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl text-center border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <Maximize className="mx-auto mb-2 text-blue-600" size={32} />
                <p className="font-black text-gray-900 text-xl">{property.sqft}</p>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Sq Ft</p>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Info size={20}/> Description</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
            </div>

            <div className="mt-auto bg-gradient-to-br from-slate-900 to-blue-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group shine-effect">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img 
                      src={property.agent.image} 
                      alt={property.agent.name}
                      className="h-16 w-16 rounded-full object-cover border-4 border-white/20 shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 uppercase font-bold tracking-wider mb-1">Listing Agent</p>
                    <p className="font-bold text-white text-2xl">{property.agent.name}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-500 transition-all hover:-translate-y-1 font-bold shadow-lg shadow-blue-900/50 active:scale-95">
                  <Phone size={20} />
                  Call Now
                </button>
                <button className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white py-4 rounded-xl hover:bg-white/20 transition-all hover:-translate-y-1 font-bold active:scale-95">
                  <Mail size={20} />
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('form'); 

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onClose();
      setTimeout(() => setStep('form'), 300); 
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        {step === 'form' ? (
          <>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Get in Touch</h2>
            <p className="text-gray-500 mb-8">We'd love to hear from you. Send us a message.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">First Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Last Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                <input type="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
                <textarea rows="4" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1 shine-effect">
                <Send size={18} /> Send Message
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="text-green-600 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-500">Thanks for reaching out.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AgentsView = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-10 lg:p-16 shadow-2xl border border-white/40 animate-fade-in-up">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-6 drop-shadow-sm">Meet The Elite</h2>
        <p className="text-xl text-gray-600 leading-relaxed font-medium">Our powerhouse team of real estate visionaries is dedicated to turning your property dreams into reality.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-8">
        {AGENTS.map((agent, index) => (
          <AnimatedSection key={agent.id} delay={index * 100}>
            <TiltCard>
              <div className="group bg-transparent flex flex-col items-center text-center relative h-full">
                {/* Image Container */}
                <div className="w-full h-80 rounded-[2rem] overflow-hidden relative shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 border border-white/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img src={agent.image} alt={agent.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Centered Actions on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                     <button className="p-4 bg-white/90 backdrop-blur rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg transform hover:scale-110 hover:rotate-12"><Phone size={24}/></button>
                     <button className="p-4 bg-white/90 backdrop-blur rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg transform hover:scale-110 hover:-rotate-12"><Mail size={24}/></button>
                  </div>
                </div>

                {/* Floating Info Card */}
                <div className="w-[85%] bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl -mt-16 relative z-30 group-hover:-translate-y-4 transition-transform duration-300 border border-white/50 ring-1 ring-black/5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-xs uppercase tracking-wider mb-3">{agent.role}</p>
                  <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </div>
);

const MortgageCalculator = () => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [downPayment, setDownPayment] = useState(100000);

  const monthlyPayment = useMemo(() => {
    const principal = amount - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    if (rate === 0) return principal / numberOfPayments;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }, [amount, rate, years, downPayment]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in-up">
      <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white/40 overflow-hidden flex flex-col md:flex-row">
        <div className="p-10 md:p-16 md:w-1/2">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg shadow-blue-600/30 animate-float">
              <Calculator className="text-white" size={32} />
            </div>
            <h2 className="text-4xl font-black text-gray-900">Mortgage Calc</h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Home Price</label>
              <div className="relative group">
                <DollarSign className="absolute left-4 top-4 text-blue-600" size={20} />
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 font-bold text-gray-900 shadow-sm"
                />
              </div>
              <input type="range" min="100000" max="5000000" step="10000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full mt-4 accent-blue-600 h-2 bg-gray-200 rounded-lg cursor-pointer" />
            </div>
            {/* ... simplified inputs for brevity ... */}
             <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Rate (%)</label>
                <input type="number" value={rate} step="0.1" onChange={(e) => setRate(Number(e.target.value))} className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 font-bold text-gray-900 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Down Payment</label>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 font-bold text-gray-900 shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 md:p-16 md:w-1/2 bg-gradient-to-br from-slate-900 to-blue-900 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float-delayed"></div>
          
          <div className="relative z-10 w-full max-w-sm">
            <h3 className="text-blue-200 mb-2 font-bold tracking-widest uppercase">Estimated Monthly</h3>
            <div className="text-7xl font-black mb-4 tracking-tighter drop-shadow-xl">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(monthlyPayment)}
            </div>
            <button className="w-full bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] shine-effect">
              Get Pre-Approved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutView = ({ onContactClick }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in-up">
    <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/40">
      <div className="relative h-96">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80" alt="Office" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex items-end justify-center pb-12">
          <div className="text-center">
             <h2 className="text-7xl font-black text-white mb-2 drop-shadow-2xl tracking-tighter">Reimagining Real Estate</h2>
             <div className="w-24 h-2 bg-blue-500 mx-auto rounded-full mt-4"></div>
          </div>
        </div>
      </div>
      <div className="p-10 lg:p-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { num: "5k+", label: "Properties Sold" },
            { num: "98%", label: "Client Satisfaction" },
            { num: "150+", label: "Expert Agents" }
          ].map((stat, i) => (
            <TiltCard key={i}>
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl text-center border border-blue-100 shadow-lg h-full flex flex-col justify-center">
                <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">{stat.num}</h3>
                <p className="font-bold text-gray-700 uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            </TiltCard>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-16 text-center">
           <h3 className="text-4xl font-bold text-gray-900 mb-8">Ready to start your journey?</h3>
           <button 
             onClick={onContactClick}
             className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-6 rounded-2xl font-black hover:shadow-2xl hover:shadow-blue-600/40 hover:scale-105 transition-all text-xl shine-effect"
           >
             Contact Our Team
           </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedHome, setSelectedHome] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState('all');
  const [priceRange, setPriceRange] = useState(5000000);
  const [minBeds, setMinBeds] = useState(0);
  const [minSqft, setMinSqft] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'buy' || page === 'rent') {
      setFilterType(page);
    } else if (page === 'home') {
      setFilterType('all');
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterType, priceRange, minBeds, minSqft, activePage]);

  // Dynamic Background Image
  const backgroundImage = useMemo(() => {
    switch (activePage) {
      case 'agents': return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80";
      case 'calculator': return "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=80";
      case 'about': return "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80";
      case 'rent': return "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80";
      default: return "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80";
    }
  }, [activePage]);

  const handleSubscribe = () => {
    if (newsletterEmail) {
      setNewsletterStatus("success");
      setNewsletterEmail("");
      setTimeout(() => setNewsletterStatus("idle"), 4000);
    }
  };

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchesSearch = p.address.toLowerCase().includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase());
      let typeToMatch = filterType;
      if (activePage === 'buy') typeToMatch = 'buy';
      if (activePage === 'rent') typeToMatch = 'rent';
      const matchesType = typeToMatch === 'all' || p.type === typeToMatch;
      const matchesPrice = p.type === 'rent' ? true : p.price <= priceRange;
      const matchesBeds = p.beds >= minBeds;
      const matchesSqft = p.sqft >= minSqft;
      return matchesSearch && matchesType && matchesPrice && matchesBeds && matchesSqft;
    });
  }, [search, filterType, priceRange, minBeds, minSqft, activePage]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activePage) {
      case 'agents': return <AgentsView />;
      case 'calculator': return <MortgageCalculator />;
      case 'about': return <AboutView onContactClick={() => setIsContactOpen(true)} />;
      case 'home':
      case 'buy':
      case 'rent':
      default:
        return (
          <>
             <div className="relative h-[450px] flex items-center justify-center animate-fade-in-up">
                <div className="relative z-10 w-full max-w-6xl px-4 text-center">
                  <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-10 drop-shadow-xl tracking-tighter">
                    {activePage === 'rent' ? 'Find Your Rental' : activePage === 'buy' ? 'Forever Home' : 'Discover Living'}
                  </h1>
                  
                  {/* Floating Glass Search Bar */}
                  <TiltCard className="max-w-6xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-xl p-6 lg:p-8 rounded-[2rem] shadow-2xl text-left border border-white/40">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-5 relative">
                          <label className="block text-xs font-bold text-gray-600 uppercase mb-2 ml-1 tracking-wider">Location</label>
                          <div className="relative group">
                            <MapPin className="absolute left-4 top-3.5 text-blue-600" size={20} />
                            <input type="text" placeholder="City, Zip, or Address" className="w-full pl-12 pr-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold" value={search} onChange={(e) => setSearch(e.target.value)} />
                          </div>
                        </div>
                        {/* Simplified Selects for brevity */}
                        <div className="md:col-span-3">
                          <label className="block text-xs font-bold text-gray-600 uppercase mb-2 ml-1 tracking-wider">Type</label>
                          <div className="relative">
                            <select value={activePage === 'home' ? filterType : activePage} onChange={(e) => { if(activePage === 'home') setFilterType(e.target.value); else handlePageChange(e.target.value); }} className="w-full px-5 py-3 bg-white/60 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold appearance-none" disabled={activePage !== 'home'}>
                              <option value="all">Buy or Rent</option>
                              <option value="buy">Buy</option>
                              <option value="rent">Rent</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-4 text-gray-500 pointer-events-none" size={16} />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-600 uppercase mb-2 ml-1 tracking-wider">Min Beds</label>
                           <div className="relative">
                            <select value={minBeds} onChange={(e) => setMinBeds(Number(e.target.value))} className="w-full px-5 py-3 bg-white/60 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold appearance-none"><option value="0">Any</option><option value="1">1+ Bed</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select>
                            <ChevronDown className="absolute right-4 top-4 text-gray-500 pointer-events-none" size={16} />
                          </div>
                        </div>
                         <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-600 uppercase mb-2 ml-1 tracking-wider">Min Sq Ft</label>
                           <div className="relative">
                            <select value={minSqft} onChange={(e) => setMinSqft(Number(e.target.value))} className="w-full px-5 py-3 bg-white/60 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold appearance-none"><option value="0">Any</option><option value="1000">1000+</option><option value="2000">2000+</option><option value="3000">3000+</option></select>
                            <ChevronDown className="absolute right-4 top-4 text-gray-500 pointer-events-none" size={16} />
                          </div>
                        </div>
                        
                        {(activePage === 'home' || activePage === 'buy') && filterType !== 'rent' && (
                          <div className="md:col-span-12 mt-2">
                             <div className="flex justify-between text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">
                                <span>Max Price</span>
                                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(priceRange)}</span>
                             </div>
                             <input type="range" min="500000" max="5000000" step="100000" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg cursor-pointer" />
                          </div>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20 bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white/40">
              <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 px-4">
                <div>
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    {activePage === 'buy' ? 'Homes For Sale' : activePage === 'rent' ? 'Apartments For Rent' : 'Featured Properties'}
                  </h2>
                  <p className="text-gray-500 font-medium">
                    Showing <span className="text-blue-600 font-bold">{filteredProperties.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredProperties.length)}</span> of {filteredProperties.length} available properties
                  </p>
                </div>
              </div>

              {filteredProperties.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProperties.map((property, index) => (
                      <AnimatedSection key={property.id} delay={index * 100}>
                        <PropertyCard property={property} onClick={setSelectedHome} />
                      </AnimatedSection>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-16">
                      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-4 rounded-full border border-gray-200 hover:bg-white hover:shadow-lg disabled:opacity-50 transition-all bg-white/50"><ChevronLeft size={24} /></button>
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button key={page} onClick={() => goToPage(page)} className={`w-12 h-12 rounded-full font-bold text-lg transition-all ${currentPage === page ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-white/50 text-gray-600 hover:bg-white'}`}>{page}</button>
                        ))}
                      </div>
                      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-4 rounded-full border border-gray-200 hover:bg-white hover:shadow-lg disabled:opacity-50 transition-all bg-white/50"><ChevronRight size={24} /></button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-24 bg-white/50 rounded-[2rem] border border-dashed border-gray-300">
                  <div className="bg-white p-8 rounded-full inline-block mb-6 shadow-md"><Search className="h-12 w-12 text-gray-300" /></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No properties match your filters</h3>
                  <button onClick={() => {setSearch(''); setPriceRange(5000000); setMinBeds(0); setMinSqft(0);}} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">Reset all filters</button>
                </div>
              )}
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 relative selection:bg-blue-200 overflow-x-hidden">
      <GlobalStyles />
      <div className="fixed inset-0 z-[-1] transition-all duration-1000 ease-in-out">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img src={backgroundImage} alt="Background" className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out scale-105 animate-float-delayed" />
      </div>

      <Navbar activePage={activePage} setActivePage={handlePageChange} />
      <div className="pt-24 pb-12">{renderContent()}</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-2xl border border-white/10 shine-effect">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float-delayed"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left max-w-xl">
              <h3 className="text-5xl font-black text-white mb-4 tracking-tighter">Unlock Exclusive Listings</h3>
              <p className="text-blue-100 text-lg">Join our VIP newsletter for off-market opportunities.</p>
            </div>
            <div className="w-full max-w-lg">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/10 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
                <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-xl bg-transparent text-white placeholder-blue-200 focus:outline-none" />
                <button onClick={handleSubscribe} disabled={newsletterStatus === 'success'} className={`px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${newsletterStatus === 'success' ? 'bg-green-500 text-white' : 'bg-white text-blue-900 hover:bg-blue-50'}`}>{newsletterStatus === 'success' ? <><CheckCircle size={20} /> Joined</> : 'Subscribe'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white/90 backdrop-blur-xl border-t border-white/20 pt-20 pb-10 mt-12 rounded-t-[3rem] shadow-[0_-10px_60px_rgba(0,0,0,0.15)] mx-2 lg:mx-6 mb-2">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 cursor-pointer group" onClick={() => handlePageChange('home')}>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-lg transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"><Home className="h-6 w-6 text-white" /></div>
                <span className="font-extrabold text-2xl text-slate-900 group-hover:text-blue-600 transition-colors">Estately</span>
              </div>
              <p className="text-gray-500 mb-8 leading-relaxed">Reimagining the way you buy, sell, and rent. We provide a seamless, digital-first experience for modern living.</p>
              <div className="flex gap-4">
                {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white cursor-pointer transition-all hover:-translate-y-1 shadow-sm"><Icon size={18} /></div>
                ))}
              </div>
            </div>
            {/* Simple Footer Lists */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Property</h4>
              <ul className="space-y-4 text-gray-500">
                <li onClick={() => handlePageChange('buy')} className="hover:text-blue-600 cursor-pointer transition-colors font-medium">Buy Home</li>
                <li onClick={() => handlePageChange('rent')} className="hover:text-blue-600 cursor-pointer transition-colors font-medium">Rent Home</li>
                <li onClick={() => handlePageChange('home')} className="hover:text-blue-600 cursor-pointer transition-colors font-medium">Browse All</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors font-medium">New Developments</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Company</h4>
              <ul className="space-y-4 text-gray-500">
                <li onClick={() => handlePageChange('about')} className="hover:text-blue-600 cursor-pointer transition-colors font-medium">About Us</li>
                <li onClick={() => handlePageChange('agents')} className="hover:text-blue-600 cursor-pointer transition-colors font-medium">Meet Agents</li>
                <li onClick={() => { handlePageChange('about'); setTimeout(() => setIsContactOpen(true), 100); }} className="hover:text-blue-600 cursor-pointer transition-colors font-medium">Contact</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors font-medium">Careers</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Resources</h4>
              <ul className="space-y-4 text-gray-500">
                <li onClick={() => handlePageChange('calculator')} className="hover:text-blue-600 cursor-pointer transition-colors font-medium">Mortgage Calculator</li>
                <li onClick={() => handlePageChange('home')} className="hover:text-blue-600 cursor-pointer transition-colors font-medium">Rental Guide</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors font-medium">Market Reports</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors font-medium">Help Center</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium"><p className="text-gray-400">© 2024 Estately Inc. All rights reserved.</p></div>
        </div>
      </footer>

      <PropertyModal property={selectedHome} onClose={() => setSelectedHome(null)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;