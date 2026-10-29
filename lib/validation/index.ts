import { z } from "zod";
import { NIGERIAN_STATES } from "@/lib/nigerian-states";

const stateNames = NIGERIAN_STATES.map((state) => state.name) as [string, ...string[]];

export const nigerianPhoneSchema = z
  .string()
  .trim()
  .min(10, "Enter a Nigerian phone number")
  .refine((value) => {
    const digits = value.replace(/[^\d]/g, "");
    if (digits.startsWith("234") && digits.length === 13) return true;
    if (digits.startsWith("0") && digits.length === 11) return true;
    if (digits.length === 10) return true;
    return false;
  }, "Use a valid Nigerian number, e.g. 0801 234 5678 or +234 801 234 5678");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: nigerianPhoneSchema,
  subject: z.string().trim().min(3, "Enter a subject"),
  message: z.string().trim().min(10, "Please write a little more so we can help"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: nigerianPhoneSchema,
  password: z.string().min(8, "Use at least 8 characters"),
});

export const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Enter the recipient name"),
  phone: nigerianPhoneSchema,
  line1: z.string().trim().min(4, "Enter a street address"),
  line2: z.string().trim().optional(),
  state: z.enum(stateNames, { message: "Select a Nigerian state" }),
  city: z.string().trim().min(2, "Enter a city"),
});

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: nigerianPhoneSchema,
  line1: z.string().trim().min(4, "Enter a street address"),
  line2: z.string().optional(),
  state: z.enum(stateNames, { message: "Select a Nigerian state" }),
  city: z.string().trim().min(2, "Enter a city"),
  notes: z.string().max(500).optional(),
  paymentMethod: z.enum(["paystack", "flutterwave", "bank_transfer", "cash_on_delivery"]),
  discountCode: z.string().optional(),
});

export const appointmentSchema = z.object({
  type: z.enum([
    "measurements",
    "style_consultation",
    "wedding_outfit",
    "bridal_groom_fitting",
    "general_consultation",
  ]),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  preferredTime: z.string().min(1, "Choose a preferred time"),
  name: z.string().trim().min(2),
  email: z.string().email(),
  phone: nigerianPhoneSchema,
  notes: z.string().max(600).optional(),
});

export const tailoringSchema = z.object({
  category: z.string().min(2, "Select a garment category"),
  occasion: z.string().min(2, "Select an occasion"),
  style: z.string().min(2, "Choose or describe a style"),
  customDesign: z.string().optional(),
  fabric: z.string().min(2, "Select a fabric preference"),
  colour: z.string().min(2, "Describe a colour"),
  sizing: z.enum(["standard", "custom"]),
  measurements: z.record(z.string(), z.number()).optional(),
  budget: z.string().min(2, "Select a budget range"),
  deliveryDate: z.string().min(1, "Choose a preferred date"),
  deliveryState: z.enum(stateNames, { message: "Select a state" }),
  deliveryCity: z.string().min(2, "Enter a city"),
  name: z.string().min(2),
  email: z.string().email(),
  phone: nigerianPhoneSchema,
  instructions: z.string().optional(),
  referenceImages: z.array(z.string()).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type TailoringInput = z.infer<typeof tailoringSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
