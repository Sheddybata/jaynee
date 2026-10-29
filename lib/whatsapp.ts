import { siteConfig } from "@/lib/config";
import { formatNaira, whatsappUrl } from "@/lib/format";
import type { CartItem } from "@/lib/types";

export function studioWhatsAppUrl(message: string) {
  return whatsappUrl(siteConfig.contact.whatsapp, message);
}

export function openStudioWhatsApp(message: string) {
  const url = studioWhatsAppUrl(message);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.assign(url);
}

function line(label: string, value: string | number | undefined) {
  if (value === undefined || value === "") return "";
  return `${label}: ${value}`;
}

function compact(lines: Array<string | false | undefined | null>) {
  return lines.filter((line) => line !== false && line !== undefined && line !== null).join("\n");
}

export function enquiryMessage() {
  return `Hello ${siteConfig.name}, I would like to enquire about an outfit.`;
}

export function lookMessage() {
  return `Hello ${siteConfig.name}, I like this look from the gallery. Please tell me if you can make something like this.`;
}

export function productOrderMessage(input: {
  name: string;
  price: number;
  color?: string;
  size?: string;
  fit: string;
  quantity: number;
  slug: string;
}) {
  return compact([
    `Hello ${siteConfig.name}, I would like to order this piece.`,
    "",
    line("Product", input.name),
    line("Price", formatNaira(input.price)),
    line("Colour", input.color),
    line("Size", input.size),
    line("Fit", input.fit === "custom" ? "Custom measurements" : "Standard"),
    line("Quantity", input.quantity),
    line("Link", `${siteConfig.url}/shop/${input.slug}`),
    "",
    "Please confirm availability, total, and delivery.",
  ]);
}

export function checkoutMessage(input: {
  reference: string;
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  notes?: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  delivery: number;
  total: number;
}) {
  const items = input.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} × ${item.quantity} — ${formatNaira(item.price * item.quantity)}${item.color ? ` (${item.color}` : ""}${item.size ? `, ${item.size}` : ""}${item.color || item.size ? ")" : ""}${item.fit === "custom" ? " · custom fit" : ""}`,
    )
    .join("\n");

  return compact([
    `Hello ${siteConfig.name}, here is my order.`,
    "",
    line("Reference", input.reference),
    "",
    "ITEMS",
    items,
    "",
    line("Subtotal", formatNaira(input.subtotal)),
    input.discount ? line("Discount", `${formatNaira(input.discount)}${input.discountCode ? ` (${input.discountCode})` : ""}`) : undefined,
    line("Delivery", formatNaira(input.delivery)),
    line("Total", formatNaira(input.total)),
    "",
    "CUSTOMER",
    line("Name", input.name),
    line("Phone", input.phone),
    line("Email", input.email),
    "",
    "DELIVERY",
    `${input.line1}${input.line2 ? `, ${input.line2}` : ""}`,
    `${input.city}, ${input.state}, Nigeria`,
    line("Preferred payment", paymentLabel(input.paymentMethod)),
    input.notes ? line("Notes", input.notes) : undefined,
    "",
    "Please confirm this order on WhatsApp.",
  ]);
}

export function tailoringMessage(input: {
  category: string;
  occasion: string;
  style: string;
  fabric: string;
  colour: string;
  sizing: string;
  budget: string;
  deliveryDate: string;
  deliveryCity: string;
  deliveryState: string;
  name: string;
  email: string;
  phone: string;
  instructions?: string;
  imageCount: number;
}) {
  return compact([
    `Hello ${siteConfig.name}, I would like a custom outfit.`,
    "",
    line("Garment", input.category),
    line("Occasion", input.occasion),
    line("Style", input.style),
    line("Fabric", input.fabric),
    line("Colour", input.colour),
    line("Fit", input.sizing === "custom" ? "Custom measurements" : "Standard sizing"),
    line("Budget", input.budget),
    line("Preferred date", input.deliveryDate),
    line("Location", `${input.deliveryCity}, ${input.deliveryState}`),
    input.imageCount ? `Inspiration images: ${input.imageCount} (I can send them in this chat)` : undefined,
    input.instructions ? line("Instructions", input.instructions) : undefined,
    "",
    "CUSTOMER",
    line("Name", input.name),
    line("Phone", input.phone),
    line("Email", input.email),
    "",
    "Please reply with timeline and deposit.",
  ]);
}

export function appointmentMessage(input: {
  type: string;
  preferredDate: string;
  preferredTime: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}) {
  return compact([
    `Hello ${siteConfig.name}, I would like to request an appointment.`,
    "",
    line("Type", input.type.replaceAll("_", " ")),
    line("Preferred date", input.preferredDate),
    line("Preferred time", input.preferredTime),
    "",
    line("Name", input.name),
    line("Phone", input.phone),
    line("Email", input.email),
    input.notes ? line("Notes", input.notes) : undefined,
    "",
    "This is a request. Please confirm if the time is available.",
  ]);
}

export function measurementMessage(input: {
  gender: string;
  garment: string;
  unit: string;
  values: Record<string, number>;
  labels?: Record<string, string>;
  notes?: string;
}) {
  const values = Object.entries(input.values)
    .filter(([, value]) => Number(value) > 0)
    .map(([key, value]) => `- ${input.labels?.[key] ?? key}: ${value} ${input.unit}`)
    .join("\n");

  return compact([
    `Hello ${siteConfig.name}, here are my measurements.`,
    "",
    line("Wardrobe", input.gender),
    line("Garment", input.garment),
    line("Unit", input.unit),
    "",
    values,
    input.notes ? `\nNotes: ${input.notes}` : undefined,
    "",
    "Please confirm these before cutting.",
  ]);
}

export function contactMessage(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  return compact([
    `Hello ${siteConfig.name}, ${input.subject}`,
    "",
    input.message,
    "",
    line("Name", input.name),
    line("Phone", input.phone),
    line("Email", input.email),
  ]);
}

export function newsletterMessage(email: string) {
  return compact([
    `Hello ${siteConfig.name}, please add me to studio notes / the newsletter.`,
    line("Email", email),
  ]);
}

function paymentLabel(method: string) {
  switch (method) {
    case "bank_transfer":
      return "Bank transfer";
    case "cash_on_delivery":
      return "Cash on delivery";
    case "paystack":
      return "Card / Paystack";
    case "flutterwave":
      return "Card / Flutterwave";
    default:
      return method;
  }
}
