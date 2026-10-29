export function formatNaira(amount: number) {
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? "-" : "";
  const digits = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}₦${digits}`;
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string | Date) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function nairaToKobo(amount: number) {
  return Math.round(amount * 100);
}

export function koboToNaira(amount: number) {
  return amount / 100;
}

export function normalizeNigerianPhone(input: string) {
  const digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("+234")) return `+234${digits.slice(4).replace(/^0+/, "")}`;
  if (digits.startsWith("234")) return `+234${digits.slice(3).replace(/^0+/, "")}`;
  if (digits.startsWith("0")) return `+234${digits.slice(1)}`;
  if (digits.startsWith("+")) return digits;
  return `+234${digits}`;
}

export function whatsappUrl(phone: string, message: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
