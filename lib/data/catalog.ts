export const categories = [
  {
    slug: "senator",
    name: "Senator",
    description: "Sculpted tunics and trousers for ceremony and Sunday.",
  },
  {
    slug: "agbada",
    name: "Agbada",
    description: "Voluminous outer robes with considered embroidery.",
  },
  {
    slug: "ankara",
    name: "Ankara",
    description: "Graphic wax print, cut into contemporary silhouettes.",
  },
  {
    slug: "aso-oke",
    name: "Aso-Oke",
    description: "Woven ceremonial cloth for weddings and rites.",
  },
  {
    slug: "lace",
    name: "Lace",
    description: "Occasion gowns, jackets, and reception dressing.",
  },
  {
    slug: "kaftan",
    name: "Kaftan",
    description: "Easy, elongated garments for travel and evening.",
  },
  {
    slug: "corporate",
    name: "Corporate",
    description: "Workwear with private African textile details.",
  },
  {
    slug: "ready-to-wear",
    name: "Ready to Wear",
    description: "Shirts, trousers, and studio essentials.",
  },
  {
    slug: "bridal",
    name: "Bridal & Events",
    description: "Wedding looks, grooms, and made-to-measure deposits.",
  },
];

export const collections = [
  {
    slug: "heritage",
    name: "Heritage",
    description: "Traditional silhouettes, interpreted with a quieter hand.",
  },
  {
    slug: "contemporary",
    name: "Contemporary",
    description: "African cloth in modern, wearable proportion.",
  },
  {
    slug: "bridal",
    name: "Bridal",
    description: "Ceremony dressing for brides, grooms, and the party.",
  },
  {
    slug: "studio",
    name: "The Studio",
    description: "Everyday pieces from the cutting table.",
  },
];

export const garmentCategories = [
  "Senator outfit",
  "Agbada",
  "Ankara dress or set",
  "Aso-Oke ensemble",
  "Lace occasion wear",
  "Kaftan",
  "Suit or corporate look",
  "Wedding / bridal",
  "Shirt and trouser",
  "Other / describe",
];

export const occasions = [
  "Wedding",
  "Traditional ceremony",
  "Business",
  "Casual wear",
  "Church / Sunday",
  "Awards or evening",
  "Other",
];

export const fabricOptions = [
  "Ankara",
  "Aso-Oke",
  "Lace",
  "Brocade",
  "Cotton",
  "Linen",
  "Crepe",
  "Wool blend",
  "Let the studio advise",
];

export const budgetRanges = [
  "Under ₦50,000",
  "₦50,000 – ₦100,000",
  "₦100,000 – ₦250,000",
  "₦250,000 – ₦500,000",
  "₦500,000 – ₦1,000,000",
  "Above ₦1,000,000",
  "To be discussed",
];

export const mensMeasurements = [
  { key: "neck", label: "Neck", hint: "Around the base of the neck, where a collar sits.", requiredFor: ["Senator outfit", "Shirt and trouser", "Suit or corporate look", "Agbada"] },
  { key: "shoulder", label: "Shoulder", hint: "From shoulder bone to shoulder bone, across the back.", requiredFor: ["Senator outfit", "Agbada", "Suit or corporate look", "Kaftan", "Shirt and trouser"] },
  { key: "chest", label: "Chest", hint: "Around the fullest part of the chest, tape level.", requiredFor: ["Senator outfit", "Agbada", "Suit or corporate look", "Kaftan", "Shirt and trouser"] },
  { key: "waist", label: "Waist", hint: "Around the natural waist, usually at the navel.", requiredFor: ["Senator outfit", "Agbada", "Suit or corporate look", "Shirt and trouser"] },
  { key: "hip", label: "Hip", hint: "Around the fullest part of the seat.", requiredFor: ["Agbada", "Suit or corporate look", "Shirt and trouser"] },
  { key: "sleeveLength", label: "Sleeve length", hint: "From shoulder bone to wrist, arm slightly bent.", requiredFor: ["Senator outfit", "Agbada", "Suit or corporate look", "Kaftan", "Shirt and trouser"] },
  { key: "shirtLength", label: "Shirt / tunic length", hint: "From the base of the neck (back) to the desired hem.", requiredFor: ["Senator outfit", "Kaftan", "Agbada", "Shirt and trouser"] },
  { key: "trouserWaist", label: "Trouser waist", hint: "Where the trousers will actually sit.", requiredFor: ["Senator outfit", "Shirt and trouser", "Suit or corporate look", "Agbada"] },
  { key: "trouserLength", label: "Trouser length", hint: "From the waist position to the ankle bone.", requiredFor: ["Senator outfit", "Shirt and trouser", "Suit or corporate look"] },
  { key: "thigh", label: "Thigh", hint: "Around the fullest part of the thigh.", requiredFor: ["Shirt and trouser", "Suit or corporate look"] },
  { key: "inseam", label: "Inseam", hint: "From the crotch seam to the ankle bone.", requiredFor: ["Shirt and trouser", "Suit or corporate look"] },
];

