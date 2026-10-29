import { whatsappUrl } from "@/lib/format";
import { getSiteUrl } from "@/lib/site-url";

export const siteConfig = {
  name: "jaynee.ng",
  shortName: "jaynee",
  tagline: "Style with a Smile, Elegance Redefined",
  logo: "/logo.jpeg",
  description:
    "jaynee.ng (jaynee) is a Nigerian fashion atelier for custom-made African silhouettes — senator, agbada, Ankara, lace, and bridal. Style with a Smile, Elegance Redefined.",
  keywords: [
    "jaynee",
    "jaynee.ng",
    "jaynee nigeria",
    "jaynee fashion",
    "Nigerian fashion",
    "African fashion atelier",
    "bespoke tailoring Lagos",
    "custom senator",
    "agbada",
    "Ankara",
    "bridal tailoring Nigeria",
  ],
  url: getSiteUrl(),
  announcement: process.env.NEXT_PUBLIC_ANNOUNCEMENT || "",
  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+234 703 666 3581",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+2347036663581",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@jaynee.ng",
    address:
      process.env.NEXT_PUBLIC_STUDIO_ADDRESS ||
      "Studio address to be confirmed, Lagos, Nigeria",
    hours:
      process.env.NEXT_PUBLIC_BUSINESS_HOURS ||
      "Monday–Saturday, 10:00–18:00 WAT (placeholder)",
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com",
  },
  bank: {
    name: process.env.NEXT_PUBLIC_BANK_NAME || "Bank name to be confirmed",
    accountName:
      process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "Account name to be confirmed",
    accountNumber:
      process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || "0000000000",
  },
  policies: {
    delivery:
      "Delivery timelines and coverage are configurable by the studio. Quoted windows on this website are placeholders until logistics are confirmed.",
    returns:
      "Ready-to-wear items may be returned within 7 days if unworn, with tags attached. Made-to-measure garments are not eligible for return unless there is a production fault.",
    privacy:
      "Customer measurements, images, and contact details are treated as private records and must never be exposed publicly.",
  },
};

export function getWhatsAppLink(message?: string) {
  return whatsappUrl(
    siteConfig.contact.whatsapp,
    message || `Hello ${siteConfig.name}, I would like to enquire about an outfit.`,
  );
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function isPaystackConfigured() {
  return Boolean(process.env.PAYSTACK_SECRET_KEY);
}

export function isFlutterwaveConfigured() {
  return Boolean(process.env.FLUTTERWAVE_SECRET_KEY);
}

export function isMockPayments() {
  return !isPaystackConfigured() && !isFlutterwaveConfigured();
}

export function hasPaystackPublicKey() {
  return Boolean(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY);
}

export function hasFlutterwavePublicKey() {
  return Boolean(process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY);
}

export const defaultDeliveryConfig = {
  freeOver: 250000,
  defaultFee: 7500,
  note: "Delivery fees and coverage are placeholders until the studio confirms shipping partners.",
  rules: [
    { id: "lagos", label: "Lagos", states: ["Lagos"], fee: 3500 },
    { id: "fct", label: "Abuja (FCT)", states: ["FCT"], fee: 5000 },
    { id: "rivers", label: "Port Harcourt (Rivers)", states: ["Rivers"], fee: 5500 },
    { id: "kano", label: "Kano", states: ["Kano"], fee: 6000 },
    {
      id: "south-west",
      label: "Other South-West",
      states: ["Ogun", "Oyo", "Osun", "Ondo", "Ekiti"],
      fee: 5000,
    },
  ],
};

export const demoDiscountCodes = [
  {
    code: "WELCOME10",
    type: "percent" as const,
    value: 10,
    active: true,
    description: "10% off your first ready-to-wear order (demo code)",
  },
  {
    code: "JAYNEE20",
    type: "percent" as const,
    value: 20,
    minSubtotal: 100000,
    active: true,
    description: "20% off orders from ₦100,000 (demo code)",
  },
  {
    code: "BRIDAL50",
    type: "fixed" as const,
    value: 50000,
    minSubtotal: 400000,
    active: true,
    description: "₦50,000 off bridal orders from ₦400,000 (demo code)",
  },
];

export const mockAdmin = {
  email: process.env.MOCK_ADMIN_EMAIL || "admin@jaynee.ng",
  password: process.env.MOCK_ADMIN_PASSWORD || "demo-admin-login",
};