export const womensMeasurements = [
  { key: "bust", label: "Bust", hint: "Around the fullest part of the bust, tape level.", requiredFor: ["Ankara dress or set", "Lace occasion wear", "Wedding / bridal", "Kaftan", "Suit or corporate look"] },
  { key: "underbust", label: "Underbust", hint: "Directly under the bust, where a bra band sits.", requiredFor: ["Ankara dress or set", "Lace occasion wear", "Wedding / bridal"] },
  { key: "shoulder", label: "Shoulder", hint: "From shoulder bone to shoulder bone, across the back.", requiredFor: ["Ankara dress or set", "Aso-Oke ensemble", "Kaftan", "Suit or corporate look"] },
  { key: "waist", label: "Waist", hint: "Around the narrowest part of the waist.", requiredFor: ["Ankara dress or set", "Aso-Oke ensemble", "Lace occasion wear", "Wedding / bridal", "Suit or corporate look"] },
  { key: "hip", label: "Hip", hint: "Around the fullest part of the hip and seat.", requiredFor: ["Ankara dress or set", "Aso-Oke ensemble", "Lace occasion wear", "Wedding / bridal", "Kaftan"] },
  { key: "sleeveLength", label: "Sleeve length", hint: "From shoulder bone to the desired sleeve end.", requiredFor: ["Ankara dress or set", "Lace occasion wear", "Kaftan", "Aso-Oke ensemble"] },
  { key: "dressLength", label: "Dress length", hint: "From the top of the shoulder to the desired hem.", requiredFor: ["Ankara dress or set", "Lace occasion wear", "Wedding / bridal", "Kaftan"] },
  { key: "blouseLength", label: "Blouse length", hint: "From the shoulder to the desired blouse hem.", requiredFor: ["Aso-Oke ensemble", "Ankara dress or set"] },
  { key: "skirtLength", label: "Skirt / wrapper length", hint: "From the waist to the desired hem.", requiredFor: ["Aso-Oke ensemble", "Ankara dress or set"] },
  { key: "trouserLength", label: "Trouser length", hint: "From the waist to the ankle.", requiredFor: ["Suit or corporate look", "Ankara dress or set"] },
];

export const appointmentTypes = [
  { value: "measurements", label: "Measurements" },
  { value: "style_consultation", label: "Style consultation" },
  { value: "wedding_outfit", label: "Wedding outfit planning" },
  { value: "bridal_groom_fitting", label: "Bridal or groom fitting" },
  { value: "general_consultation", label: "General tailoring consultation" },
];

export const faqs = [
  {
    q: "Do you sew both ready-to-wear and custom outfits?",
    a: "The lookbook shows studio work. Nothing is listed for sale on the site. Ask on WhatsApp about a look, or start a custom request.",
  },
  {
    q: "Can I send measurements from outside Lagos?",
    a: "Yes. Use the measurement guide, then book a confirmation call. The tailor may still ask for a fitting if the garment is structured or bridal.",
  },
  {
    q: "Which payment methods will you accept?",
    a: "Orders go to WhatsApp. You can note bank transfer, cash on delivery, or card as a preference. The studio confirms payment in that chat.",
  },
  {
    q: "How long does a custom outfit take?",
    a: "Simple native wear may take one to two weeks. Bridal and heavily embroidered pieces take longer. Give a preferred date in the request form; it is a preference, not a confirmed slot, until the studio replies.",
  },
  {
    q: "Do you ship outside Nigeria?",
    a: "International shipping is not claimed on this website. Ask via WhatsApp or the contact form and the studio can confirm once logistics are set.",
  },
];

export const demoTestimonials = [
  {
    name: "Sample review · A.O., Abuja",
    quote:
      "The senator set arrived well finished, with clean embroidery and a fit that did not feel costume-like. Placeholder review until real client words are supplied.",
  },
  {
    name: "Sample review · T.B., Port Harcourt",
    quote:
      "I used the measurement form for an Ankara dress. The process was clear. This is demonstration copy, not a verified testimonial.",
  },
  {
    name: "Sample review · K.M., Lagos",
    quote:
      "The consultation felt considered. Replace this paragraph with a real client story before launch.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Choose a path",
    body: "Pick a look from the gallery, or start a custom request with references and a date.",
  },
  {
    step: "02",
    title: "Share your size",
    body: "Use standard sizing or submit measurements. Structured garments may need a fitting.",
  },
  {
    step: "03",
    title: "Cloth and cut",
    body: "The studio confirms fabric, embroidery, and timeline before production begins.",
  },
  {
    step: "04",
    title: "Fitting and finish",
    body: "Adjustments are made, then the garment is finished, packed, and prepared for delivery.",
  },
];
